import { Box, Button, Divider, Link, TextField, Typography } from "@mui/material";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Form from "../components/form.js";
import PasswordInput from "../components/password.js";
import useAlert from "../hooks/useAlert.js";
import api from "../services/api.js";
import useAuth from "../hooks/useAuth.js";
import { cssConfig } from "./signup.js";

export default function Signin() {
    const { signIn, token } = useAuth();
    const { setAlert } = useAlert();
    const navigate = useNavigate();
    const [formsData, setFormsData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
		if (token) {
			navigate("/dashboard");
		}
	}, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setAlert(null);

        if(!formsData?.email || !formsData?.password) {
            setAlert({ type: "error", text: "All fields are required" });
            return;
        }

        try {
            const { email, password } = formsData;
            const {data: { token }} = await api.signIn( email, password )
            console.log(token);
            signIn(token);
            navigate("/dashboard");
        } catch (error) {
            if(error.response) {
                setAlert({ type: "error", text: error.response.data.message });
                return;
            }
            console.log(error)
            setAlert({ type: "error", text: "Something went wrong, try again in a few seconds" });
        }

    }

    function handleInputChange(event) {
        setFormsData({ ...formsData, [event.target.name]: event.target.value });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Box sx={cssConfig.containerBox}>
                <Typography sx={{ marginBottom: "16px" }} variant="h6" component={"h1"}>
                    Hey there,
                </Typography>
                <Typography sx={{ marginBottom: "16px" }} variant="h4" component={"h1"}>
                    Sign in.
                </Typography>
                <TextField
                    sx={{ marginBottom: "16px" }}
                    label="Email"
                    name="email"
                    value={formsData.email}
                    variant="outlined"
                    onChange={handleInputChange}
                />
                <PasswordInput
                    sx={{ marginBottom: "16px" }}
                    label="Password"
                    name="password"
                    value={formsData.password}
                    onChange={handleInputChange}
                />
                <Box sx={cssConfig.actionsContainer}>
                    <Button sx={cssConfig.signupButton} variant="contained" type="submit" size="large">
                        Sign In
                    </Button>
                    <Link component={ReactLink} to="/signup">
                        <Typography>Don't have an account?</Typography>
                    </Link>
                </Box>
            </Box>
        </Form>
    );
}