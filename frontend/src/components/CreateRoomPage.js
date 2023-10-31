import React, { Component, useState } from "react";
import { render } from "react-dom";
import {
  Collapse,
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Alert,
} from "@mui/material";
import { Link, link, useNavigate } from "react-router-dom";

const CreateRoomPage = ({
  update,
  votesToSkip,
  guestCanPause,
  roomCode,
  updateCallBack,
}) => {
  const [backData, setBackData] = useState({
    guestCanPause: guestCanPause ? guestCanPause : false,
    votesToSkip: votesToSkip ? votesToSkip : 2,
    update: update,
    roomCode: roomCode,
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
      ...backData,
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

  const handleUpdateButtonPressed = () => {
    const feedBack = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votes_to_skip: backData.votesToSkip,
        guest_can_pause: backData.guestCanPause,
        code: backData.roomCode,
      }),
    };
    fetch("/api/update-room", feedBack).then((response) => {
      if (response.ok) {
        setSuccess("Room was updated successfully");
      } else {
        setError("Error updating room!");
      }
      updateCallBack();
    });
  };

  const renderCreateButtons = () => {
    return (
      <Grid container spacing={1}>
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
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  };
  const renderUpdateButtons = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleUpdateButtonPressed}
          >
            Update Room
          </Button>
        </Grid>
      </Grid>
    );
  };

  const title = backData.update ? "Update Room" : "Create a Room";

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={error != "" || success != ""}>
          {success ? (
            <Alert
              severity="success"
              onClose={() => {
                setSuccess("");
              }}
            >
              {success}
            </Alert>
          ) : (
            <Alert
              severity="error"
              onClose={() => {
                setError("");
              }}
            >
              {error}
            </Alert>
          )}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4" color={"white"}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText component={"span"}>
            <div align="center">Guest Control</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue={false}
            value={backData.guestCanPause ? backData.guestCanPause : false}
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
            defaultValue={backData.votesToSkip}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
          ></TextField>
          <FormHelperText component={"span"}>
            <div align="center">Votes Required to skip</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      {backData.update ? renderUpdateButtons() : renderCreateButtons()}
    </Grid>
  );
};
export default CreateRoomPage;
