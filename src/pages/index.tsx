import { Hero } from "@/components/Hero"
import Head from "next/head"

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
