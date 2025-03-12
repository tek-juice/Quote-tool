import { Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Typography } from '@mui/material';

interface DatePickerProps {
  date: Dayjs;
  setDate: Dispatch<SetStateAction<Dayjs>>;
}

export default function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography className='text-success'>Date of Birth</Typography>
      <DateCalendar value={date} onChange={(newValue) => setDate(newValue!)} />
    </LocalizationProvider>
  );
}