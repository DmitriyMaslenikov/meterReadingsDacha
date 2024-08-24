export const AddZero = (data: number) => {
  if (data / 10 < 1) {
    return `0${data}`;
  } else return data;
};
