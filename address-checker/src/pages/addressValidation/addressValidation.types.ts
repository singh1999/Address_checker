export type StreetName = {
  streets: Street[];
  totalResults: number;
};

export type Street = {
  streetIds: number[];
};
export type StreetNumberResult = {
  streetNumbers: StreetNumber[];
};

export type StreetNumber = {
  streetNo: number;
  entrance: string;
  latitude: number;
  longitude: number;
};
