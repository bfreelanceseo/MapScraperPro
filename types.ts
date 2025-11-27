export interface BusinessLead {
  id: string;
  name: string;
  phone: string;
  [key: string]: string;
}

export interface SearchState {
  query: string;
  isSearching: boolean;
  results: BusinessLead[];
  error: string | null;
  rawResponse: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}