import { ChangeEvent, FormEvent, useState } from 'react'

/**
 * @description Initial state must be an objet with the key value is the name of the input and the value is the value of the input
 */
// eslint-disable-next-line no-unused-vars
export function useForm<T>(initialState: { [K in keyof T]: string }) {
  const [inputValues, setInputValues] = useState(initialState)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setInputValues((lastValues) => ({
      ...lastValues,
      [name]: value,
    }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => (values: any) => {
    e.preventDefault()
    console.log(values)
  }

  return {
    inputValues,
    handleInputChange,
    onSubmit,
  }
}
