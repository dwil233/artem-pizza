import React from 'react';

export function RadioButtonFilter({register, name, title, itemsList}) {
  return <div>
    {<label htmlFor={name}>{title}</label>}
      {itemsList.map((item) => {
        return <span key={item.id}>
          <label>
          <input
            ref={register}
            type="radio"
            value={item.id}
            name={name}
          />
          {item.name}
          </label>
        </span>
      })}
  </div>
}
