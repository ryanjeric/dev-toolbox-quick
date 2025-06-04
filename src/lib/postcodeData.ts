
export interface PostcodeData {
  country: 'NZ' | 'AU';
  state: string;
  region: string;
  postcode: string;
  locality: string;
}

export const postcodeData: PostcodeData[] = [
  // New Zealand postcodes
  // Auckland Region
  { country: 'NZ', state: 'Auckland', region: 'Auckland Central', postcode: '1010', locality: 'Auckland Central' },
  { country: 'NZ', state: 'Auckland', region: 'Auckland Central', postcode: '1011', locality: 'Britomart' },
  { country: 'NZ', state: 'Auckland', region: 'Auckland Central', postcode: '1021', locality: 'Ponsonby' },
  { country: 'NZ', state: 'Auckland', region: 'Auckland Central', postcode: '1023', locality: 'Grey Lynn' },
  { country: 'NZ', state: 'Auckland', region: 'North Shore', postcode: '0622', locality: 'Takapuna' },
  { country: 'NZ', state: 'Auckland', region: 'North Shore', postcode: '0624', locality: 'Devonport' },
  { country: 'NZ', state: 'Auckland', region: 'Manukau', postcode: '2016', locality: 'Manukau' },
  { country: 'NZ', state: 'Auckland', region: 'Waitakere', postcode: '0610', locality: 'Henderson' },

  // Wellington Region
  { country: 'NZ', state: 'Wellington', region: 'Wellington Central', postcode: '6011', locality: 'Wellington Central' },
  { country: 'NZ', state: 'Wellington', region: 'Wellington Central', postcode: '6012', locality: 'Thorndon' },
  { country: 'NZ', state: 'Wellington', region: 'Wellington Central', postcode: '6021', locality: 'Newtown' },
  { country: 'NZ', state: 'Wellington', region: 'Hutt Valley', postcode: '5010', locality: 'Lower Hutt' },
  { country: 'NZ', state: 'Wellington', region: 'Hutt Valley', postcode: '5018', locality: 'Upper Hutt' },
  { country: 'NZ', state: 'Wellington', region: 'Porirua', postcode: '5024', locality: 'Porirua' },

  // Canterbury Region
  { country: 'NZ', state: 'Canterbury', region: 'Christchurch', postcode: '8011', locality: 'Christchurch Central' },
  { country: 'NZ', state: 'Canterbury', region: 'Christchurch', postcode: '8013', locality: 'Riccarton' },
  { country: 'NZ', state: 'Canterbury', region: 'Christchurch', postcode: '8022', locality: 'Papanui' },
  { country: 'NZ', state: 'Canterbury', region: 'Christchurch', postcode: '8025', locality: 'Ilam' },

  // Otago Region
  { country: 'NZ', state: 'Otago', region: 'Dunedin', postcode: '9016', locality: 'Dunedin' },
  { country: 'NZ', state: 'Otago', region: 'Queenstown', postcode: '9300', locality: 'Queenstown' },

  // Waikato Region
  { country: 'NZ', state: 'Waikato', region: 'Hamilton', postcode: '3204', locality: 'Hamilton Central' },
  { country: 'NZ', state: 'Waikato', region: 'Hamilton', postcode: '3206', locality: 'Hamilton East' },

  // Bay of Plenty
  { country: 'NZ', state: 'Bay of Plenty', region: 'Tauranga', postcode: '3110', locality: 'Tauranga' },
  { country: 'NZ', state: 'Bay of Plenty', region: 'Rotorua', postcode: '3010', locality: 'Rotorua' },

  // Australia postcodes
  // New South Wales
  { country: 'AU', state: 'New South Wales', region: 'Sydney', postcode: '2000', locality: 'Sydney' },
  { country: 'AU', state: 'New South Wales', region: 'Sydney', postcode: '2001', locality: 'Sydney CBD' },
  { country: 'AU', state: 'New South Wales', region: 'Sydney', postcode: '2010', locality: 'Surry Hills' },
  { country: 'AU', state: 'New South Wales', region: 'Sydney', postcode: '2021', locality: 'Cremorne' },
  { country: 'AU', state: 'New South Wales', region: 'Sydney', postcode: '2060', locality: 'North Sydney' },
  { country: 'AU', state: 'New South Wales', region: 'Sydney', postcode: '2095', locality: 'Manly' },
  { country: 'AU', state: 'New South Wales', region: 'Sydney', postcode: '2150', locality: 'Parramatta' },
  { country: 'AU', state: 'New South Wales', region: 'Newcastle', postcode: '2300', locality: 'Newcastle' },
  { country: 'AU', state: 'New South Wales', region: 'Wollongong', postcode: '2500', locality: 'Wollongong' },

  // Victoria
  { country: 'AU', state: 'Victoria', region: 'Melbourne', postcode: '3000', locality: 'Melbourne' },
  { country: 'AU', state: 'Victoria', region: 'Melbourne', postcode: '3001', locality: 'Melbourne CBD' },
  { country: 'AU', state: 'Victoria', region: 'Melbourne', postcode: '3006', locality: 'Southbank' },
  { country: 'AU', state: 'Victoria', region: 'Melbourne', postcode: '3141', locality: 'South Yarra' },
  { country: 'AU', state: 'Victoria', region: 'Melbourne', postcode: '3182', locality: 'St Kilda' },
  { country: 'AU', state: 'Victoria', region: 'Melbourne', postcode: '3121', locality: 'Richmond' },
  { country: 'AU', state: 'Victoria', region: 'Geelong', postcode: '3220', locality: 'Geelong' },
  { country: 'AU', state: 'Victoria', region: 'Ballarat', postcode: '3350', locality: 'Ballarat' },

  // Queensland
  { country: 'AU', state: 'Queensland', region: 'Brisbane', postcode: '4000', locality: 'Brisbane' },
  { country: 'AU', state: 'Queensland', region: 'Brisbane', postcode: '4001', locality: 'Brisbane CBD' },
  { country: 'AU', state: 'Queensland', region: 'Brisbane', postcode: '4006', locality: 'Fortitude Valley' },
  { country: 'AU', state: 'Queensland', region: 'Brisbane', postcode: '4101', locality: 'South Brisbane' },
  { country: 'AU', state: 'Queensland', region: 'Gold Coast', postcode: '4217', locality: 'Surfers Paradise' },
  { country: 'AU', state: 'Queensland', region: 'Gold Coast', postcode: '4220', locality: 'Southport' },
  { country: 'AU', state: 'Queensland', region: 'Sunshine Coast', postcode: '4558', locality: 'Caloundra' },
  { country: 'AU', state: 'Queensland', region: 'Cairns', postcode: '4870', locality: 'Cairns' },

  // Western Australia
  { country: 'AU', state: 'Western Australia', region: 'Perth', postcode: '6000', locality: 'Perth' },
  { country: 'AU', state: 'Western Australia', region: 'Perth', postcode: '6003', locality: 'East Perth' },
  { country: 'AU', state: 'Western Australia', region: 'Perth', postcode: '6008', locality: 'Subiaco' },
  { country: 'AU', state: 'Western Australia', region: 'Perth', postcode: '6160', locality: 'Fremantle' },
  { country: 'AU', state: 'Western Australia', region: 'Perth', postcode: '6050', locality: 'Mount Lawley' },

  // South Australia
  { country: 'AU', state: 'South Australia', region: 'Adelaide', postcode: '5000', locality: 'Adelaide' },
  { country: 'AU', state: 'South Australia', region: 'Adelaide', postcode: '5006', locality: 'North Adelaide' },
  { country: 'AU', state: 'South Australia', region: 'Adelaide', postcode: '5067', locality: 'Norwood' },

  // Tasmania
  { country: 'AU', state: 'Tasmania', region: 'Hobart', postcode: '7000', locality: 'Hobart' },
  { country: 'AU', state: 'Tasmania', region: 'Hobart', postcode: '7004', locality: 'Battery Point' },
  { country: 'AU', state: 'Tasmania', region: 'Launceston', postcode: '7250', locality: 'Launceston' },

  // Australian Capital Territory
  { country: 'AU', state: 'Australian Capital Territory', region: 'Canberra', postcode: '2600', locality: 'Canberra' },
  { country: 'AU', state: 'Australian Capital Territory', region: 'Canberra', postcode: '2601', locality: 'Acton' },

  // Northern Territory
  { country: 'AU', state: 'Northern Territory', region: 'Darwin', postcode: '0800', locality: 'Darwin' },
  { country: 'AU', state: 'Northern Territory', region: 'Alice Springs', postcode: '0870', locality: 'Alice Springs' },
];

export const getStatesByCountry = (country: 'NZ' | 'AU'): string[] => {
  const states = new Set(postcodeData
    .filter(data => data.country === country)
    .map(data => data.state));
  return Array.from(states).sort();
};

export const getRegionsByState = (country: 'NZ' | 'AU', state: string): string[] => {
  const regions = new Set(postcodeData
    .filter(data => data.country === country && data.state === state)
    .map(data => data.region));
  return Array.from(regions).sort();
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
