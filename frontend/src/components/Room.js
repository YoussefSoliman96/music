import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Typography, SliderValueLabel } from "@mui/material";
import { Link } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

const Room = ({ clearRoomCodeCallback }) => {
  const navigate = useNavigate();
  const { roomCode } = useParams();
  const [roomData, setRoomData] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    showSettings: false,
  });
  const [authenticated, setAuthenticated] = useState(false);

  const getRoomDetails = () => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => {
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
        if (roomData.isHost) {
          authenticateSpotify();
        }
      });
  };

  useEffect(() => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => {
        if (!response.ok) {
          clearRoomCodeCallback; // clears roomCode state in HomePage
          getCurrentSong;
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
        if (authenticated === false) {
          authenticateSpotify();
        }
      });
    const interval = setInterval(getCurrentSong, 100);
  }, [roomCode]);

  const [song, setSong] = useState({});
  const getCurrentSong = () => {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSong(data);
      });
  };

  const authenticateSpotify = () => {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setAuthenticated(data.status);
        console.log(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  };

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

  const updateShowSettings = (value) => {
    setRoomData({
      ...roomData,
      showSettings: value,
    });
  };

  const renderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={roomData.votesToSkip}
            guestCanPause={roomData.guestCanPause}
            roomCode={roomCode}
            updateCallBack={getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          sx={{ m: 1 }}
          onClick={() => updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  };
  if (roomData.showSettings) {
    return renderSettings();
  }
  return (
    <>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component={"h4"}>
          Code: {roomCode}
        </Typography>
      </Grid>
      <MusicPlayer song={song}></MusicPlayer>
      {roomData.isHost ? renderSettingsButton() : null}
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
