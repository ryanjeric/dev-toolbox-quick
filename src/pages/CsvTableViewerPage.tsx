import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming Textarea component exists
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Assuming Table components exist
import { Input } from "@/components/ui/input"; // Import Input for file type
import { Button } from "@/components/ui/button"; // Import Button component
import { XCircle } from 'lucide-react'; // Import an icon for the clear button

const CsvTableViewerPage = () => {
  const [csvInput, setCsvInput] = useState('');
  const [tableData, setTableData] = useState<{ headers: string[]; rows: string[][] | null } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseCsv = (csvString: string) => {
    setError(null);
    setTableData(null);

    if (!csvString.trim()) {
      return;
    }

    try {
      const lines = csvString.trim().split('\n');
      if (lines.length === 0) {
        return;
      }

      // Simple parsing: handle potential quoted fields by basic splitting and trimming
      const parseLine = (line: string) => line.split(',').map(cell => cell.trim());

      const headers = parseLine(lines[0]);
      const rows = lines.slice(1).map(parseLine);

      // Basic validation: check if all rows have the same number of columns as headers
      const isValid = rows.every(row => row.length === headers.length);

      if (!isValid) {
        setError("CSV format error: Rows have inconsistent column counts.");
        setTableData(null);
        return;
      }

      setTableData({ headers, rows });

    } catch (e: any) {
      setError("Error parsing CSV: " + e.message);
      setTableData(null);
    }
  };

  // Parse CSV whenever the input changes (either from textarea or file upload)
  useMemo(() => {
    parseCsv(csvInput);
  }, [csvInput]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv') {
        setError("Invalid file type. Please upload a CSV file.");
        setCsvInput('');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCsvInput(content);
      };
      reader.onerror = () => {
        setError("Error reading file.");
        setCsvInput('');
      };
      reader.readAsText(file);
       // Clear the file input value so the same file can be uploaded again after clearing
       if (event.target) {
        event.target.value = '';
      }
    }
  };

   const handleClear = () => {
    setCsvInput('');
    setTableData(null);
    setError(null);
     // You might also want to clear the file input visually if a file was selected
     const fileInput = document.getElementById('csvFile') as HTMLInputElement;
     if (fileInput) {
       fileInput.value = '';
     }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">CSV to Table Viewer</h1>
      
      <div className="grid grid-cols-1 gap-8">
        {/* CSV Input Card */}
        <Card>
          <CardHeader><CardTitle>Enter CSV Data or Upload File</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="csvInput">Paste your CSV data here:</Label>
              <Textarea
                id="csvInput"
                placeholder="Paste CSV data..."
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                rows={10}
                className="font-mono text-sm"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="csvFile">Or upload a CSV file:</Label>
              <Input 
                id="csvFile" 
                type="file" 
                accept=".csv"
                onChange={handleFileUpload}
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleClear} variant="outline" size="sm">
                 <XCircle className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table Preview Card */}
        <Card>
          <CardHeader><CardTitle>Table Preview</CardTitle></CardHeader>
          <CardContent>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {tableData && tableData.headers.length > 0 && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {tableData.headers.map((header, index) => (
                        <TableHead key={index}>{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.rows && tableData.rows.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                     {!tableData.rows || tableData.rows.length === 0 && (
                       <TableRow>
                         <TableCell colSpan={tableData.headers.length} className="text-center text-slate-500">
                           No data rows found.
                         </TableCell>
                       </TableRow>
                     )}
                  </TableBody>
                </Table>
              </div>
            )}

            {!error && (!tableData || tableData.headers.length === 0) && csvInput.trim() && (
               <div className="text-center text-slate-500">
                 Enter CSV data above to see the table preview.
               </div>
            )}
             {!error && !csvInput.trim() && (
               <div className="text-center text-slate-500">
                 Paste CSV data or upload a file in the boxes above to see it as a table.
               </div>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CsvTableViewerPage; 