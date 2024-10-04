"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import nProgress from "nprogress"
import { v4 } from "uuid"
import classNames from "classnames"
import chatData from "@data/chat_sample.json"
import Wrapper from "@components/Wrapper"
import axiosInstance from "@lib/api/axiosInstance"
import styles from "@styles/page/toadx2.module.scss"

export default function Home(): React.ReactElement {
    const inputWrapperRef = useRef<HTMLDivElement>(null)
    const [inputActive, setInputActive] = useState(false)
    const [userChat, setUserChat] = useState("")

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
                <div className={styles.sectionTitle}>Reference</div>
                <div className={styles.eachAdvertisement}>
                    <div className={styles.title}>F/E Source</div>
                    <Link
                        className={styles.subTitle}
                        href={"https://github.com/basilry/toadx2_fe"}
                    >{`Toadx2 F/E Github Link`}</Link>
                </div>
                <div className={styles.eachAdvertisement}>
                    <div className={styles.title}>B/E Source</div>

                    <Link
                        className={styles.subTitle}
                        href={"https://github.com/basilry/toadx2_api"}
                    >{`Toadx2 B/E Github Link`}</Link>
                </div>
                <div className={styles.eachAdvertisement}>
                    <div className={styles.title}>Based Model</div>

                    <Link
                        className={styles.subTitle}
                        href={"https://huggingface.co/google/gemma-2-2b-it"}
                    >{`Google's Gemma2-2-2b-it`}</Link>
                </div>
                <div className={styles.eachAdvertisement}>
                    <div className={styles.title}>FineTuned Model</div>

                    <Link
                        className={styles.subTitle}
                        href={"https://huggingface.co/basilry/gemma2-2-2b-it-fine-tuned-korean-real-estate-model"}
                    >{`basilry/gemma2-2-2b-it-fine-tuned-korean-real-estate-model`}</Link>
                </div>
                {/*    프론트 깃헙, api 깃헙, 데이터셋*/}
                <div className={styles.eachAdvertisement}>
                    <div className={styles.title}>Korean Safe Conversation Dataset</div>
                    <Link
                        className={styles.subTitle}
                        href={"https://huggingface.co/datasets/jojo0217/korean_safe_conversation"}
                    >{`jojo0217/korean_safe_conversation`}</Link>
                </div>
                <div className={styles.eachAdvertisement}>
                    <div className={styles.title}>{`KB Real Estate Data Hub's Apartment Dataset`}</div>
                    <Link
                        className={styles.subTitle}
                        href={"https://data.kbland.kr/"}
                    >{`KB Real Estate Data Hub`}</Link>
                </div>
            </div>
        </Wrapper>
    )
}
