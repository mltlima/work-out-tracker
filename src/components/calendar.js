import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

export default function Calendar(props) {
    const { days } = props;
    const [value, setValue] = React.useState(new Date());

    const renderDaysWorkout = (date, selectedDates, pickersDayProps) => {
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
            orientation="landscape"
            displayStaticWrapperAs="mobile"
            openTo="day"
            value={value}
            onChange={(newValue) => {
            setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            sx={mobile}
        />
        </LocalizationProvider>
    );
}

const mobile = {
    ["@media (max-width:800px)"]: { 
        display: "none"
    }
}