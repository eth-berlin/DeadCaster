import { fetchMetadata } from "frames.js/next"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { createDebugUrl } from "./debug"
import { appURL, currentURL } from "./utils"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "DeadCaster",
    description: "Your final cast for all to see!",
    other: {
      ...(await fetchMetadata(new URL("/frames", appURL()))),
    },
  }
}

// This is a react server component only
export default async function Home() {
  return (
    <div className="p-4 text-center flex flex-col align-center">
      <div className="flex justify-center">
        <Image
          src="https://i.imgur.com/jox2Gj2.png"
          alt="logo"
          width="400"
          height="400"
        />
      </div>

      <div className="m-4">
        <Link href={"https://warpcast.com/dudeamir.eth"} className="underline">
          dudeamir.eth
        </Link>{" "}
        <Link href={"https://warpcast.com/caruso33"} className="underline">
          caruso33
        </Link>{" "}
        <Link href={"https://warpcast.com/flobrown.eth"} className="underline">
          flobrown.eth
        </Link>{" "}
        <Link href={"https://warpcast.com/nyyls"} className="underline">
          Nyyls
        </Link>
      </div>
    </div>
  )
}
