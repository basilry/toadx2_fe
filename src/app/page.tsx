"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import nProgress from "nprogress"
import { v4 } from "uuid"
import classNames from "classnames"
import chatData from "@data/chat_sample.json"
import refData from "@data/reference_list.json"
import Wrapper from "@components/layout/Wrapper"
import axiosInstance from "@lib/api/axiosInstance"
import styles from "@styles/page/toadx2.module.scss"

export default function Home(): React.ReactElement {
    const inputWrapperRef = useRef<HTMLDivElement>(null)
    const [inputActive, setInputActive] = useState(false)
    const [userChat, setUserChat] = useState("")
    const [openReference, setOpenReference] = useState(false)

    const startLoading = (): nProgress.NProgress => nProgress.start()
    const endLoading = (): nProgress.NProgress => nProgress.done()

    const getChatData = (): void => {
        startLoading()

        axiosInstance
            .post("/gemma2/chat", {
                message: userChat,
                session_id: v4(),
            })
            .then((res) => {
                endLoading()
                console.log(res)
            })
            .catch((err) => {
                endLoading()
                console.log(err)
            })
    }

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

    return (
        <Wrapper>
            <div className={styles.chatWrapper}>
                <div className={styles.chatHistory}>
                    {chatData.map((row) => (
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
                                <div className={styles.chatText}>{row.contents}</div>
                            </div>
                            {row.id === "user" && (
                                <div className={styles.chatIcon}>
                                    <Image alt={"user-regular"} src={"/user-regular.svg"} width={20} height={20} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles.disabled}>
                    <div className={styles.disabledText}>
                        <Image src={"/pepe-cheers.png"} width={40} height={40} alt={"pepe-cheers"} />
                        <p>두껍이가 답변을 준비중입니다!</p>
                    </div>
                </div>
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
