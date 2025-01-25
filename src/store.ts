import { create } from "zustand"
import { devtools } from "zustand/middleware";
import { Cryptocurrency, CryptoPrice, Pair } from "./types";
import { fetchCurrentCryptoPrice, getCryptos } from "./services/CryptoService";

type CryptoStore = {
    cryptocurrencies: Cryptocurrency[],
    result: CryptoPrice,
    loading: boolean,
    fetchCryptos: () => Promise<void>,
    fetchData: (pair: Pair) => Promise<void>
}

export const useCriptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    result: {} as CryptoPrice,
    loading: false,
    fetchCryptos: async () => {
        const result = await getCryptos()
        set(() => ({
            cryptocurrencies: result
        }))
    },
    fetchData: async (pair) => {
        set(() => ({loading: true}))
        const result = await fetchCurrentCryptoPrice(pair);
        set(() => ({
            result,
            loading: false
        }))
    }
})))
