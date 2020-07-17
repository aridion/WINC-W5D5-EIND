import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import firebase from "./../firebase.js";

function List() {
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    const songsRef = firebase.database().ref("songs");

    songsRef.on("value", (snapshot) => {
      let songsObject = snapshot.val();

      let songsArray = null;
      let songsKeys = null;

      if (songsObject !== null) {
        songsArray = Object.values(songsObject);
        songsKeys = Object.keys(songsObject);

        setTopSongs(
          songsArray.concat((songObject) => {
            topSongs.push({
              songName: songObject.songName,
              artistName: songObject.artistName,
              genre: songObject.genre,
              rating: songObject.rating,
              id: songsKeys[songsArray.indexOf(songObject)],
            });
          })
        );
      }
    });
  }, []);

  return (
    <ul>
      {console.log("DOM is rendered and topSongs = ", topSongs)}
      {topSongs.map((songObject) => (
        <>
          <ListItem
            songName={songObject.songName}
            songArtist={songObject.artistName}
            genre={songObject.genre}
            rating={songObject.rating}
            id={songObject.id}
          />
        </>
      ))}
    </ul>
  );
}

export default List;
