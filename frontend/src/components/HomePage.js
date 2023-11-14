import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";
import CreateRoomPage from "./CreateRoomPage";
import JoinRoomPage from "./JoinRoomPage";
import Room from "./Room";
import Info from "./info";
import { Box, Grid, Button, ButtonGroup, Typography } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

const HomePage = () => {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    async function autoEnter() {
      fetch("/api/user-in-room")
        .then((response) => response.json())
        .then((data) => {
          setRoomCode(data.code);
        });
    }
    autoEnter();
  }, [roomCode]);

  function renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item display={"flex"}>
          <Box
            component="img"
            height={"600px"}
            width={"600px"}
            ml={"700px"}
            alt="The house from the offer."
            src="https://o.remove.bg/downloads/b908e2d4-9bd5-472a-8185-3a94fddd3d4b/pngtree-people-sing-png-image_3248914-removebg-preview.png"
          />
          <Box
            component="img"
            height={"600px"}
            width={"600px"}
            mr={"700px"}
            alt="The house from the offer."
            src="https://o.remove.bg/downloads/50979c90-e4ff-481a-b9d5-45ff023f4d51/png-transparent-people-sing-sing-a-song-people-microphone-removebg-preview.png"
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            VibeUs
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="info" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/info" component={Link}>
              Info
            </Button>
            <Button color="primary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  const clearRoomCode = () => {
    setRoomCode(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            roomCode ? <Navigate to={`/room/${roomCode}`} /> : renderHomePage()
          }
        />
        <Route path="/join" element={<JoinRoomPage />} />
        <Route path="/info" element={<Info />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route
          path="/room/:roomCode"
          element={<Room clearRoomCodeCallback={clearRoomCode} />}
        />
      </Routes>
    </Router>
  );
};
export default HomePage;
