import { ReactElement } from "react"
import Image from "next/image"
import Link from "next/link"
import styles from "@styles/ui/footer.module.scss"

const Footer = (): ReactElement => {
    return (
        <div className={styles.footerWrapper}>
            <div className={styles.footerParagraph}>
                <div>
                    <p>© 2024 Kim Basilri</p>
                    <p>#Google Machine Learning Bootcamp 2024 </p>
                </div>
                <div>
                    <div className={styles.socialLogoWrppaer}>
                        <div className={styles.socialLogo}>
                            <Link href="https://github.com/basilry">
                                <Image src={"/github_white.svg"} alt="github" width={20} height={20} />
                            </Link>
                        </div>
                        <div className={styles.socialLogo}>
                            <Link href="https://www.linkedin.com/in/basilri-kim-4b6611218/">
                                <Image src={"/linkedin_white.svg"} alt="linkedin" width={20} height={20} />
                            </Link>
                        </div>
                        <div className={styles.socialLogo}>
                            <Link href="https://blog.naver.com/basilry">
                                <Image src={"/n-solid_white.svg"} alt="n-solid" width={20} height={20} />
                            </Link>
                        </div>
                        <div className={styles.socialLogo}>
                            <Link href="https://basilry.github.io/kbslBlog/">
                                <Image src={"/icons8-home.svg"} alt="n-solid" width={20} height={20} />
                            </Link>
                        </div>
                    </div>
                    <p>+82 10-8936-4302</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
