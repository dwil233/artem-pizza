import React from "react";
import styled from "styled-components";

function OrderCardLayout({
  name,
  ingredients,
  address,
  sum,
  card_number,
  className,
  style,
}) {
  return (
    <div className={className} style={style}>
      <p>{name}</p>
      {ingredients}
      <hr />
      <p>{address}</p>
      <hr />
      <p>
        <strong>{sum} руб</strong> &bull; *&nbsp;
        {card_number.slice(-4)}
      </p>
    </div>
  );
}

export const OrderCard = styled(OrderCardLayout)`
  color: #4b4b7c;
  background: #ffffff;
  box-shadow: 0px 8px 16px rgba(75, 75, 124, 0.05);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 8px;

  hr {
    border: 1px dashed #e1e1ed;
  }

  p {
    text-align: left;
    margin: 0px;
    margin-bottom: 16px;
  }

  p:first-child {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }

  p:last-child {
    margin-bottom: 0px;
  }
`;
