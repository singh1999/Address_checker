import React, { useState } from 'react';
import { validateStreetName } from '../../services/addressValidationService/addressValidationService';
import { StreetName } from './addressValidation.types';
import { Alert, Button, TextField } from '@mui/material';
import { StyledValidationContainer } from './addressValidation.styled';

export const AddressValidation = () => {
  const [streetNameInput, setStreetNameInput] = useState('');
  const [alertMessage, setAlerMessage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!streetNameInput) {
      setError(true);
      setAlerMessage('Empty street name field');
      return;
    }

    const apiResult: StreetName = await validateStreetName(streetNameInput);
    if (apiResult.totalResults > 0) {
      console.log(apiResult);
      setAlerMessage('Valid street name');
      setError(false);
    } else {
      setAlerMessage('No street found');
      setError(true);
    }
  };

  return (
    <StyledValidationContainer>
      <TextField
        label="Street name"
        value={streetNameInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setStreetNameInput(e.target.value)
        }
        error={error}
      ></TextField>
      {error ? (
        <Alert severity="error">{alertMessage}</Alert>
      ) : (
        <Alert severity="success">{alertMessage}</Alert>
      )}
      <Button onClick={handleSubmit} variant="contained">
        Validate address
      </Button>
    </StyledValidationContainer>
  );
};
