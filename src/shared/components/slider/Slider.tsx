import { Slider as MuiSlider, SliderProps, styled } from '@mui/material';
import { FC } from 'react';

const StyledSlider = styled(MuiSlider)({
  color: 'var(--primary-color)',
});

export const Slider: FC<SliderProps> = (props) => {
  return <StyledSlider {...props} />;
};
