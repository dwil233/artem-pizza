export const getCardType = (cardNumber) => {
  if (!cardNumber) return null;

  if (cardNumber[0] === "2") return "mir.png";
  if (cardNumber[0] === "4") return "visa.png";
  if (cardNumber[0] === "5") return "mc.png";

  return null;
};
