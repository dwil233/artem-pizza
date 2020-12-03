import React from 'react'
import {fireEvent, act, render} from '@testing-library/react';
import {OrderForm} from './OrderForm';

describe("OrderForm", () => {
  it("renders correctly", () => {
    const { getByText, getByLabelText, getByPlaceholderText } = render(<OrderForm orderTotal="200" />)

    expect(getByPlaceholderText("Введите адрес")).toBeInTheDocument()
    expect(getByLabelText("подъезд")).toBeInTheDocument()
    expect(getByLabelText("этаж")).toBeInTheDocument()
    expect(getByLabelText("квартира")).toBeInTheDocument()

    expect(getByPlaceholderText("Номер карты")).toBeInTheDocument()
    expect(getByPlaceholderText("MM/YYYY")).toBeInTheDocument()
    expect(getByPlaceholderText("CVV")).toBeInTheDocument()
    expect(getByPlaceholderText("Имя как на карте")).toBeInTheDocument()

    expect(getByText("Оплатить 200 руб")).toBeInTheDocument()
  })

  describe("on submit", () => {
    it("collects delivery and payment data", async () => {

      const onSubmit = jest.fn()

      const { getByText, getByLabelText, getByPlaceholderText } =
        render(<OrderForm orderTotal="200" onSubmit={onSubmit} />)

      const address = getByPlaceholderText("Введите адрес")
      const entrance = getByLabelText("подъезд")
      const floor = getByLabelText("этаж")
      const flat = getByLabelText("квартира")

      const cardNumber = getByPlaceholderText("Номер карты")
      const cardDate = getByPlaceholderText("MM/YYYY")
      const cardCode = getByPlaceholderText("CVV")
      const cardHolder = getByPlaceholderText("Имя как на карте")


      await act( async () => {
        fireEvent.input(address, {target: {value: "Томск Московский тракт 5"} })
      })
      expect(address.value).toEqual("Томск Московский тракт 5")

      fireEvent.input(entrance, { target: { value: "2" } })
      expect(entrance.value).toEqual("2")

      fireEvent.input(floor, { target: { value: "3" } })
      expect(floor.value).toEqual("3")

      fireEvent.input(flat, { target: { value: "5А" } })
      expect(flat.value).toEqual("5А")

      fireEvent.input(cardNumber,{ target: { value: "5484123456789012" } })
      expect(cardNumber.value).toEqual("5484 1234 5678 9012")

      fireEvent.input(cardDate,{ target: { value: "122022" } })
      expect(cardDate.value).toEqual("12/2022")

      fireEvent.input(cardCode,{ target: { value: "123" } })
      expect(cardCode.value).toEqual("123")

      fireEvent.input(cardHolder,{ target: { value: "IVAN DRAGOV" } })
      expect(cardHolder.value).toEqual("IVAN DRAGOV")

      await act( async () => {
          fireEvent.click(getByText("Оплатить 200 руб"))
        }
      )

      expect(onSubmit).toBeCalled()

      expect(onSubmit).toBeCalledWith({
        "address":"Томск Московский тракт 5",
        "entrance":2,
        "floor":3,
        "flat":"5А",
        "cardNumber":"5484 1234 5678 9012",
        "cardDate":"12/2022",
        "cardCode":"123",
        "cardHolder":"IVAN DRAGOV"
      })

    })
  })
})