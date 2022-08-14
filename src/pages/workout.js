import { Box, Paper, Divider, Link, TextField, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";
import Footer from "../components/footer";
import Calendar from "../components/calendar";
import ResponsiveAppBar from "../components/header";
import ToggleDays from "../components/toggleDays";
import MultipleSelectCheckmarks from "../components/multipleSelections";
import Form from "../components/form";
import api from "../services/api.js";

export default function Workout() {
    const { token } = useAuth(); 
    const [program, setProgram] = useState(null);
    const [userProgram, setUserProgram] = useState(null);
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const promise = api.getAllPrograms(token);
        promise.then(response => {
            setProgram(response.data);
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        })
        
        const promise2 = api.getUserProgram(token);
        promise2.then(response => {
            setUserProgram(response.data.response);
        }).catch(err => {
            console.log(err);
        })

        const promise3 = api.getAllWorkouts(token);
        promise3.then(response => {
            //console.log(response.data.response);
            let lst = [];
            response.data.response.map(workout => {
                lst.push(workout.name);
            })
            setWorkouts([...lst]);
        }).catch(err => {
            console.log(err);
        })
    }, [token]);

    const workoutDays = userProgram ? userProgram?.workoutDays : null;

    return (
        <>
        <ResponsiveAppBar />
        <Box sx={container}>
            <Box>
                <Typography sx={{ marginBottom: "16px" }} variant="h4" component={"h1"}>
                    Workout Tracker
                </Typography>
            </Box>
            <Box>
                <Calendar />
            </Box>
            <Box sx={programBox}>
                <Paper sx={card} elevation={3}>
                    {program?.length > 0 ? <Typography>{"todo"}</Typography> : <Typography>{"No programs yet :("}</Typography>}
                </Paper>
                <Paper sx={card} elevation={3}>
                    {userProgram?.length > 0 ? <Typography>TODO</Typography> : <NewProgram workouts={workouts}/>}
                </Paper>
            </Box>
            <Box sx={programBox}>
                <Paper sx={card} elevation={3}>
                    <Typography>Select a exercise</Typography>
                </Paper>
                <Paper sx={card} elevation={3}>
                    <Typography>Create a exercise</Typography>
                </Paper>
            </Box>
            <Footer />
        </Box>
        </>
    );
}

//Deprecated
function NewProgram(props) {
    const { workouts } = props;
    const [formsData, setFormsData] = useState({
        name: "",
        authorId: "",
        end: "",
    });
    const [blocks, setBlocks] = useState({});
    const [days, setDays] = useState([]);
    const [blocksWorkouts, setBlocksWorkouts] = useState([]);

    function handleInputChange(event) {
        setFormsData({ ...formsData, [event.target.name]: event.target.value });
    }

    function handleblockChange(event) {
        setBlocks({ ...blocks, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {


    }

    return(
        <>
        <Typography>Create a new program</Typography>
        <Form onSubmit={handleSubmit} >
            
            
            <Box sx={containerBox}>
                <TextField sx={{ marginBottom: "16px" }}
                    name="name"
                    label="Program Name"
                    variant="outlined"
                    onChange={handleInputChange}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    openTo="year"
                    views={['year', 'month', 'day']}
                    label="Select a end date"
                    value={formsData.end}
                    onChange={(newValue) => {
                        console.log(newValue);
                        setFormsData({ ...formsData, end: newValue });
                    }}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                />
                </LocalizationProvider>
                <Box sx={{marginTop: "16px"}}>
                    <Typography>Select days of the week to workout</Typography>
                    <ToggleDays days={days} setDays={setDays}/>
                </Box>
                <Box>
                    <Typography>Select exercises for the days of the week</Typography>
                    {days.map((day, index) => (
                        <>
                            <Typography>Day {index + 1} of the week</Typography>
                            <TextField sx={{ marginBottom: "16px" }}
                                name={day}
                                label="Day Name"
                                variant="outlined"
                                onChange={handleblockChange}
                            />
                            <MultipleSelectCheckmarks names={workouts} day={day} personName={blocksWorkouts} setPersonName={setBlocksWorkouts}/>
                        </>
                    ))}
                </Box>
            </Box>
        </Form>
        </>
    );
}

const container = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "74px",
    marginBottom: "74px",
}

const programBox = {
    display: "flex",
    flexDirection: "row",
}

const card = {
    width: "500px",
    height: "400px",
    padding: "16px",
    margin: "16px",
}

const containerBox = {
    width: "470px",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
}