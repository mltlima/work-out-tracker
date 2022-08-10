import { Box, Button, Divider, Link, TextField, Typography,Paper, BottomNavigation, BottomNavigationAction  } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import { useNavigate } from "react-router-dom";


export default function Footer() {
    const navigate = useNavigate();

    return(
        <Paper sx={footerStyle} elevation={3}>
            <BottomNavigation>
                <BottomNavigationAction label="Home" icon={<HomeOutlinedIcon />} onClick={() => navigate("/")}/>
                <BottomNavigationAction label="Progress" icon={<InsertChartOutlinedIcon />} />
                <BottomNavigationAction label="Exercises" icon={<FitnessCenterOutlinedIcon />} />
                <BottomNavigationAction label="Profile" icon={<PersonOutlineOutlinedIcon />} />
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