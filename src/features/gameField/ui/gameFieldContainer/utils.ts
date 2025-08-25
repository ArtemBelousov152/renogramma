export const getBorderRadiusDictionary = ({
  fieldHeight,
  fieldWidth,
}: {
  fieldHeight: number;
  fieldWidth: number;
}) => {
  return {
    [`0,0`]: '10px 0 0 0',
    [`0,${fieldHeight - 1}`]: '0 0 0 10px',
    [`${fieldWidth - 1},${fieldHeight - 1}`]: '0 0 10px 0',
    [`${fieldWidth - 1},0`]: '0 10px 0 0',
  };
};
