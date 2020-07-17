import React, { useState } from "react";
import firebase from "./../firebase.js";

function Form() {
  const [songs, setSongs] = useState({
    songName: "",
    artistName: "",
    genre: "",
    rating: "",
  });

  function handleChange(input) {
    // replace empty strings in 'songs' state with user inputs from DOM
    setSongs({
      ...songs,
      [input.target.name]: input.target.value,
    });
  }

  // sends user inputs to firebase
  function handleSubmit(event) {
    event.preventDefault();

    // make song info ready for firebase
    const songsRef = firebase.database().ref("songs");
    const song = {
      songName: songs.songName,
      artistName: songs.artistName,
      genre: songs.genre,
      rating: songs.rating,
    };

    songsRef.push(song);

    // clear input fields
    setSongs({
      songName: "",
      artistName: "",
      genre: "",
      rating: "",
    });
  }

  return (
    <form>
      <input
        type="text"
        name="songName"
        placeholder="song name"
        onChange={handleChange}
        value={songs.songName}
      />
      <input
        type="text"
        name="artistName"
        placeholder="artist name"
        onChange={handleChange}
        value={songs.artistName}
      />
      <select name="genre" onChange={handleChange} value={songs.genre}>
        <option value="" disabled selected hidden>
          genre
        </option>
        <option value="Rock">Rock</option>
        <option value="HipHop">Hip-Hop</option>
        <option value="Jazz">Jazz</option>
        <option value="Bossa">Bossa</option>
        <option value="Electronic">Electronic</option>
        <option value="Pop">Pop</option>
        <option value="Alternative">Alternative</option>
      </select>
      <select name="rating" onChange={handleChange} value={songs.rating}>
        <option value="" disabled selected hidden>
          rating
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <button onClick={handleSubmit}>Add Song</button>
    </form>
  );
}

export default Form;
