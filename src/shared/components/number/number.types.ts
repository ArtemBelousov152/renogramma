export interface NumberProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  number: null | number;
  isDisabledText?: boolean;
  isStartNumber?: boolean;
  isEnableHover?: boolean;
}
