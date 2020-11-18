import React from 'react';

export function RadioButtonFilter({name, title, currentValue, itemsList, onChange}) {
  return <div>
    {<label htmlFor={name}>{title}</label>}
      {itemsList.map((item) => {
        return <span key={item.id}>
          <label>
          <input
            type="radio"
            value={item.id}
            checked={currentValue === item.id}
            name={name}
            onChange={onChange}
          />
          {item.name}
          </label>
        </span>
      })}
  </div>
}
