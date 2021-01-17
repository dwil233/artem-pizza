import React, { forwardRef, Fragment } from "react";
import styled from "styled-components";

const RadioButtonFilter = forwardRef(
  ({ name, title, items, className }, ref) => {
    return (
      <div className={className}>
        <div>{title}</div>
        <div>
          {items.map((item) => {
            return (
              <Fragment key={item.slug}>
                <input
                  ref={ref}
                  type="radio"
                  value={item.slug}
                  id={item.slug}
                  name={name}
                />
                <label htmlFor={item.slug}>{item.name}</label>
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  }
);

export const StyledRadioButtonFilter = styled(RadioButtonFilter)`
  margin-bottom: 16px;

  div:first-child {
    font-weight: 500;
    display: flex;
    color: #4b4b7c;
    padding-left: 16px;
    margin-bottom: 4px;
  }

  div:nth-child(2) {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;

    ::-webkit-scrollbar {
      display: none;
    }

    height: 32px;
    background: #f9f9fb;
    border-radius: 12px;
    padding: 2px;
    margin: 4px 16px;

    label {
      cursor: pointer;
      padding: 4px 12px;
      line-height: 20px;
      color: #4b4b7c;
    }

    input {
      display: none;
    }

    input:checked + label {
      font-weight: 500;
      background-color: #ffffff;
      color: #1f1f33;
      border-radius: 10px;
      box-shadow: 0px 3px 4px rgba(75, 75, 124, 0.05),
        0px 0px 2px rgba(75, 75, 124, 0.2);
    }
  }
`;
