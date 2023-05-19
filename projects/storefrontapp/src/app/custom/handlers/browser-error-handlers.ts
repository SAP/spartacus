export const logErrors = () => {
  return (error: any) => {
    // console.warn(error); // SPIKE TODO UNCOMMENT
    console.warn(error?.message);
  };
};
