import { create } from "zustand"
import { devtools } from "zustand/middleware";
import { Cryptocurrency, Pair } from "./types";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoService";

type CryptoStore = {
    cryptocurrencies: Cryptocurrency[],
    fetchCryptos: () => Promise<void>,
    fetchData: (pair: Pair) => Promise<void>
}

export const useCriptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    fetchCryptos: async () => {
        const result = await getCryptos()
        set(() => ({
            cryptocurrencies: result
        }))
    },
    fetchData: async (pair) => {
        const result = await fetchCurrentCryptoPrice(pair);
        console.log(result);
        
        
    }
})))
