import React from 'react'
import {useForm} from 'react-hook-form';

export function ProductCreationPage() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <label>Наименование продукта:
      <input ref={register} name="name"/>
    </label>
    <label>Идентификатор:
      <input ref={register} name="slug"/>
    </label>
    <label>Цена:
    <input ref={register} name="price" type="tel"/>
    </label>
    <label>Картинка:
      <input ref={register} name="picture" type="file"/>
    </label>
    <button>Сохранить</button>
    </form>
}