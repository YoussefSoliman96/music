import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const skipSong = () => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  fetch("/spotify/skip", requestOptions);
};

const pauseSong = () => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  };
  fetch("/spotify/pause", requestOptions);
};

const playSong = () => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  };
  fetch("/spotify/play", requestOptions);
};

const MusicPlayer = ({ song }) => {
  console.log(song);
  if (song) {
    const songProgress = (song.time / song.duration) * 100;
    return (
      <Card>
        <Grid container alignItems="center">
          <Grid item align="center" xs={4}>
            <img src={song.image_url} height="100%" width="100%" />
          </Grid>
          <Grid item align="center" xs={8}>
            <Typography component="h5" variant="h5">
              {song.title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {song.artist}
            </Typography>
            <div>
              <IconButton onClick={song.is_playing ? pauseSong : playSong}>
                {song.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={skipSong}>
                <SkipNextIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    );
  }
};

export default MusicPlayer;
