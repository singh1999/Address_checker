import {
  validateStreetName,
  validateStreetNumber,
} from '../../services/addressValidationService/addressValidationService';
import {
  AddressField,
  Street,
  StreetSearchResult,
  StreetNumber,
  StreetNumberResult,
} from './validateAddress.types';

export const validateAddress = async (field: AddressField) => {
  const streetNameApiResult: StreetSearchResult = await validateStreetName(
    field.streetName
  );

  if (streetNameApiResult.totalResults === 0) {
    return {
      ...field,
      valid: false,
      message: 'Street name not valid',
    };
  }

  if (!field.houseNumber && !field.houseLetter) {
    return {
      ...field,
      valid: true,
      message: 'Valid street name',
    };
  }

  const houseNumberToCheck = parseInt(field.houseNumber);
  const houseLetter = field.houseLetter;

  const streetIds = streetNameApiResult.streets.flatMap(
    (street: Street) => street.streetIds
  );

  const streetNumberSearchResult: StreetNumberResult =
    await validateStreetNumber(streetIds, houseNumberToCheck);

  const streetNumbersList = streetNumberSearchResult.streetNumbers || [];

  const matchedObj = streetNumbersList.find((streetNumber: StreetNumber) => {
    if (houseLetter && streetNumber.entrance) {
      return (
        streetNumber.streetNo === houseNumberToCheck &&
        streetNumber.entrance.toLowerCase() === houseLetter.toLowerCase()
      );
    } else {
      return streetNumber.streetNo === houseNumberToCheck && houseLetter === '';
    }
  });

  if (matchedObj) {
    return {
      ...field,
      valid: true,
      message: 'Valid street address',
    };
  }

  return {
    ...field,
    valid: false,
    message: 'Address not found',
  };
};
