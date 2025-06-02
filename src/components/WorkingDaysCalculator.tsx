import React, { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { addDays, isWeekend, isSameDay, parseISO, format } from 'date-fns';
import { CalendarIcon, PlusIcon, Trash2Icon } from 'lucide-react';

const WorkingDaysCalculator = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [holidays, setHolidays] = useState<string[]>([]);
  const [newHoliday, setNewHoliday] = useState('');
  const [workingDays, setWorkingDays] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddHoliday = () => {
    if (newHoliday && !holidays.includes(newHoliday)) {
      setHolidays([...holidays, newHoliday].sort());
      setNewHoliday('');
    }
  };

  const handleRemoveHoliday = (holidayToRemove: string) => {
    setHolidays(holidays.filter(holiday => holiday !== holidayToRemove));
  };

  const calculateWorkingDays = () => {
    setError(null);
    setWorkingDays(null);

    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }

    try {
      const start = parseISO(startDate);
      const end = parseISO(endDate);

      if (start > end) {
        setError('Start date cannot be after end date.');
        return;
      }

      let count = 0;
      let currentDate = start;

      // Iterate through each day from start to end date
      while (currentDate <= end) {
        const isWeekendDay = isWeekend(currentDate);
        const isHoliday = holidays.some(holiday =>
          isSameDay(currentDate, parseISO(holiday))
        );

        // If it's not a weekend and not a holiday, count it as a working day
        if (!isWeekendDay && !isHoliday) {
          count++;
        }

        // Move to the next day
        currentDate = addDays(currentDate, 1);
      }

      setWorkingDays(count);

    } catch (e) {
      setError('Invalid date format.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Working Days Calculator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="startDate">Start Date:</Label>
          <Input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="endDate">End Date:</Label>
          <Input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
      </div>

      <div className="mb-4">
        <Label>Holidays (YYYY-MM-DD):</Label>
        <div className="flex gap-2 mb-2">
          <Input 
            type="date" 
            value={newHoliday} 
            onChange={(e) => setNewHoliday(e.target.value)}
            placeholder="Add a holiday"
          />
          <Button onClick={handleAddHoliday}><PlusIcon className="mr-2 h-4 w-4"/>Add Holiday</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {holidays.map(holiday => (
            <span key={holiday} className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-md px-2 py-1 text-sm">
              {holiday}
              <button onClick={() => handleRemoveHoliday(holiday)} className="ml-1 text-red-500 hover:text-red-700"><Trash2Icon className="h-3 w-3"/></button>
            </span>
          ))}
        </div>
      </div>

      <Button onClick={calculateWorkingDays}>Calculate Working Days</Button>

      {error && (
        <p className="text-red-500 mt-4">Error: {error}</p>
      )}

      {workingDays !== null && (
        <p className="text-lg font-semibold mt-4">Working days: {workingDays}</p>
      )}
    </div>
  );
};

export default WorkingDaysCalculator; 