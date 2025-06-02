import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { postcodeData, getStatesByCountry, getRegionsByState, searchPostcodes } from '@/lib/postcodeData';

export default function PostcodeLookupPage() {
  const [country, setCountry] = useState<'NZ' | 'AU'>('NZ');
  const [state, setState] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [postcode, setPostcode] = useState<string>('');

  const states = getStatesByCountry(country);
  const regions = state ? getRegionsByState(country, state) : [];
  const results = searchPostcodes(country, state, region, postcode);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Postcode Lookup
        </h1>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-8">
          Look up postcodes for New Zealand and Australia by state, region, or postcode.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Search Postcodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Select value={country} onValueChange={(value: 'NZ' | 'AU') => {
                setCountry(value);
                setState('');
                setRegion('');
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NZ">New Zealand</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                </SelectContent>
              </Select>

              <Select value={state} onValueChange={(value) => {
                setState(value);
                setRegion('');
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Enter postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Postcode</TableHead>
                  <TableHead>Locality</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.country}</TableCell>
                    <TableCell>{result.state}</TableCell>
                    <TableCell>{result.region}</TableCell>
                    <TableCell>{result.postcode}</TableCell>
                    <TableCell>{result.locality}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 