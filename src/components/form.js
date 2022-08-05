import { Box } from "@mui/system";

export default function Form(props) {
    const {children, onSubmit} = props;
    return(
        <Box sx={styles} components="form" onSubmit={onSubmit}>
            {children}
        </Box>
    );
}

const styles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "55px",
};