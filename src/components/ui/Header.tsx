"use client"

import { ReactElement } from "react"
import Image from "next/image"
import styles from "@styles/ui/header.module.scss"

const Header = (): ReactElement => {
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.title}>
                <Image src={"/pepe.png"} alt={"pepe"} width={40} height={40} />
                <div className={styles.paragraph}>
                    <p>{"Toadx2"}</p>
                    <div className={styles.divider} />
                    <p>{"두껍아뚜겁아"}</p>
                </div>
            </div>
            <div className={styles.subTitle}>
                {
                    "Google Gemma2-2b 모델에 기반하여 한국어와 KB부동산 데이터 파인튜닝을 통한 대한민국 아파트 예측 LLM 서비스입니다."
                }
            </div>
        </div>
    )
}

export default Header
