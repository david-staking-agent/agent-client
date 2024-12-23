import axios from "axios";

// export const getQuote = async (CHAIN_ID, sellToken, buyToken, amountSell, taker) => {
//   const quoteParams = new URLSearchParams({
//     chainId: CHAIN_ID,
//     sellToken: sellToken,
//     buyToken: buyToken,
//     amountSell: amountSell.toString(),
//     taker: taker,
//   });

//   try {
//     const response = await axios(
//       `https://api.0x.org/swap/permit2/quote?${quoteParams.toString()}`,
//       {
//         headers: {
//           "0x-api-key": "ffa398d4-4bd6-41f4-b5f4-ecae93d43c03",
//           "0x-version": "v2",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.log("Error fetching quote from 0x API:", error.message || error);
//   }
// };
