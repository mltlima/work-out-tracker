import { Box, Button, Divider, Link, TextField, Typography,Paper, BottomNavigation, BottomNavigationAction  } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


export default function Footer() {


    return(
        <Paper sx={footerStyle} elevation={3}>
            <BottomNavigation>
                <BottomNavigationAction label="Home" icon={<HomeOutlinedIcon />} />
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