import React, { useState } from 'react';
import { ValidationResult, AddressField } from './addressValidation.types';
import { IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  StyledActionButtonsContainer,
  StyledAlert,
  StyledButton,
  StyledTextFieldContainer,
  StyledValidationContainer,
} from './addressValidation.styled';
import { validateAddress } from '../../helpers/validateAddress/validateAddress';

export const AddressValidation = () => {
  const [addressFields, setAddressFields] = useState([
    { streetName: '', streetNumber: '', entrance: '' },
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
      { streetName: '', streetNumber: '', entrance: '' },
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
          ...addressFields,
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

  return (
    <StyledValidationContainer>
      {addressFields.map((streetAddress, i) => {
        const validationResult = validationResults[i];
        return (
          <div key={i}>
            <StyledTextFieldContainer>
              <TextField
                label={'Street name ' + (i + 1)}
                value={streetAddress.streetName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange(i, 'streetName', e.target.value)
                }
                error={validationResult ? !validationResult.valid : false}
              ></TextField>
              <TextField
                label="Street number"
                value={streetAddress.streetNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange(i, 'streetNumber', e.target.value)
                }
                error={validationResult ? !validationResult.valid : false}
              ></TextField>
              <TextField
                label="Entrance"
                value={streetAddress.entrance}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFieldChange(i, 'entrance', e.target.value)
                }
                error={validationResult ? !validationResult.valid : false}
              ></TextField>
              {addressFields.length > 1 && (
                <IconButton
                  aria-label="remove address field"
                  onClick={() => handleRemoveField(i)}
                >
                  <DeleteIcon />
                </IconButton>
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
      <StyledActionButtonsContainer>
        <StyledButton
          onClick={handleAddFeild}
          variant="outlined"
          startIcon={<AddIcon />}
          disabled={loading}
        >
          {'New address field'}
        </StyledButton>
        <StyledButton
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Validating....' : 'Validate address'}
        </StyledButton>
      </StyledActionButtonsContainer>
    </StyledValidationContainer>
  );
};
