import React from 'react';

export function CheckboxFilter({name, title, currentValue=[], itemsList, onChange}) {

  return <div>
    {<label htmlFor={name}>{title}</label>}
    {itemsList.map((item) => {
      return <span key={item.id}>
          <label>
          <input
            type="checkbox"
            value={item.id}
            checked={currentValue.includes(item.id)}
            name={name}
            onChange={onChange}
          />
            {item.name}&nbsp;{item.price}&nbsp;&#8381;
          </label>
        </span>
    })}
  </div>
}