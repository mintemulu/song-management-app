import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchSongsSuccess, fetchSongsFailure } from './songsSlice';

function* fetchSongsSaga() {
  try {
    const response = yield call(fetch, '/api/songs');
    if (!response.ok) {
      throw new Error('Failed to fetch songs');
    }
    const data = yield response.json();
    console.log(data)
    yield put(fetchSongsSuccess(data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* watchFetchSongs() {
  yield takeLatest('songs/fetchSongs', fetchSongsSaga);
}

export default function* songsSaga() {
    yield watchFetchSongs();
  }