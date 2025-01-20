import { create } from "zustand"
import { devtools } from "zustand/middleware";
import { Cryptocurrency } from "./types";
import { getCryptos } from "./services/CryptoService";

type CryptoStore = {
    cryptocurrencies: Cryptocurrency[],
    fetchCryptos: () => Promise<void>
}

export const useCriptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    fetchCryptos: async () => {
        const result = await getCryptos()
        set(() => ({
            cryptocurrencies: result
        }))
    },
})))
