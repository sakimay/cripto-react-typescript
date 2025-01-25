import { useCriptoStore } from "../store";
import { currencies } from "../data";
import { ChangeEvent, useState } from "react";
import { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";


export default function CriptoSearchForm() {

    const cryptocurrencies = useCriptoStore((state) => state.cryptocurrencies);
    const fetchData = useCriptoStore((state) => state.fetchData);
    const [pair, setPair] = useState<Pair>({
        currency: '',
        criptocurrency: ''
    })
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        })
    }
    const [error, setError] = useState('')
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(pair).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }
        setError('')
        fetchData(pair)
    }
    return (
        <form className="form" onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="field">
                <label htmlFor="currency">Moneda:</label>
                <select
                    name="currency"
                    id="currency"
                    onChange={handleChange}
                    value={pair.currency}
                >
                    <option value="">-- Seleccione --</option>
                    {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>{currency.name}</option>
                    ))}
                </select>
            </div>
            <div className="field">
                <label htmlFor="criptocurrency">Moneda:</label>
                <select
                    name="criptocurrency"
                    id="criptocurrency"
                    value={pair.criptocurrency}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {cryptocurrencies.map(cryptocurrency => (
                        <option key={cryptocurrency.CoinInfo.Name} value={cryptocurrency.CoinInfo.Name}>{cryptocurrency.CoinInfo.FullName}</option>
                    ))}
                </select>
            </div>
            <input type="submit" value="Cotizar" />
        </form>
    )
}
