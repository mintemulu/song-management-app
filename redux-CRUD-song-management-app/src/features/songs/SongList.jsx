/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSongs, songDeleted } from './songsSlice';
import { containerStyle, buttonStyle, tableStyle, buttonStyles, btn, buttonStylep, titleStyle } from '../../Styles/Emotion'; // Named imports

export function SongList() {
  const dispatch = useDispatch();
  const { songs = [], status, error } = useSelector((state) => state.songs);
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [playingSongId, setPlayingSongId] = useState(null); 
  const audioRef = useRef(null); 
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSongs());
    }
  }, [status, dispatch]);

  const handleDelete = (id, url) => {
    if (currentSongUrl === url) {
      setCurrentSongUrl(null);
      setPlayingSongId(null); 
    }
    dispatch(songDeleted({ id }));
  };

  const handlePlaySong = (id, url) => {
    if (audioRef.current) {
      audioRef.current.pause(); 
    }
    
    setCurrentSongUrl(url);
    setPlayingSongId(id); 
  };

  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>Redux CRUD Song Management App</h1>
      <div>
        <button onClick={() => dispatch(fetchSongs())} css={buttonStyle}>
          reLoad songs
        </button>
        <Link to="/add-song">
          <button css={buttonStyle}>create song</button>
        </Link>
      </div>
      <div>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && songs.length === 0 && <p>No songs available</p>}
        {status === 'succeeded' && songs.length > 0 && (
          <>
            <table css={tableStyle}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Album</th>
                  <th>Audio</th> 
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {songs.map(({ id, title, artist, album, url }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{title}</td>
                    <td>{artist}</td>
                    <td>{album}</td>
                    <td style={{ display: 'flex', alignItems: 'center' }}> 
                      <button onClick={() => handlePlaySong(id, url)} css={buttonStylep}>
                        Play
                      </button>
                      {playingSongId === id && currentSongUrl && ( 
                        <audio ref={audioRef} controls autoPlay>
                          <source src={currentSongUrl} type="audio/mp3" />
                          Your browser does not support the audio element.
                        </audio>
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleDelete(id, url)} css={btn}>
                        Delete
                      </button>
                      <Link to={`/edit-song/${id}`}>
                        <button css={buttonStyles}>Edit</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}