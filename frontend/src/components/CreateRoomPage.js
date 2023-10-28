import React, { Component, useState } from "react";
import { render } from "react-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { link, useNavigate } from "react-router-dom";

const CreateRoomPage = () => {
  let defaultVotes = 2;
  const [backData, setBackData] = useState({
    guestCanPause: true,
    votesToSkip: defaultVotes,
  });

  // Using arrow function to change votes
  const handleVotesChange = (e) => {
    setBackData((data) => ({
      ...data,
      votesToSkip: e.target.value,
    }));
  };
  // Using bind to change pausing state
  const handleGuestCanPauseChange = (e) => {
    setBackData((data) => ({
      ...data,
      guestCanPause: e.target.value == "true" ? true : false,
    }));
  };
  const navigate = useNavigate();
  const handleRoomButtonPressed = () => {
    const feedBack = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votes_to_skip: backData.votesToSkip,
        guest_can_pause: backData.guestCanPause,
      }),
    };
    fetch("api/create-room", feedBack)
      .then((response) => response.json())
      .then((data) => navigate("/room/" + data.code));
  };
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText component={"span"}>
            <div align="center">Guest Control</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary"></Radio>}
              label="Play/Pause"
              labelPlacement="bottom"
            ></FormControlLabel>
            <FormControlLabel
              value="false"
              control={<Radio color="secondary"></Radio>}
              label="None"
              labelPlacement="bottom"
            ></FormControlLabel>
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            onChange={handleVotesChange}
            required={true}
            type="number"
            defaultValue={defaultVotes}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
          ></TextField>
          <FormHelperText component={"span"}>
            <div align="center">Votes Required to skip</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Create A Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained">
          Back
        </Button>
      </Grid>
    </Grid>
  );
};
export default CreateRoomPage;
