export const getCardType = (cardNumber) => {
  let cardType = ""

  if (!cardNumber) return ""

  if (cardNumber[0]==="2") cardType="Мир"
  if (cardNumber[0]==="4") cardType="VISA"
  if (cardNumber[0]==="5") cardType="MasterCard"

  return cardType
}