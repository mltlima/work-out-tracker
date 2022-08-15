import { Box, Paper, Link, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";
import api from "../services/api";
import { height } from "@mui/system";
import Calendar from "../components/calendar";
import ResponsiveAppBar from "../components/header";

const daysOfWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

export default function Dashboard() {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        height: "",
        weight: "",
        age: "",
    });
    const [bmi, setBmi] = useState(0);
    const [selectedDays, setSelectedDays] = useState([]);
    const [userProgram, setUserProgram] = useState(null);

    useEffect(() => {
        async function loadPage() {
            if (!token) return;
            const {user: { email, name, weight, height, age } }= parseJwt(token);
            setUserInfo({ email, name, weight, height, age });
            setBmi( (weight / (height/100 * height/100)).toFixed(2) );
        }
        loadPage();
    }, [token]);

    useEffect(() => {
        const promise = api.getUserProgram(token);
        promise.then(response => {
            setUserProgram(response.data.response);
        }).catch(err => {
            console.log(err);
        })
    }, [token]);

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


    return(
        <>
        <ResponsiveAppBar />
        <Box sx={containerBox}>
            <Typography sx={{ marginBottom: "16px" }} variant="h6" component={"h1"}>
                Welcome back,
            </Typography>
            <Typography sx={{ marginBottom: "16px" }} variant="h4" component={"h1"}>
                {userInfo?.name}
            </Typography>
            <Box>
                <Calendar days={selectedDays}/>
            </Box>
            <Paper sx={bmiBox} elevation={3}>
                <Box>
                    <Typography sx={{ marginBottom: "16px", width: "70%"}} variant="h6" component={"h1"}>
                        BMI(Body Mass Index) of {bmi} 
                        <span> You are {bmi > 25 ? "overweight" : bmi < 18.5 ? "underweight" : "healthy"}</span>
                    </Typography>
                </Box>
                <Box sx={{ position: 'relative', display: 'inline-flex', height: "40px" }}>    
                    <CircularProgress variant="determinate" value={bmi}/>
                    <Box sx={circularBmi}>
                        <Typography variant="caption" component="div" color="text.secondary">
                            {bmi}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
            <Link href='/workout' underline="none">
                <Paper elevation={3} sx={{marginTop: "30px", width: "500px", height: "40px", display: "flex", 
                    justifyContent: "center", alignItems: "center",'&:hover': { cursor: 'pointer',
                    }}}>
                    <Typography variant="h6" gutterBottom component="div">See your program</Typography>
                </Paper>
            </Link>
        </Box>
        </>
    );
}

//decode user info from jwt token
function parseJwt (token) {
    return JSON.parse(Buffer.from(token?.split('.')[1], 'base64').toString());
}

const containerBox = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "30px",
}

const bmiBox = {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#EBF3FF",
    padding: "5px",
}

const circularBmi = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: "orange"
}