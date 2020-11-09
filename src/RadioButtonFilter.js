import React from 'react';

export function RadioButtonFilter({name, title, currentValue, itemsList, onChange}) {
  return <div>
    {<label htmlFor={name}>{title}</label>}
      {itemsList.map((item) => {
        return <span key={item}>
          <label>
          <input
            type="radio"
            value={item}
            checked={currentValue === item}
            name={name}
            onChange={onChange}
          />
          {item}
          </label>
        </span>
      })}
  </div>
}
