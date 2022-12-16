export const getProperty = (
  o: Object | undefined | null,
  property: string
): any | null => {
  if (!o) {
    return null;
  }
  if (o.hasOwnProperty(property)) {
    return o[property];
  }
  return null;
};
