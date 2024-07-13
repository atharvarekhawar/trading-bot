import axios from "axios"

export class DepthManager {
    private market: string;
    private bids: {
        [key: string]: string
    }
    private asks: {
        [key: string]: string
    }
    constructor(market: string) {
        this.market = market;
        this.bids = {};
        this.asks = {};

        setInterval(() => {
            this.pollMarket();
        }, 3000)
    }

    async pollMarket() {
        const res = await fetch(`https://public.coindcx.com/market_data/orderbook?pair=${this.market}`);
        const depth = await res.json();
        this.bids = depth.bids;
        this.asks = depth.asks;
    }
}