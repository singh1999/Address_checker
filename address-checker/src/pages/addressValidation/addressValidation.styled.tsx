import styled from '@emotion/styled';
import { Alert, Button } from '@mui/material';

export const StyledValidationContainer = styled('div')(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    marginTop: 100,
    marginBottom: 20,
    gap: 12,
    maxWidth: '80%',
    '@media(max-width: 600px)': {
      maxWidth: '100%',
      marginTop: 75,
      gap: 30,
    },
    alignItems: 'center',
    justifyContent: 'center',
  } as const;
});
export const StyledTextFieldContainer = styled('div')(() => {
  return {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr auto',
    gap: 8,

    '@media(max-width: 600px)': {
      gridTemplateColumns: '1fr 1fr auto', // 3 columns for the row under first child
      gridTemplateRows: 'auto auto', // first row = first child, second row = rest
      '& > :first-child': {
        gridColumn: '1 / -1', // first child spans full width
      },
    },
  } as const;
});

export const StyledAlert = styled(Alert)(() => {
  return {
    margin: '12px 0 20px 0',
  };
});

export const StyledButton = styled(Button)(() => {
  return {
    minWidth: 200,
  };
});

export const StyledActionButtonsContainer = styled('div')(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  } as const;
});
