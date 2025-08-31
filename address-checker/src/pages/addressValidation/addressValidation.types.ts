export type AddressField = 'streetName' | 'streetNumber' | 'entrance';
export type ValidationResult = ResultValues | null;

type ResultValues = {
  valid: boolean;
  message: string;
};
