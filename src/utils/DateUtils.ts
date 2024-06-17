export function calculateMinDate(maxAge: number) {
  const today = new Date();
  const yearsInMilliseconds = 1000 * 60 * 60 * 24 * 365;
  const minDate = new Date(today.getTime() - maxAge * yearsInMilliseconds);
  return minDate.toISOString();
}

export function calculateMaxDate(minAge: number) {
  const today = new Date();
  const yearsInMilliseconds = 1000 * 60 * 60 * 24 * 365;
  const maxDate = new Date(today.getTime() - minAge * yearsInMilliseconds);
  return maxDate.toISOString();
}
