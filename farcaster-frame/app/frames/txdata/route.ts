// import { transaction } from "frames.js/core"
// import { Abi, createPublicClient, getContract, http } from "viem"
// import { scrollSepolia } from "viem/chains"
// import { frames } from "../frames"

// export const POST = frames(async (ctx) => {
//   if (!ctx?.message) {
//     throw new Error("Invalid frame message")
//   }

//   const publicClient = createPublicClient({
//     chain: scrollSepolia,
//     transport: http(),
//   })

//   // const oasisAddress = "0x5f588FF374D788470af75A55253FD6488Ea9c90e"
//   // const scrollAddress = "0x2A123CAb6eb46A22ad1FeBF5a73F7832601775ad"
//   // const contractAddress = oasisAddress

//   // const deadCasterContract = getContract({
//   //   address: contractAddress,
//   //   abi: BuyMeACoffeeABI,
//   //   client: publicClient,
//   // })

//   return transaction({
//     chainId: "eip155:10", // OP Mainnet 10
//     method: "eth_sendTransaction",
//     params: {
//       abi: BuyMeACoffeeABI as Abi,
//       to: contractAddress,
//       data: calldata,
//       value: 0n.toString(),
//     },
//   })
// })
