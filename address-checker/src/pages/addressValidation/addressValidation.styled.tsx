import styled from '@emotion/styled';

export const StyledValidationContainer = styled('div')(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    margin: 18,
    gap: 12,
  } as const;
});
