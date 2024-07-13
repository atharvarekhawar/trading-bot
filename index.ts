import axios from "axios"
import { DepthManager } from "./DepthManager"

const solInrMarket = new DepthManager("B-SOL_INR");

const solUsdtMarket = new DepthManager("B-SOL_USDT");

const usdtInrMarket = new DepthManager("B-USDT_INR");
