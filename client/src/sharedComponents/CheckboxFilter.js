import React from "react";

export function CheckboxFilter({ register, name, title, itemsList }) {
  return (
    <div>
      {<label htmlFor={name}>{title}</label>}
      {itemsList.map((item) => {
        return (
          <span key={item.slug}>
            <label>
              <input
                ref={register}
                type="checkbox"
                value={item.slug}
                name={name}
              />
              {item.name}&nbsp;{item.price}&nbsp;&#8381;
            </label>
          </span>
        );
      })}
    </div>
  );
}
