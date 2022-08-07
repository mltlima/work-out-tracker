import { Box, Button, Divider, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";

import Form from "../components/form.js";
import PasswordInput from "../components/password.js";
import useAlert from "../hooks/useAlert.js";
import useUserInfo from "../hooks/useUserInfo.js";
import api from "../services/api.js";

export default function Signup() {
    const navigate = useNavigate();
    const { setAlert } = useAlert();
    const { setUserInfo } = useUserInfo();
    const [formsData, setFormsData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    function handleInputChange(event) {
        setFormsData({ ...formsData, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setAlert(null);
        console.log("HERE")
        if(!formsData?.email || !formsData?.password || !formsData?.confirmPassword) {
            setAlert({ type: "error", text: "All fields are required" });
            return;
        }

        if(formsData.password !== formsData.confirmPassword) {
            setAlert({ type: "error", text: "Passwords do not match" });
            return;
        }

        if(formsData.password.length < 8) {
            setAlert({ type: "error", text: "Password must be at least 8 characters long" });
            return;
        }

        try {
            //await api.signUp( formsData.email, formsData.password );
            //setAlert({ type: "success", text: "Account created successfully" });
            setUserInfo({ email: formsData.email, password: formsData.password, confirmPassword: formsData.confirmPassword });
            navigate("/completeProfile");
        } catch (error) {
            if(error.response) {
                setAlert({ type: "error", text: error.response.data.message });
                return;
            }
            setAlert({ type: "error", text: "Something went wrong, try again in a few seconds" });
        }

    }

    return (
        <Form onSubmit={handleSubmit}>
            <Box sx={containerBox}>
                <Typography sx={{ marginBottom: "16px" }} variant="h6" component={"h1"}>
                    Hey there, 
                </Typography>
                <Typography sx={{ marginBottom: "16px" }} variant="h4" component={"h1"}>
                    Create a account.
                </Typography>
                <TextField sx={{ marginBottom: "16px" }}
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    onChange={handleInputChange}
                />
                <PasswordInput
                    name="password"
                    label="Password"
                    sx={{ marginBottom: "16px" }}
                    onChange={handleInputChange}
                    value={formsData.password}
                />
                <PasswordInput
                    name="confirmPassword"
                    label="Confirm Password"
                    sx={{ marginBottom: "16px" }}
                    onChange={handleInputChange}
                    value={formsData.confirmPassword}
                />
                <Box sx={actionsContainer}>
                    <Button sx={signupButton} variant="contained" type="submit">
                        Sign Up
                    </Button>
                    <Link component={ReactLink} to="/signin">
                        <Typography>Already has a account?</Typography>
                    </Link>
                </Box>
            </Box>
        </Form>
    );
}

const containerBox = {
    marginTop: "180px",
    width: "460px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
}

const actionsContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //TODO mobile
    //["@media (max-width:800px)"]: { width: "10%" }
}

const signupButton = {
    marginBottom: "16px", 
    width: "100%", 
    backgroundColor: "#96B3FE"
}

export const cssConfig = {
    containerBox,
    actionsContainer,
    signupButton
}

/*
const ContainerBox = styled(Box) `
    marginTop: 180px;
    width: 460px;
    display: flex;
    flexDirection: column;
    textAlign: center
    color: black;
`

const TypographyTitle = styled(Typography) `
    marginBottom: 30px
`

const EmailInput = styled(TextField) `
    marginBottom: 16px
`
*/