/** @jsxImportSource @emotion/react */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { songAdded } from "./songsSlice"; 
import {
  containerStyle,
  rowStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  buttonStyle,
} from '../../Styles/AddSongStyles'; 


export function AddSong() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [error, setError] = useState(null);

  const handleTitle = useCallback((e) => setTitle(e.target.value), []);
  const handleArtist = useCallback((e) => setArtist(e.target.value), []);
  const handleAlbum = useCallback((e) => setAlbum(e.target.value), []);
  const songs = useSelector((state) => state.songs.songs);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleClick = () => {
    if (title && artist && album && audioFile) {
      const maxId = songs.length > 0 ? Math.max(...songs.map(song => song.id)) : 0;
      const newId = maxId + 1;
      const fileURL = URL.createObjectURL(audioFile); 

      dispatch(
        songAdded({
          id: newId,
          title,
          artist,
          album,
          url: fileURL, 
        })
      );

      setError(null);
      navigate("/"); 
      setTitle("");
      setArtist("");
      setAlbum("");
      setAudioFile(null); 
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <section css={containerStyle}>
      <h1 css={rowStyle}>Add Song</h1>
      <label htmlFor="titleInput" css={labelStyle}>Title</label>
      <input
        type="text"
        placeholder="Song Title"
        id="titleInput"
        onChange={handleTitle}
        value={title}
        css={inputStyle}
      />
      <label htmlFor="artistInput" css={labelStyle}>Artist</label>
      <input
        type="text"
        placeholder="Artist Name"
        id="artistInput"
        onChange={handleArtist}
        value={artist}
        css={inputStyle}
      />
      <label htmlFor="albumInput" css={labelStyle}>Album</label>
      <input
        type="text"
        placeholder="Album Name"
        id="albumInput"
        onChange={handleAlbum}
        value={album}
        css={inputStyle}
      />
      <label htmlFor="audioFileInput" css={labelStyle}>Choose Audio File</label>
      <input
        type="file"
        accept="audio/*"
        id="audioFileInput"
        onChange={handleFileChange}
        css={inputStyle}
      />
      {error && <p css={errorStyle}>{error}</p>}
      <button onClick={handleClick} css={buttonStyle}>
        Add Song
      </button>
    </section>
  );
}
