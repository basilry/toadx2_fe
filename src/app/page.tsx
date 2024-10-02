"use client"

import React from "react"
import styles from "@styles/page/toadx2.module.scss"

export default function Home(): React.ReactElement {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.chatWrapper}>
                <div className={styles.chatHistory}>상호 채팅 기록창</div>
            </div>
            <div className={styles.chatInputWrapper}>
                <div className={styles.chatInput}>
                    <input />
                </div>
                <div className={styles.chatButton}>
                    <button>전송아이콘</button>
                </div>
            </div>
        </div>
    )
}
