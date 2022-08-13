import { Box, Paper, Divider, Link, TextField, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";
import { height } from "@mui/system";
import Footer from "../components/footer";


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

    useEffect(() => {
        async function loadPage() {
            if (!token) return;
            const {user: { email, name, weight, height, age } }= parseJwt(token);
            setUserInfo({ email, name, weight, height, age });
            setBmi( (weight / (height/100 * height/100)).toFixed(2) );
        }
        loadPage();
    }, [token]);


    return(
        <Box sx={containerBox}>
            <Typography sx={{ marginBottom: "16px" }} variant="h6" component={"h1"}>
                Welcome back,
            </Typography>
            <Typography sx={{ marginBottom: "16px" }} variant="h4" component={"h1"}>
                {userInfo?.name}
            </Typography>
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
            <Footer />
        </Box>
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
    padding: "5px"
    //position: "relative",
    //backgroundColor: "orange",
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