/** @jsxImportSource @emotion/react */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { songUpdated } from "./songsSlice";
import {
  containerStyle,
  rowStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  buttonStyle,
  audioPreviewContainer,
} from '../../Styles/AddSongStyles'; 

export function EditSong() {
  const { pathname } = useLocation();
  const songId = parseInt(pathname.replace("/edit-song/", ""));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const song = useSelector((state) =>
    state.songs.songs.find((song) => song.id === songId)
  );

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (song) {
      setTitle(song.title);
      setArtist(song.artist);
      setAlbum(song.album);
      setAudioUrl(song.url);
    }
  }, [song]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setAudioFile(file);
      setAudioUrl(fileURL);
    }
  };

  const handleClick = () => {
    if (title && artist && album && audioFile) {
      dispatch(
        songUpdated({
          id: songId,
          title,
          artist,
          album,
          url: audioUrl,
        })
      );
      setError(null);
      navigate("/");
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <section css={containerStyle}>
      <h1 css={rowStyle}>Edit Song</h1>
      <label htmlFor="titleInput" css={labelStyle}>Title</label>
      <input
        type="text"
        placeholder="Song Title"
        id="titleInput"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        css={inputStyle}
      />
      <label htmlFor="artistInput" css={labelStyle}>Artist</label>
      <input
        type="text"
        placeholder="Artist Name"
        id="artistInput"
        onChange={(e) => setArtist(e.target.value)}
        value={artist}
        css={inputStyle}
      />
      <label htmlFor="albumInput" css={labelStyle}>Album</label>
      <input
        type="text"
        placeholder="Album Name"
        id="albumInput"
        onChange={(e) => setAlbum(e.target.value)}
        value={album}
        css={inputStyle}
      />
      <label htmlFor="audioFileInput" css={labelStyle}>Choose Audio File</label>
      <div css={audioPreviewContainer}>
        <input
          type="file"
          accept="audio/*"
          id="audioFileInput"
          onChange={handleFileChange}
          css={inputStyle}
        />
        {audioUrl && (
          <audio controls src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
      {error && <p css={errorStyle}>{error}</p>}
      <button onClick={handleClick} css={buttonStyle}>
        Save Song
      </button>
    </section>
  );
}