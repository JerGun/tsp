import Head from "next/head"
import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import { Hero } from "@/components/Hero"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Traveling Salesman Problems</title>
        <link href="/icons/favicon-light.ico" rel="icon" media="(prefers-color-scheme: light)" />
        <link href="/icons/favicon-dark.ico" rel="icon" media="(prefers-color-scheme: dark)" />
        <meta name="description" content="Traveling Salesman Problems powered by Pawaret Muengkaew" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Hero />
    </>
  )
}
