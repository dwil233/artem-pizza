import React from 'react';

// export function CheckboxFilter({name, title, currentValue, itemsList, pricesList, onChange}) {
//   return <div>
//     {<label htmlFor={name}>{title}</label>}
//     {itemsList.map((item) => {
//       return <span key={item}>
//           <label>
//           <input
//             type="checkbox"
//             value={item}
//             checked={currentValue[item]}
//             name={name}
//             onChange={onChange}
//           />
//             {item}&nbsp;{pricesList[item]}&nbsp;&#8381;
//           </label>
//         </span>
//     })}
//   </div>
// }

export function CheckboxFilter({name, title, currentValue=[], itemsList, pricesList, onChange}) {

  return <div>
    {<label htmlFor={name}>{title}</label>}
    {itemsList.map((item) => {
      return <span key={item}>
          <label>
          <input
            type="checkbox"
            value={item}
            checked={currentValue.indexOf(item)+1}
            name={name}
            onChange={onChange}
          />
            {item}&nbsp;{pricesList[item]}&nbsp;&#8381;
          </label>
        </span>
    })}
  </div>
}