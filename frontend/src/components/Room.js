import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Room = (clearRoomCodeCallback) => {
  console.log(clearRoomCodeCallback);
  const navigate = useNavigate();
  const { roomCode } = useParams();
  const [roomData, setRoomData] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });

  useEffect(() => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          clearRoomCodeCallback; // clears roomCode state in HomePage
          window.location.href = "/";
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setRoomData({
            ...roomData,
            votesToSkip: data.votes_to_skip,
            guestCanPause: data.guest_can_pause,
            isHost: data.is_host,
          });
        }
      });
  }, [roomCode]);

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`/api/leave-room`, requestOptions).then((_response) => {
      // clears roomCode state in HomePage
      clearRoomCodeCallback; // clears roomCode state in HomePage
      navigate("/");
    });
  };

  return (
    <>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component={"h4"}>
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6">Votes: {roomData.votesToSkip}</Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6">
          Guest: {roomData.guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6">Host: {roomData.isHost.toString()}</Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          to="/"
          component={Link}
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </>
  );
};

export default Room;
