export interface PostcodeData {
  country: 'NZ' | 'AU';
  state: string;
  region: string;
  postcode: string;
  locality: string;
}

export const postcodeData: PostcodeData[] = [
  // New Zealand postcodes
  {
    country: 'NZ',
    state: 'Auckland',
    region: 'Auckland',
    postcode: '1010',
    locality: 'Auckland Central'
  },
  {
    country: 'NZ',
    state: 'Wellington',
    region: 'Wellington',
    postcode: '6011',
    locality: 'Wellington Central'
  },
  {
    country: 'NZ',
    state: 'Canterbury',
    region: 'Christchurch',
    postcode: '8011',
    locality: 'Christchurch Central'
  },
  // Australia postcodes
  {
    country: 'AU',
    state: 'New South Wales',
    region: 'Sydney',
    postcode: '2000',
    locality: 'Sydney'
  },
  {
    country: 'AU',
    state: 'Victoria',
    region: 'Melbourne',
    postcode: '3000',
    locality: 'Melbourne'
  },
  {
    country: 'AU',
    state: 'Queensland',
    region: 'Brisbane',
    postcode: '4000',
    locality: 'Brisbane'
  }
];

export const getStatesByCountry = (country: 'NZ' | 'AU'): string[] => {
  const states = new Set(postcodeData
    .filter(data => data.country === country)
    .map(data => data.state));
  return Array.from(states);
};

export const getRegionsByState = (country: 'NZ' | 'AU', state: string): string[] => {
  const regions = new Set(postcodeData
    .filter(data => data.country === country && data.state === state)
    .map(data => data.region));
  return Array.from(regions);
};

export const searchPostcodes = (
  country: 'NZ' | 'AU',
  state?: string,
  region?: string,
  postcode?: string
): PostcodeData[] => {
  return postcodeData.filter(data => {
    if (data.country !== country) return false;
    if (state && data.state !== state) return false;
    if (region && data.region !== region) return false;
    if (postcode && !data.postcode.includes(postcode)) return false;
    return true;
  });
}; 