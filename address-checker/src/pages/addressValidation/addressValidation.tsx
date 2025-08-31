import React, { useState } from 'react';
import { ValidationResult, AddressField } from './addressValidation.types';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  StyledAlert,
  StyledButton,
  StyledTextFieldContainer,
  StyledValidationContainer,
} from './addressValidation.styled';
import { validateAddress } from '../../helpers/validateAddress/validateAddress';

export const AddressValidation = () => {
  const [addressFields, setAddressFields] = useState([
    { streetName: '', houseNumber: '', houseLetter: '' },
  ]);
  const [validationResults, setValidationResults] = useState<
    ValidationResult[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const handleFieldChange = (
    index: number,
    key: AddressField,
    value: string
  ) => {
    const updatedFeilds = [...addressFields];
    updatedFeilds[index][key] = value;
    setAddressFields(updatedFeilds);
  };

  const handleAddFeild = () => {
    setAddressFields([
      ...addressFields,
      { streetName: '', houseNumber: '', houseLetter: '' },
    ]);
    setValidationResults([...validationResults, null]);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = addressFields.filter((field, i) => i !== index);
    setAddressFields(updatedFields);
    const updatedResults = validationResults.filter((field, i) => i !== index);
    setValidationResults(updatedResults);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const validAddresses = addressFields.filter(
      (field) => field.streetName.length > 0
    );

    if (validAddresses.length === 0) {
      setValidationResults([
        {
          streetName: '',
          houseNumber: '',
          houseLetter: '',
          valid: false,
          message: 'Enter one street name',
        },
      ]);
      setLoading(false);
      return;
    }

    const results = await Promise.all(
      validAddresses.map((field) => validateAddress(field))
    );

    setValidationResults(results);
    setLoading(false);
  };
  console.log(loading);

  return (
    <StyledValidationContainer>
      {addressFields.map((streetAddress, i) => {
        const validationResult = validationResults[i];
        return (
          <div key={i}>
            <StyledTextFieldContainer>
              <TextField
                label="Street name"
                value={streetAddress.streetName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange(i, 'streetName', e.target.value)
                }
                error={validationResult ? !validationResult.valid : false}
              ></TextField>
              <TextField
                label="House number"
                value={streetAddress.houseNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange(i, 'houseNumber', e.target.value)
                }
                error={validationResult ? !validationResult.valid : false}
              ></TextField>
              <TextField
                label="House letter"
                value={streetAddress.houseLetter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange(i, 'houseLetter', e.target.value)
                }
                error={validationResult ? !validationResult.valid : false}
              ></TextField>
              {addressFields.length > 1 && (
                <Button
                  onClick={() => handleRemoveField(i)}
                  variant="contained"
                  endIcon={<DeleteIcon />}
                >
                  remove field
                </Button>
              )}
            </StyledTextFieldContainer>
            {validationResult && (
              <StyledAlert
                severity={validationResult.valid ? 'success' : 'error'}
              >
                {validationResult.message}
              </StyledAlert>
            )}
          </div>
        );
      })}

      <StyledButton
        onClick={handleAddFeild}
        variant="contained"
        startIcon={<AddIcon />}
        disabled={loading}
      >
        {'Add Field'}
      </StyledButton>
      <StyledButton
        onClick={handleSubmit}
        variant="outlined"
        disabled={loading}
      >
        {loading ? 'Validating....' : 'Validate address'}
      </StyledButton>
    </StyledValidationContainer>
  );
};
