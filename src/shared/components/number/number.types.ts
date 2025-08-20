export interface NumberProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  number: null | number;
  isStartNumber?: boolean;
  isEnableHover?: boolean;
  isNumberChain?: boolean;
}
