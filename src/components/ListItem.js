import React from "react";
import firebase from "./../firebase";

function ListItem(props) {
  function deleteSong(songId) {
    const songRef = firebase.database().ref(`/songs/${songId}`);
    songRef.remove();
  }

  return (
    <li>
      <h2>{props.songName}</h2>
      <p>{props.songArtist}</p>
      <p>{props.genre}</p>
      <p>{props.rating}</p>
      <button onClick={deleteSong(props.id)}>delete</button>
    </li>
  );
}

export default ListItem;
