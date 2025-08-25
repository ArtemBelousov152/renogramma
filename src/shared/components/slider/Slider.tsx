import { Slider as MuiSlider, SliderProps, styled } from '@mui/material';
import { FC } from 'react';

const StyledSlider = styled(MuiSlider)({
  color: 'var(--primary-color)',
  '& .MuiSlider-thumb': {
    boxShadow: 'var(--box-shadow)',
  },
  '& .MuiSlider-track': {
    boxShadow: 'var(--box-shadow)',
  },
  '& .MuiSlider-rail': {
    boxShadow: 'var(--box-shadow)',
  },
});

export const Slider: FC<SliderProps> = (props) => {
  return <StyledSlider {...props} />;
};
