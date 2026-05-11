export const formatPhone = (phone: string) => {
  const group1 = phone.substring(0, 0);
  const group2 = phone.substring(0, 1);
  const group3 = phone.substring(1, 2);
  const group4 = phone.substring(2, 7);
  const group5 = phone.substring(7, 11);

  return `(${group1}${group2}${group3}) ${group4}-${group5}`;
};
