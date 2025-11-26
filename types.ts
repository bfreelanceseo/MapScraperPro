export interface BusinessLead {
  id: string;
  name: string;
  address: string;
  rating: string;
  reviews: string;
  website: string;
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
