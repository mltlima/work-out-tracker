import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Link } from "@mui/material";

export default function SimpleAccordion(props) {
  const {program} = props;
  return (
    <>
    <Typography>Programs</Typography>
    <Box sx={containerBox}>
        {program.map((exercise, index) => (
            <AccordionDiv exercise={exercise}/>
            ))}
    </Box>
    </>
  );
}

function AccordionDiv(props) {
  const { exercise } = props;
  return (
    <Box sx={{marginTop: "16px"}}>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{exercise.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {exercise.Block.map((block, index) => (
                <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{block.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {block.Workout?.map((workout, index) => (
                        <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{workout.name}</Typography>
                        </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{workout.name}</Typography>
                                <Typography>reps {workout.reps}, sets {workout.sets}</Typography>
                                <Link href="#" onClick={() => window.open(workout.videoUrl, '_blank').focus()}>exercise video</Link>
                            </AccordionDetails>
                        </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

const containerBox = {
    width: "470px",
    height: "350px",
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    ["@media (max-width:800px)"]: { 
      width: "280px"
  }
}