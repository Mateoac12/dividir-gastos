import { FormEvent } from 'react'
import Header from './components/Header'
import { useForm } from './hooks/useForm'

function App() {
  const { inputValues, handleInputChange } = useForm({
    total: '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(inputValues.total)
  }

  return (
    <section className="max-w-md mx-auto">
      <Header />
      <form
        onSubmit={handleSubmit}
        className="box-border flex flex-col mx-4 my-4"
      >
        <label>Total gastado</label>
        <input
          value={inputValues.total}
          onChange={handleInputChange}
          className="px-4 py-2 mt-2 border outline-none border-slate-200 rounded-2xl focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
          placeholder="000"
          type="number"
          min="0"
          name="total"
        />
      </form>
    </section>
  )
}

export default App
