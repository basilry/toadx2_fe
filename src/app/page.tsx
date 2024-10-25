"use client"

import React, { ReactElement, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import nProgress from "nprogress"
import { v4 } from "uuid"
import classNames from "classnames"
import refData from "@data/reference_list.json"
import Wrapper from "@components/layout/Wrapper"
import axiosInstance from "@lib/api/axiosInstance"
import { useUserStore } from "@lib/store/store"
import styles from "@styles/page/toadx2.module.scss"

export interface IChatData {
    id: string
    contents: string
}

export interface IResponseData {
    response: string
    session_id: string
}

export default function Home(): React.ReactElement {
    const inputWrapperRef = useRef<HTMLDivElement>(null)
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const { userSessionId, setUserSessionId } = useUserStore()

    const [inputActive, setInputActive] = useState(false)
    const [firstYn, setFirstYn] = useState(true)
    const [userChat, setUserChat] = useState("")
    const [chatHistory, setChatHistory] = useState<IChatData[]>([])
    const [openReference, setOpenReference] = useState(false)

    const startLoading = (): nProgress.NProgress => nProgress.start()
    const endLoading = (): nProgress.NProgress => nProgress.done()

    const scrollToBottom = (): void => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }

    const getChatData = (): void => {
        startLoading()

        const userNowChat: IChatData = {
            id: "user",
            contents: userChat,
        }

        axiosInstance
            .post("/gemma2/chat", {
                message: userChat,
                session_id: firstYn ? "" : userSessionId,
            })
            .then((res) => {
                if (firstYn) {
                    setFirstYn(false)
                    setChatHistory([{ id: "toad", contents: res.data.response }])
                } else {
                    setChatHistory([...chatHistory, userNowChat, { id: "toad", contents: res.data.response }])
                }
                console.log(res)
            })
            .catch((err) => {
                setChatHistory([
                    ...chatHistory,
                    userNowChat,
                    {
                        id: "toad",
                        contents: "에러가 발생했습니다. 잠시 뒤에 다시 메시지를 전송해주세요~두껍!",
                    },
                ])
                console.log(err)
            })
            .finally(() => {
                setFirstYn(false)
                endLoading()
                setUserChat("")
                console.log("finally")
            })
    }

    const doGetNewChatResponse = (row: any): ReactElement => {
        console.log(row)

        if (row.id === "user") {
            return <div>{row.contnents}</div>
        }

        //
        // return <div>{contents}</div>
        return <></>
    }

    useEffect(() => {
        getChatData()
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (inputWrapperRef.current && !inputWrapperRef.current.contains(event.target as Node)) {
                setInputActive(false)
            }
        }

        window.addEventListener("click", handleClickOutside)

        return (): void => {
            window.removeEventListener("click", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        scrollToBottom() // 메시지 업데이트 시 항상 스크롤을 가장 밑으로
    }, [chatHistory])

    useEffect(() => {
        if (!userSessionId) {
            setUserSessionId(v4())
        }
    }, [setUserSessionId, userSessionId])

    return (
        <Wrapper>
            <div className={styles.chatWrapper}>
                <div className={styles.chatHistory} ref={chatContainerRef}>
                    {chatHistory.map((row) => (
                        <div
                            key={v4()}
                            className={classNames(
                                styles.eachChatWrapper,
                                row.id === "toad" && styles.toadWrapper,
                                row.id === "user" && styles.userWrapper,
                            )}
                        >
                            {row.id === "toad" && (
                                <div className={styles.chatIcon}>
                                    <Image alt={"toadicon"} src={"/pepe.png"} width={25} height={25} />
                                </div>
                            )}
                            <div
                                className={classNames(
                                    styles.chatBubble,
                                    row.id === "toad" && styles.toadWrapper,
                                    row.id === "user" && styles.userWrapper,
                                )}
                            >
                                <div className={styles.chatText}>{doGetNewChatResponse(row)}</div>
                            </div>
                            {row.id === "user" && (
                                <div className={styles.chatIcon}>
                                    <Image alt={"user-regular"} src={"/user-regular.svg"} width={20} height={20} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/*<div className={styles.disabled}>*/}
                {/*    <div className={styles.disabledText}>*/}
                {/*        <Image src={"/pepe-cheers.png"} width={40} height={40} alt={"pepe-cheers"} />*/}
                {/*        <p>두껍이가 답변을 준비중입니다!</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className={classNames(styles.chatInputWrapper)}>
                <div ref={inputWrapperRef} className={styles.chatInput}>
                    <input
                        className={classNames(inputActive && styles.active)}
                        placeholder={"궁금하신 점을 물어보세요!"}
                        onClick={() => setInputActive(true)}
                        maxLength={150}
                        value={userChat}
                        onChange={(e) => setUserChat(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && getChatData()}
                    />
                </div>
                <div className={styles.chatButton}>
                    <button onClick={() => getChatData()}>전송</button>
                </div>
            </div>
            <div className={styles.advertisement}>
                <div className={styles.sectionTitle}>
                    <p>Reference</p>
                    <p
                        className={classNames(styles.icon, openReference && styles.active)}
                        onClick={() => setOpenReference(!openReference)}
                    >
                        ▲
                    </p>
                </div>
                {openReference && (
                    <div className={classNames(styles.contentsWrapper, openReference && styles.active)}>
                        {refData.map((row) => (
                            <Link key={row.id} className={styles.eachAdvertisement} href={row.link}>
                                <div className={styles.title}>{row.title}</div>
                                <div className={styles.subTitle}>{row.subTitle}</div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </Wrapper>
    )
}
