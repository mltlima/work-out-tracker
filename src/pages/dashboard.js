import { Box, Button, Divider, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";


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
    //const { email, name, weight, height, age } = parseJwt(token);

    useEffect(() => {
        async function loadPage() {
            if (!token) return;
            const {user: { email, name, weight, height, age } }= parseJwt(token);
            setUserInfo({ email, name, weight, height, age });
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
        </Box>
    );
}

function parseJwt (token) {
    return JSON.parse(Buffer.from(token?.split('.')[1], 'base64').toString());
}

const containerBox = {
    marginTop: "180px",
    width: "460px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
}