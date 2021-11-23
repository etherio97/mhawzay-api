export function nullSafe<T>(data: object): T {
  const result: any = {};
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      result[key] = value;
    }
  });
  return result;
}
