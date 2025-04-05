"use client"

import { ReactElement } from "react"
import Image from "next/image"
import styles from "@styles/ui/header.module.scss"

const Header = (): ReactElement => {
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.title}>
                <Image src={"/pepe-basic.png"} alt={"pepe"} width={40} height={40} />
                <div className={styles.paragraph}>
                    <p>{"Toadx2"}</p>
                    <div className={styles.divider} />
                    <p>{"두껍아두껍아"}</p>
                </div>
            </div>
            <div className={styles.subTitle}>
                {"한국어와 KB부동산 데이터를 통한 대한민국 아파트 기록치 및 에측치 기반의 LLM 챗봇 서비스입니다."}
            </div>
        </div>
    )
}

export default Header
