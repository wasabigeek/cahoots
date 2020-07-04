export function popKey(obj, key) {
  const value = obj[key];
  delete obj[key];
  return value;
}
