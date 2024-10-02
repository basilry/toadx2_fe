"use client"

import React, { useEffect, useRef, useState } from "react"
import classNames from "classnames"
import Wrapper from "@components/Wrapper"
import styles from "@styles/page/toadx2.module.scss"

export default function Home(): React.ReactElement {
    const inputWrapperRef = useRef<HTMLDivElement>(null)
    const [inputActive, setInputActive] = useState(false)

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
                <div className={styles.chatHistory}>상호 채팅 기록창</div>
            </div>
            <div className={classNames(styles.chatInputWrapper, inputActive && styles.active)}>
                <div ref={inputWrapperRef} className={styles.chatInput}>
                    <input placeholder={"궁금하신 점을 물어보세요!"} onClick={() => setInputActive(true)} />
                </div>
                <div className={styles.chatButton}>
                    <button>전송</button>
                </div>
            </div>
        </Wrapper>
    )
}
