import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session, loading } = useSession();
  console.log("========>",{session,loading})
  return (
    <div className={styles.container}>
      <Head>
        <title>Montreal BookClub</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/main-photo.jpg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          { session ? `${session.user.name },`:''} Welcome to <a href="http://persianbookclub.com/">Montreal BookClub</a>
        </h1>



      </main>

      <footer className={styles.footer}>
        <a
          href="http://persianbookclub.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
            <strong>Montreal BookClub</strong>
          </span>
        </a>
      </footer>
    </div>
  )
}
