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
    },
    alignItems: 'center',
    justifyContent: 'center',
  } as const;
});
export const StyledTextFieldContainer = styled('div')(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    '& > :first-child': {
      flex: 3,
    },
    '& > :not(:first-child):not(:last-child)': {
      flex: 1,
    },
    '& > :last-child': {
      flex: '0 0 auto',
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
