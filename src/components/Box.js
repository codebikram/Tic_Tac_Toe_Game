import React from 'react';

const Box = ({ className, value, onClick }) => {
  const cssClass = value
    ? `${className} ${value} column-box`
    : `${className} column-box`;

  return (
    <div className={cssClass} onClick={onClick}>
      {value}
    </div>
  );
};

export default Box;
