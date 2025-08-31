import React, { useState } from 'react';
import {
  validateStreetName,
  validateStreetNumber,
} from '../../services/addressValidationService/addressValidationService';
import {
  Street,
  StreetName,
  StreetNumber,
  StreetNumberResult,
} from './addressValidation.types';
import { Alert, Button, TextField } from '@mui/material';
import {
  StyledTextFieldContainer,
  StyledValidationContainer,
} from './addressValidation.styled';

export const AddressValidation = () => {
  const [streetAddress, setStreetAddress] = useState({
    streetName: '',
    houseNumber: '',
    houseLetter: '',
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!streetAddress.streetName) {
      setError(true);
      setAlertMessage('Empty street name field');
      return;
    }

    const streetNameApiResult: StreetName = await validateStreetName(
      streetAddress.streetName
    );

    if (streetNameApiResult.totalResults === 0) {
      setError(true);
      setAlertMessage('No street found');
      return;
    }

    if (!streetAddress.houseNumber && !streetAddress.houseLetter) {
      setError(false);
      setAlertMessage('Valid street name');
      return;
    }

    const houseNumberToCheck = parseInt(streetAddress.houseNumber);
    const houseLetter = streetAddress.houseLetter;
    const streetIds = streetNameApiResult.streets.flatMap(
      (street: Street) => street.streetIds
    );
    const streetNumberSearchResult: StreetNumberResult =
      await validateStreetNumber(streetIds, houseNumberToCheck);

    const streetNumbersList = streetNumberSearchResult.streetNumbers || [];

    // Find a matching street number + house letter
    const matchedObj = streetNumbersList.find((streetNumber: StreetNumber) => {
      if (houseLetter && streetNumber.entrance) {
        return (
          streetNumber.streetNo === houseNumberToCheck &&
          streetNumber.entrance.toLowerCase() === houseLetter.toLowerCase()
        );
      } else {
        return (
          streetNumber.streetNo === houseNumberToCheck && houseLetter === ''
        );
      }
    });

    if (matchedObj) {
      setError(false);
      setAlertMessage(
        'Valid street address: ' +
          'Lat ' +
          matchedObj.latitude +
          ' Long ' +
          matchedObj.longitude
      );
    } else {
      setError(true);
      setAlertMessage('Street number not found');
    }
  };

  return (
    <StyledValidationContainer>
      <StyledTextFieldContainer>
        <TextField
          label="Street name"
          value={streetAddress.streetName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStreetAddress((prev) => ({
              ...prev,
              streetName: e.target.value,
            }))
          }
          error={error}
        ></TextField>
        <TextField
          label="House number"
          value={streetAddress.houseNumber ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStreetAddress((prev) => ({
              ...prev,
              houseNumber: e.target.value,
            }))
          }
          error={error}
          type="number"
        ></TextField>
        <TextField
          label="House letter"
          value={streetAddress.houseLetter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStreetAddress((prev) => ({
              ...prev,
              houseLetter: e.target.value,
            }))
          }
          error={error}
          type="text"
        ></TextField>
      </StyledTextFieldContainer>
      {alertMessage && (
        <Alert severity={error ? 'error' : 'success'}>{alertMessage}</Alert>
      )}
      <Button onClick={handleSubmit} variant="contained">
        Validate address
      </Button>
    </StyledValidationContainer>
  );
};
