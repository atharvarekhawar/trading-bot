import axios from "axios"
import { DepthManager } from "./DepthManager"

const solInrMarket = new DepthManager("B-XAI_INR");

const solUsdtMarket = new DepthManager("B-XAI_USDT");

const usdtInrMarket = new DepthManager("B-USDT_INR");

setInterval(() => {
    console.log(solInrMarket.getRelevantDepth());
    console.log(solUsdtMarket.getRelevantDepth());
    console.log(usdtInrMarket.getRelevantDepth());

    // first way is to sell first and then buy
    const canGetInr = solInrMarket.getRelevantDepth().lowestAsk - 0.001;
    const canGetUsdt = canGetInr /usdtInrMarket.getRelevantDepth().lowestAsk;
    const canGetSol = canGetUsdt / solUsdtMarket.getRelevantDepth().lowestAsk;

    console.log(`we convert 1 XAI to ${canGetSol}`);

    // second way is to buy first and then sell
    const initialInr = solInrMarket.getRelevantDepth().highestBid + 0.001;
    const canGetUsdt2 = solUsdtMarket.getRelevantDepth().highestBid;
    const canGetInr2 = canGetUsdt2 * usdtInrMarket.getRelevantDepth().highestBid;

    console.log(`we convert ${initialInr} to ${canGetInr2}`);
    
},2000)
