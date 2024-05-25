/* eslint-disable react/jsx-key */
import { frames } from "./frames"
import { appURL } from "../utils"
import getFramesContent from "./content"
import { encodeFunctionData, parseEther } from "viem"
import DeadCaster from "../../public/DeadCaster.json"

console.log("DeadCaster", DeadCaster)

const frameHandler = frames(async (ctx: any) => {
  const page = Number(ctx.searchParams?.pageIndex ?? 0)
  const op = ctx.searchParams?.op
  const requesterFid = ctx.message?.requesterFid
  const inputText = ctx.message?.inputText

  console.log("page", page)
  console.log("op", op)
  console.log("state", ctx.state)

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
    const state = {
      ...ctx.state,
      bounty:
        op === "bounty_0_001_eth"
          ? parseEther("0.001").toString()
          : op === "bounty_0_01_eth"
          ? parseEther("0.01").toString()
          : 0,
    }

    return getFramesContent(page, state)
  }

  if (page === 4) {
    const calldata = encodeFunctionData({
      abi: DeadCaster.abi,
      functionName: "createSecret",
      args: [
        ctx.state.longevity,
        Buffer.from(ctx.state.secret),
        Buffer.from("AES"), // for now hardcoded
        requesterFid,
      ],
    })

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FARCASTER_BACKEND_URL}/create_secret/${requesterFid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: ctx.state.bounty,
          calldata,
        }),
      }
    )

    if (response.ok) {
      return getFramesContent(-1)
    }

    const data = await response.json()
    console.log("data", data)
  }

  return getFramesContent(page)
})

export const GET = frameHandler
export const POST = frameHandler
