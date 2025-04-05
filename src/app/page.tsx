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
    message: string
    timestamp: string
}

export interface IResponseData {
    response: string
    session_id: string
    type: string
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
    const [isLoading, setIsLoading] = useState(false)

    const startLoading = (): nProgress.NProgress => nProgress.start()
    const endLoading = (): nProgress.NProgress => nProgress.done()

    const scrollToBottom = (): void => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }

    const getChatData = (): void => {
        startLoading()
        setIsLoading(true)

        const userNowChat: IChatData = {
            id: "user",
            message: userChat,
            timestamp: new Date().toISOString(),
        }

        axiosInstance
            .post("/model/chat", {
                message: userChat,
                session_id: firstYn ? "" : userSessionId,
            })
            .then((res) => {
                console.log(res)

                if (firstYn) {
                    setFirstYn(false)
                    setChatHistory([{ id: "toad", ...res.data }])
                } else {
                    setChatHistory([
                        ...chatHistory,
                        userNowChat,
                        {
                            id: "toad",
                            ...res.data,
                        },
                    ])
                }
            })
            .catch((err) => {
                setChatHistory([
                    ...chatHistory,
                    userNowChat,
                    {
                        id: "toad",
                        message: "에러가 발생했습니다. 잠시 뒤에 다시 메시지를 전송해주세요~두껍!",
                        timestamp: new Date().toISOString(),
                    },
                ])

                console.log("에라~", err)

                if (err.response) {
                    console.log("서버 응답 에러:", err.response.status, err.response.data)
                } else if (err.request) {
                    console.log("네트워크 에러:", err.request)
                } else {
                    console.log("요청 설정 에러:", err.message)
                }
            })
            .finally(() => {
                setFirstYn(false)
                endLoading()
                setUserChat("")
                setIsLoading(false)
            })
    }

    const doGetNewChatResponse = (row: IChatData): ReactElement => {
        return <div>{row.message}</div>
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
        console.log("채팅 기록 변경됨, 스크롤 실행")
        scrollToBottom()

        // DOM 업데이트 후 한 번 더 실행
        const timer = setTimeout(scrollToBottom, 100)
        return (): void => clearTimeout(timer)
    }, [chatHistory])

    useEffect(() => {
        if (!userSessionId) {
            setUserSessionId(v4())
        }
    }, [setUserSessionId, userSessionId])

    return (
        <Wrapper>
            <div className={styles.chatWrapper} ref={chatContainerRef}>
                <div className={styles.chatHistory}>
                    {chatHistory.map((row, index) => (
                        <div
                            key={`${row.id}-${index}`}
                            className={classNames(
                                styles.eachChatWrapper,
                                row.id === "toad" && styles.toadWrapper,
                                row.id === "user" && styles.userWrapper,
                            )}
                        >
                            {row.id === "toad" && (
                                <div className={styles.chatIcon}>
                                    <Image alt={"toadicon"} src={"/pepe-basic.png"} width={25} height={25} />
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
                {isLoading && (
                    <div className={styles.disabled}>
                        <div className={styles.disabledText}>
                            <Image src={"/pepe-cheers.png"} width={40} height={40} alt={"pepe-cheers"} />
                            <p>두껍이가 답변을 준비중입니다!</p>
                        </div>
                    </div>
                )}
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
                        disabled={isLoading}
                    />
                </div>
                <div className={styles.chatButton}>
                    <button onClick={() => getChatData()} disabled={isLoading || !userChat.trim()}>
                        전송
                    </button>
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
