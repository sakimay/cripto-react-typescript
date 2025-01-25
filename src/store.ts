import { create } from "zustand"
import { devtools } from "zustand/middleware";
import { Cryptocurrency, CryptoPrice, Pair } from "./types";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoService";

type CryptoStore = {
    cryptocurrencies: Cryptocurrency[],
    result: CryptoPrice,
    fetchCryptos: () => Promise<void>,
    fetchData: (pair: Pair) => Promise<void>
}

export const useCriptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    result: {} as CryptoPrice,
    fetchCryptos: async () => {
        const result = await getCryptos()
        set(() => ({
            cryptocurrencies: result
        }))
    },
    fetchData: async (pair) => {
        const result = await fetchCurrentCryptoPrice(pair);
        set(() => ({result}))
    }
})))
