import { http,HttpResponse } from 'msw';

export const songs = [
  { id: 1, title: "Song One", artist: "Artist A", album: "Album A", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",},
  { id: 2, title: "Song Two", artist: "Artist A", album: "Album A", url:  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",},
  { id: 3, title: "Song Three", artist: "Artist A", album: "Album A", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",},
  { id: 4, title: "Song Four", artist: "Artist A", album: "Album A", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",},
  { id: 5, title: "Song Five", artist: "Artist A", album: "Album A", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },

];

export const handlers = [
  http.get('/api/songs', (resolver) => {
    return HttpResponse.json(songs);
  }),

  http.get('/api/songs/:id', (req, res, ctx) => {
    const { id } = req.params;
    const song = songs.find(song => song.id === Number(id));
    return song ? res(ctx.json(song)) : res(ctx.status(404));
  }),

  http.post('/api/songs', async (req, res, ctx) => {
    const newSong = await req.json();
    const newId = songs.length + 1;
    songs.push({ ...newSong, id: newId });
    return res(ctx.json({ ...newSong, id: newId }));
  }),

  http.patch('/api/songs/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const updates = await req.json();
    const songIndex = songs.findIndex(song => song.id === Number(id));
    if (songIndex > -1) {
      songs[songIndex] = { ...songs[songIndex], ...updates };
      return res(ctx.json(songs[songIndex]));
    }
    return res(ctx.status(404));
  }),

  http.delete('/api/songs/:id', (req, res, ctx) => {
    const { id } = req.params;
    const songIndex = songs.findIndex(song => song.id === Number(id));
    if (songIndex > -1) {
      songs.splice(songIndex, 1);
      return res(ctx.status(204));
    }
    return res(ctx.status(404));
  }),
];
