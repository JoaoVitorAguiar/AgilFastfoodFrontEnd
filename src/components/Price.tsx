import React from 'react';

interface PriceProps {
  value: number;
}

const Price: React.FC<PriceProps> = ({ value }) => {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

  return <span>{formattedValue}</span>;
};

export default Price;
