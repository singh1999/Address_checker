export type AddressField = 'streetName' | 'houseNumber' | 'houseLetter';
export type ValidationResult = ResultValues | null;

type ResultValues = {
  streetName: string;
  houseNumber: string;
  houseLetter: string;
  valid: boolean;
  message: string;
};
