import { Box, Button, Divider, Link, TextField, Typography,Paper, BottomNavigation, BottomNavigationAction  } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import { useNavigate } from "react-router-dom";


export default function Footer() {

    return(
        <Paper sx={footerStyle} elevation={3}>
            <BottomNavigation>
                <BottomNavigationAction label="Home" icon={<HomeOutlinedIcon />} href="/"/>
                <BottomNavigationAction label="Progress" icon={<InsertChartOutlinedIcon /> } href="/"/>
                <BottomNavigationAction label="Exercises" icon={<FitnessCenterOutlinedIcon />} href="/workout"/>
                <BottomNavigationAction label="Profile" icon={<PersonOutlineOutlinedIcon />} href="/dashboard"/>
            </BottomNavigation>
        </Paper>
    );
}

const footerStyle = {
    position: "fixed",
    bottom: "0",
    left: "0",
    right: "0",
}