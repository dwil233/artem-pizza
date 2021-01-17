import React from "react";
import styled from "styled-components";

function CheckboxFilter({ register, name, title, items, className }) {
  return (
    <div className={className}>
      <div>{title}</div>
      <div>
        {items.map((item) => {
          return (
            <div key={item.slug}>
              <input
                ref={register}
                type="checkbox"
                value={item.slug}
                name={name}
                id={item.id}
              />
              <label htmlFor={item.id}>
                <div>
                  <img
                    src={`${process.env.REACT_APP_HOST}/${item.thumbnail}`}
                    alt={item.name}
                  />
                </div>
                <p>{item.name}</p>
                <div>
                  {item.price}&nbsp;&#8381; <span></span>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const StyledCheckboxFilter = styled(CheckboxFilter)`
  margin-bottom: 16px;

  > div:first-child {
    font-weight: 500;
    display: flex;
    color: #4b4b7c;
    padding-left: 16px;
  }

  > div:nth-child(2) {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    padding-left: 16px;

    ::-webkit-scrollbar {
      display: none;
    }

    label {
      display: block;
      cursor: pointer;
      background: #ffffff;
      box-shadow: 0px 2px 8px rgba(75, 75, 124, 0.1);
      border-radius: 12px;
      border: 2px solid #ffffff;
      min-width: 104px;
      padding: 8px 12px;
      margin: 8px 8px 8px 0px;

      // image container
      div:first-child {
        width: 64px;
        height: 64px;
        margin-left: auto;
        margin-right: auto;
        transform: translateY(-15px);
      }

      // topping name
      p {
        font-weight: 400;
        margin: 0;
        transform: translateY(-8px);
      }

      // price and checkbox
      div:last-child {
        font-size: 16px;
        font-weight: 500;
        display: flex;
        justify-content: space-between;
        align-items: center;

        // custom checkbox
        span {
          position: relative;
          display: inline-block;
          height: 20px;
          width: 20px;
          border: 2px solid #e1e1ed;
          border-radius: 4px;
          background-color: transparent;
        }
      }
    }

    input {
      width: 1px;
      height: 1px;
      opacity: 0;
      appearance: none;
      position: absolute;
    }

    input:checked + label {
      border: 2px solid #00a896;
    }

    input:checked + label > p {
      font-weight: 500;
    }

    input:checked + label > div > span {
      background: #00a896;
      border: 1px solid #00a896;
    }

    input:checked + label > div > span::before {
      content: url("assets/icons/icn_check.svg");
      filter: brightness(0) invert(1); // make checkmark white
      position: absolute; // this and below is to center
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      transform: translate(-50%, -50%);
    }

    img {
      max-width: 64px;
      max-height: 64px;
    }
  }
`;
