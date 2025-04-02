import React, { ReactElement } from "react"
import { ToastContainer } from "react-toastify"
import type { Metadata } from "next"
import "@styles/global.scss"
import "@styles/font.scss"
import "@styles/toast.scss"
import "@styles/nprogress.scss"
import Container from "@components/layout/Container"
import SuspenseWrapper from "@components/layout/SuspenseWrapper"

export const metadata: Metadata = {
    title: "Toadx2 | 두껍아두껍아",
    description: "대한민국 아파트 가격 예측 챗봇 서비스",
    icons: {
        icon: "/pepe-basic.png",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>): ReactElement {
    return (
        <html lang="en">
            <head>
                <title>{"Toadx2 | 두껍아두껍아"}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#00A884" />
                <meta name="description" content="Google Gemma2-2b 모델에 기반한 대한민국 아파트 예측 LLM 서비스" />
                <link rel="icon" href="/pepe-basic.png" />
            </head>
            <body>
                <SuspenseWrapper>
                    <Container>
                        {children}
                        <ToastContainer
                            position="bottom-right"
                            autoClose={1800}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </Container>
                </SuspenseWrapper>
            </body>
        </html>
    )
}
