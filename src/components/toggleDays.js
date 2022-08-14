import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const DAYS = [
  {
    key: "sunday",
    label: "S"
  },
  {
    key: "monday",
    label: "M"
  },
  {
    key: "tuesday",
    label: "T"
  },
  {
    key: "wednesday",
    label: "W"
  },
  {
    key: "thursday",
    label: "T"
  },
  {
    key: "friday",
    label: "F"
  },
  {
    key: "saturday",
    label: "S"
  }
];

const StyledToggleButtonGroup = withStyles(theme => ({
  grouped: {
    margin: theme.spacing(2),
    padding: theme.spacing(0, 1),
    "&:not(:first-child)": {
      border: "1px solid",
      borderRadius: "50%"
    },
    "&:first-child": {
      border: "1px solid",
      borderRadius: "50%"
    }
  }
}))(ToggleButtonGroup);

const StyledToggle = withStyles({
  root: {
    "&$selected": {
      color: "white",
      background: "#96B3FE"
    },
    "&:hover": {
      borderColor: "#96B3FE",
      background: "#96B3FE"
    },
    "&:hover$selected": {
      borderColor: "#96B3FE",
      background: "#96B3FE"
    },
    minWidth: 32,
    maxWidth: 32,
    height: 32,
    textTransform: "unset",
    fontSize: "0.75rem"
  },
  selected: {}
})(ToggleButton);

const ToggleDays = (props) => {
  const { days, setDays } = props;
  return (
    <>
      <StyledToggleButtonGroup
        size="small"
        arial-label="Days of the week"
        value={days}
        onChange={(event, value) => setDays(value)}
      >
        {DAYS.map((day, index) => (
          <StyledToggle key={day.key} value={index} aria-label={day.key}>
            {day.label}
          </StyledToggle>
        ))}
      </StyledToggleButtonGroup>
    </>
  );
};

export default ToggleDays;