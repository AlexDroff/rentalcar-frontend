export const formatMileage = (mileage: number) => {
  return mileage.toLocaleString('en-US').replace(/,/g, ' ');
};

export const parseAddress = (address: string) => {
  const parts = address.split(',').map((p) => p.trim());

  return {
    city: parts[1] || '',
    country: parts[2] || '',
  };
};
