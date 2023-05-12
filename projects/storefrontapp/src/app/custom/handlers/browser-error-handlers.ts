export const logErrors = () => {
  return (error: any) => {
    console.warn(error);
  };
};
