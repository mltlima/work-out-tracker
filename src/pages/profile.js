import { Box, Button, Divider, Link, TextField, Typography, CircularProgress, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";



export default function Profile() {
    const navigate = useNavigate();

    return(
        <Typography sx={{ marginBottom: "16px" }} variant="h4" component={"h1"}>
            Profile
        </Typography>
    );
}

//decode user info from jwt token
function parseJwt (token) {
    return JSON.parse(Buffer.from(token?.split('.')[1], 'base64').toString());
}