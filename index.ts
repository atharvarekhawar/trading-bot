import axios from "axios"
import { DepthManager } from "./DepthManager"
import { cancelAll, createOrder } from "./order";

const xaiInrMarket = new DepthManager("B-XAI_INR");

const xaiUsdtMarket = new DepthManager("B-XAI_USDT");

const usdtInrMarket = new DepthManager("B-USDT_INR");

setInterval(() => {
    console.log(xaiInrMarket.getRelevantDepth());
    console.log(xaiUsdtMarket.getRelevantDepth());
    console.log(usdtInrMarket.getRelevantDepth());

    // first way is to sell first and then buy
    const canGetInr = xaiInrMarket.getRelevantDepth().lowestAsk - 0.001;
    const canGetUsdt = canGetInr /usdtInrMarket.getRelevantDepth().lowestAsk;
    const canGetSol = canGetUsdt / xaiUsdtMarket.getRelevantDepth().lowestAsk;

    console.log(`we convert 1 XAI to ${canGetSol}`);

    // second way is to buy first and then sell
    const initialInr = xaiInrMarket.getRelevantDepth().highestBid + 0.001;
    const canGetUsdt2 = xaiUsdtMarket.getRelevantDepth().highestBid;
    const canGetInr2 = canGetUsdt2 * usdtInrMarket.getRelevantDepth().highestBid;

    console.log(`we convert ${initialInr} to ${canGetInr2}`);
    
},2000)

 const main = async () => {
    const highestBid = xaiInrMarket.getRelevantDepth().highestBid;
    console.log(`placing order for ${parseFloat(highestBid) + 0.01}`);
    await createOrder("buy", "XAIINR", (parseFloat(highestBid) + 0.01).toFixed(3), 10, Math.random().toString())
    await new Promise((r) => setTimeout(r, 10000));
    await cancelAll("XAIINR");
    await new Promise((r) => setTimeout(r, 1000));
    main();
}

setTimeout(async () => {
    main();
}, 2000)