import { Box, Paper, Divider, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";
import Footer from "../components/footer";
import Calendar from "../components/calendar";
import api from "../services/api.js";

export default function Workout() {
    const { token } = useAuth(); 
    const [program, setProgram] = useState(null);
    const [userProgram, setUserProgram] = useState(null);

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
            setUserProgram(response.data);
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, [token]);

    const workoutDays = userProgram ? userProgram?.workoutDays : null;

    return (
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
                    {program ? <Typography>{"todo"}</Typography> : <Typography>{"No programs yet :("}</Typography>}
                </Paper>
                <Paper sx={card} elevation={3}>
                    {userProgram ? <Typography>TODO</Typography> : <Typography>Create a new program</Typography>}
                </Paper>
            </Box>
            <Box>
                <Paper sx={card} elevation={3}>
                    <Typography>Select a exercise</Typography>
                </Paper>
            </Box>
            <Footer />
        </Box>

    );
}

const container = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}

const programBox = {
    display: "flex",
    flexDirection: "row",
}

const card = {
    width: "400px",
    height: "200px",
    padding: "16px",
    margin: "16px",
}