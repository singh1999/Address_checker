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

export const validateAddress = async (addressField: AddressField) => {
  const streetNameApiResult: StreetSearchResult = await validateStreetName(
    addressField.streetName
  );

  if (streetNameApiResult.totalResults === 0) {
    return {
      ...addressField,
      valid: false,
      message: 'Street name not valid: ' + addressField.streetName,
    };
  }

  if (!addressField.streetNumber && !addressField.entrance) {
    return {
      ...addressField,
      valid: true,
      message: 'Valid street name: ' + addressField.streetName,
    };
  }

  const houseNumberToCheck = parseInt(addressField.streetNumber);
  const entrance = addressField.entrance;

  const streetIds = streetNameApiResult.streets.flatMap(
    (street: Street) => street.streetIds
  );

  const streetNumberSearchResult: StreetNumberResult =
    await validateStreetNumber(streetIds, houseNumberToCheck);

  const streetNumbersList = streetNumberSearchResult.streetNumbers || [];

  const matchedObj = streetNumbersList.find((streetNumber: StreetNumber) => {
    if (entrance && streetNumber.entrance) {
      return (
        streetNumber.streetNo === houseNumberToCheck &&
        streetNumber.entrance.toLowerCase() === entrance.toLowerCase()
      );
    } else {
      return streetNumber.streetNo === houseNumberToCheck && entrance === '';
    }
  });

  if (matchedObj) {
    return {
      ...addressField,
      valid: true,
      message:
        'Valid address: ' +
        addressField.streetName +
        ' ' +
        addressField.streetNumber +
        addressField.entrance,
    };
  }

  return {
    ...addressField,
    valid: false,
    message:
      'Address not found: ' +
      addressField.streetName +
      ' ' +
      addressField.streetNumber +
      addressField.entrance,
  };
};
