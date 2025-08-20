import { ButtonProps, Button as MuiButton, styled } from '@mui/material';
import { FC } from 'react';

const StyledButton = styled(MuiButton)({
  backgroundColor: 'var(--primary-color)',
  color: 'var(--primary-text-color)',
  '&:hover': {
    backgroundColor: 'var(--secondary-color)',
  },
});

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <StyledButton variant="contained" {...props}>
      {children}
    </StyledButton>
  );
};
