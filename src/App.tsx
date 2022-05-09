import { ChangeEvent, FormEvent, useState } from 'react'
import Header from './components/molecules/Header'

interface ErrorProps {
  message: string
  type: 'error' | 'success' | 'warning'
}

function App() {
  const [total, setTotal] = useState<string>('')
  const [hasTotal, setHasTotal] = useState<boolean>(false)
  const [error, setError] = useState<ErrorProps | null>(null)
  const [productsData, setProductsData] = useState<any[]>([])

  const handleSetTotal = (e: ChangeEvent<HTMLInputElement>) =>
    setTotal(e.target.value)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (total.trim() === '')
      return setError({ type: 'error', message: 'No has ingresado un numero' })
    if (Number(total) === 0)
      return setError({ type: 'error', message: 'No has ingresado un numero' })

    setHasTotal(true)
    setError(null)
  }

  const normalizedPrice = (strPrice: string) => {
    const price = Number(strPrice)
    const formatter = new Intl.NumberFormat('es-UY', {
      style: 'currency',
      currency: 'UYU',
    })

    const priceFormatted = formatter.format(price)
    return priceFormatted
  }

  const handleAddProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const productValue = e.target.elements.product.value
    const priceValue = e.target.elements.price.value

    // reset values
    e.target.elements.product.value = ''
    e.target.elements.price.value = ''

    setProductsData((lastProducts) =>
      lastProducts.concat({
        product: productValue,
        price: priceValue,
      })
    )

    console.log({
      productValue,
      priceValue,
    })
  }

  return (
    <section>
      <Header />
      <form onSubmit={handleSubmit}>
        <h3>Ingrese el total de los gastos:</h3>
        <input
          placeholder="1200"
          type="number"
          value={total}
          onChange={handleSetTotal}
        />
      </form>
      {error && <p className={`${error.type}-message`}>{error.message}</p>}
      {hasTotal && (
        <>
          <h3>El total es: {normalizedPrice(total)}</h3>
          <form onSubmit={handleAddProduct}>
            <h3>Ingrese el producto y su cantidad</h3>
            <input placeholder="Pizza" name="product" />
            <input placeholder="200" type="number" name="price" />
            <button>Enviar</button>
          </form>
          {Boolean(productsData.length) &&
            productsData.map((prod, id) => (
              <span key={`${prod.product}-${id}`}>{prod.product}</span>
            ))}
        </>
      )}
    </section>
  )
}

export default App
