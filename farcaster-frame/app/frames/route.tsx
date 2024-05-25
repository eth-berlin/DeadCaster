/* eslint-disable react/jsx-key */
import { frames } from "./frames"
import { appURL } from "../utils"
import getFramesContent from "./content"
import { encodeFunctionData, parseEther } from "viem"
import DeadCaster from "../../public/DeadCaster.json"
import { ethers } from "ethers"

const frameHandler = frames(async (ctx: any) => {
  const page = Number(ctx.searchParams?.pageIndex ?? 0)
  const op = ctx.searchParams?.op
  const requesterFid = ctx.message?.requesterFid
  const inputText = ctx.message?.inputText

  const iface = new ethers.Interface(DeadCaster.abi)

  const args = [
    30,
    Buffer.from("secret"),
    "AES", // for now hardcoded
    3,
  ]

  // const calldata = encodeFunctionData({
  //   abi: DeadCaster.abi,
  //   functionName: "createSecret",
  // args
  // })

  // console.log("calldata", calldata)

  // console.log("page", page)
  // console.log("op", op)
  // console.log("state", ctx.state)

  if (page === 0) {
    return getFramesContent(page, ctx.state)
  }

  if (page === 1) {
    const state = { ...ctx.state, secret: inputText }

    return getFramesContent(page, state)
  }

  if (page === 2) {
    const state = {
      ...ctx.state,
      longevity:
        op === "time_10_seconds" ? 10 : op === "time_weekly" ? 604800 : 0,
    }

    return getFramesContent(page, state)
  }

  if (page === 3) {
    const bounty =
      op === "bounty_0_001_eth"
        ? "0.001"
        : op === "bounty_0_01_eth"
        ? "0.01"
        : "0"

    const iface = new ethers.Interface(DeadCaster.abi)

    const args = [
      30,
      Buffer.from("secret"),
      "AES", // for now hardcoded
      3,
    ]

    const calldata = iface.encodeFunctionData("createSecret", args)

    const searchParams = new URLSearchParams()
    searchParams.append("calldata", calldata)
    searchParams.append("value", bounty)

    const url = `${
      process.env.NEXT_PUBLIC_FARCASTER_BACKEND_URL
    }?${searchParams.toString()}`

    const state = { ...ctx.state, bounty, url }

    console.log("state", state)

    return getFramesContent(page, state)
  }

  if (page === 4) {
    return getFramesContent(page, { ...ctx.state })
  }

  return getFramesContent(page)
})

export const GET = frameHandler
export const POST = frameHandler
