import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

export default function Calendar(props) {
    const { selectedDays } = props;
    const [value, setValue] = React.useState(new Date());
    const days = ['8/8/2022', '8/9/2022', '8/10/2022'];

    const renderDaysWorkout = (date, selectedDates, pickersDayProps) => {
        console.log(date.toLocaleDateString("en-US"));
        if(days.includes(date.toLocaleDateString("en-US"))) {
            return (
                <PickersDay day={date} selected={true}/>
            );
        }
        return (
            <PickersDay {...pickersDayProps}/>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
            renderDay={renderDaysWorkout}
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={value}
            onChange={(newValue) => {
            setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
    );
}

