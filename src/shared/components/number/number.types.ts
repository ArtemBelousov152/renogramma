export interface NumberProps
  extends Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    | 'onClick'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'onDoubleClick'
    | 'style'
    | 'onContextMenu'
  > {
  number: null | number;
  isDisabledText?: boolean;
  // TODO: подумать как избавиться от 0 и null
  isStartNumber?: boolean | 0 | null;
  isEnableHover?: boolean;
}
