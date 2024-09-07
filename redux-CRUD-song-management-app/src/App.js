import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { SongList } from './features/songs/SongList';
import { AddSong } from './features/songs/AddSong';
import { EditSong } from './features/songs/EditSong';

function App() {
  return (
<Router>
    <div>
    <Routes>
          <Route
            path="/"
            element={
              <>
                <SongList />
              </>
            }
          ></Route>
          <Route path='/add-song' element={<AddSong/>}></Route>
          <Route path='/edit-song/:songId' element={<EditSong/>}></Route>
          
          </Routes>
    </div>
</Router>
    
  )
}

export default App