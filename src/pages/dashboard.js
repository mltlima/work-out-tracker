import { Box, Button, Divider, Link, TextField, Typography, CircularProgress } from "@mui/material";
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
            <Box sx={bmiBox}>
                <Typography sx={{ marginBottom: "16px", width: "70%"}} variant="h6" component={"h1"}>
                    BMI(Body Mass Index) of {bmi} 
                    <span> You are {bmi > 25 ? "overweight" : bmi < 18.5 ? "underweight" : "healthy"}</span>
                </Typography>
                <CircularProgress sx={{position: "absolute", right: 10, top: 20}} variant="determinate" value={bmi}/>
            </Box>
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
    flexDirection: "row",
    position: "relative",
    //backgroundColor: "orange",
}