import { Box } from "@mui/system";

export default function Form(Props) {
    const {children, onSubmit} = Props;

    return(
        <Box sx={styles}>
            <form components="form" onSubmit={onSubmit}>
                {children}
            </form>
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