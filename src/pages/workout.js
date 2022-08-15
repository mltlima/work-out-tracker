import { Box, Paper, TextField, Typography, Accordion, AccordionSummary, AccordionDetails, Link } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getDay } from 'date-fns';

import useAuth from "../hooks/useAuth";
import Calendar from "../components/calendar";
import ResponsiveAppBar from "../components/header";
import ToggleDays from "../components/toggleDays";
import MultipleSelectCheckmarks from "../components/multipleSelections";
import SimpleAccordion from "../components/accordion";
import Form from "../components/form";
import api from "../services/api.js";

const daysOfWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

export default function Workout() {
    const { token } = useAuth(); 
    const [program, setProgram] = useState(null);
    const [userProgram, setUserProgram] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [selectedDays, setSelectedDays] = useState([]);

    useEffect(() => {
        if(selectedProgram > 0 && token.length > 0) {
            api.addUserProgram(token, selectedProgram)
        }

        const promise = api.getAllPrograms(token);
        promise.then(response => {
            setProgram(response.data);
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
            setWorkouts(response.data.response);
        }).catch(err => {
            console.log(err);
        })
    }, [token, selectedProgram]);

    useEffect(() => {
        //get list of workout days
        if (userProgram) {
            const today = new Date();
            const end = new Date(userProgram.end);

            const programWeeks = [];

            userProgram.Block.map(program => {
                programWeeks.push(daysOfWeek.indexOf(program.day));
            })

            const programDays = [];
            while (today <= end) {
                if (programWeeks.includes(today.getDay())) {
                    programDays.push(today.toLocaleDateString("en-US"));
                }
                today.setDate(today.getDate() + 1);
            }
            setSelectedDays(programDays);
        }
    } , [userProgram]);
 
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
                <Calendar days={selectedDays}/>
            </Box>
            <Box sx={programBox}>
                <Paper sx={card} elevation={3}>
                    {program?.length > 0 ? <SimpleAccordion program={program}/> : <Typography>{"No programs yet :("}</Typography>}
                </Paper>
                <Paper sx={card} elevation={3}>
                    {userProgram?.id > 0 ? <UserProgram userProgram={userProgram}/> : <SelectProgram program={program} setSelectedProgram={setSelectedProgram}/>}
                </Paper>
            </Box>
            <Box sx={programBox}>
                <Paper sx={card} elevation={3}>
                    <SelectExercise workouts={workouts}/>
                </Paper>
            </Box>
        </Box>
        </>
    );
}

function SelectExercise(props) {
    const { workouts } = props;

    return(
        <>
        <Typography sx={{marginBottom: "16px"}}>All exercises</Typography>
        <Box sx={containerBox}>
            {workouts?.map((workout, index) => (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                    <Typography>{workout.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>           
                        <Typography>{workout.name}</Typography>
                        <Typography>reps {workout.reps}, sets {workout.sets}</Typography>
                        <Link href="#" onClick={() => window.open(workout.videoUrl, '_blank').focus()}>exercise video</Link>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
        </>
    );
}

function SelectProgram(props) {
    const { program, setSelectedProgram } = props;

    return (
        <>
            <Typography>Select a program</Typography>
            {program?.map(program => (
                <Box onClick={() => setSelectedProgram(program.id)} sx={selectProgramBox}>
                    <Typography>{program.name}</Typography>
                </Box>
            ))}
        </>
    );
}

function UserProgram(props) {
    const { userProgram } = props;

    return (
        <>
        <Typography sx={{marginBottom: "16px"}}>User current program</Typography>
        <Box sx={containerBox}>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
            <Typography>{userProgram.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            {userProgram.Block.map((block, index) => (
                <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{block.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {block.Workout?.map((workout, index) => (
                        <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{workout.name}</Typography>
                        </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{workout.name}</Typography>
                                <Typography>reps {workout.reps}, sets {workout.sets}</Typography>
                                <Link href="#" onClick={() => window.open(workout.videoUrl, '_blank').focus()}>exercise video</Link>
                            </AccordionDetails>
                        </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
          ))}
            </AccordionDetails>
      </Accordion>
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
    ["@media (max-width:800px)"]: { 
        flexDirection: "column",
        width: "300px"
    }
}

const card = {
    width: "500px",
    height: "400px",
    padding: "16px",
    margin: "16px",
    ["@media (max-width:800px)"]: { 
        width: "300px"
    }
}

const containerBox = {
    width: "470px",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    ["@media (max-width:800px)"]: { 
        width: "280px"
    }
}

const selectProgramBox = {
    marginBottom: "16px",
    backgroundColor: '#96B3FE',
    display: "flex",
    justifyContent: "center",
    borderRadius: "10px",
    padding: "16px",
    '&:hover': {
        cursor: 'pointer',
    }
}