"use client"

import React, { ReactElement, useEffect, useState } from "react"
import classNames from "classnames"
import Footer from "@components/ui/Footer"
import Header from "@components/ui/Header"
import styles from "@styles/layout/container.module.scss"

function Container({ children }: { children: React.ReactNode }): ReactElement {
    const [mount, setMount] = useState(false)

    useEffect(() => {
        setMount(true)
    }, [])

    return mount ? (
        <div className={classNames(styles.container)}>
            <Header />
            <div className={styles.body}>{children}</div>
            <Footer />
        </div>
    ) : (
        <></>
    )
}

export default Container
