import CriptoSearchForm from "./components/CriptoSearchForm"
import { useCriptoStore } from "./store"
import { useEffect } from "react";

function App() {
  
  const fetchCryptos = useCriptoStore((state) => state.fetchCryptos);

  useEffect(() => {
    fetchCryptos();
  }, [])
  return (
    <>
      <div className="container">
        <h1 className="app-title">
          Cotizador de <span>Criptomonedas</span>
        </h1>
        <div className="content">
          <CriptoSearchForm/>
        </div>
      </div>
    </>
  )
}

export default App
