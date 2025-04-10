import React from 'react';

const LocalizedDate = (props: { date: Date }) => {
  const { date } = props;
  const formattedDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);

  return <span>{formattedDate}</span>;
};

export default LocalizedDate;
