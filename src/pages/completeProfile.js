import { Box, Button, Divider, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";

import Form from "../components/form.js";
import PasswordInput from "../components/password.js";
import useAlert from "../hooks/useAlert.js";
import useUserInfo from "../hooks/useUserInfo.js";
import { cssConfig } from "./signup.js";
import api from "../services/api.js";

export default function CompleteProfile() {
    const navigate = useNavigate();
    const { setAlert } = useAlert();
    const { userInfo, setUserInfo } = useUserInfo();
    const { email, password, confirmPassword } = userInfo;
    const [formsData, setFormsData] = useState({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        name: "",
        height: "",
        weight: "",
        age: "",
    });

    async function handleSubmit(event) {
        event.preventDefault();
        setAlert(null);
        const { email, name, height, weight, age, password, confirmPassword } = formsData;

        if(!formsData?.name || !formsData?.height || !formsData?.weight || !formsData?.age) {
            setAlert({ type: "error", text: "All fields are required" });
            return;
        }

        try {
            await api.signUp( {email, password, confirmPassword, name, height, weight, age} );
            setAlert({ type: "success", text: "Account created successfully" });
            navigate("/signin");
        } catch (error) {
            if(error.response) {
                setUserInfo(formsData);
                setAlert({ type: "error", text: error.response.data.message });
                navigate("/signup");
                //return;
            }
            setAlert({ type: "error", text: "Something went wrong, try again in a few seconds" });
        }

    }

    function handleInputChange(event) {
        setFormsData({ ...formsData, [event.target.name]: event.target.value });
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Box sx={cssConfig.containerBox}>
                <Typography sx={{ marginBottom: "16px" }} variant="h4" component={"h1"}>
                    Let's complete your profile
                </Typography>
                <Typography sx={{ marginBottom: "16px" }} variant="h6" component={"h1"}>
                    it will help us to know you better 
                </Typography>
                <TextField sx={{ marginBottom: "16px" }}
                    name="name"
                    label="Name"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formsData.name}
                />
                <TextField
                    name="height"
                    label="Height"
                    sx={{ marginBottom: "16px" }}
                    onChange={handleInputChange}
                    value={formsData.height}
                />
                <TextField
                    name="weight"
                    label="Weight"
                    sx={{ marginBottom: "16px" }}
                    onChange={handleInputChange}
                    value={formsData.weight}
                />
                <TextField
                    name="age"
                    label="Age"
                    sx={{ marginBottom: "16px" }}
                    onChange={handleInputChange}
                    value={formsData.age}
                />
                <Box sx={cssConfig.actionsContainer}>
                    <Button sx={cssConfig.signupButton} variant="contained" type="submit" size="large">
                        Complete
                    </Button>
                </Box>
            </Box>
        </Form>
    );

}