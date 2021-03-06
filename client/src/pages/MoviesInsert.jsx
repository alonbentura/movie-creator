import React from "react";
import api from "../api";
import {
  Title,
  Label,
  InputText,
  Button,
  CancelButton,
  Wrapper,
} from "../style/index";
import { useState } from "react";

const MoviesInsert = (props) => {
  const [movie, setMovie] = useState({
    name: "",
    rating: "",
    priorety: "",
    time: "",
  });
  const [userId, setUserId] = useState(props.location.state);

  const handleChangeInput = async (event) => {
    const value = event.target.value;
    const inputname = event.target.name;
    setMovie((prevState) => ({
      ...prevState,
      [inputname]: value,
    }));
  };

  const handleIncludeMovie = async () => {
    const payload = { userId, movie:movie };
    await api.insertMovie(payload).then((res) => {
      window.alert(`Movie inserted successfully`);
      setMovie({
        name: "",
        rating: "",
        priorety: "",
        time: "",
      });
    });

    props.history.push("/movies/list");
  };

  return (
    <Wrapper>
      <Title>Create Movie</Title>
      <Label>Name: </Label>
      <InputText
        type="text"
        name="name"
        value={movie.name}
        onChange={handleChangeInput}
      />
      <Label>Rating: </Label>
      <InputText
        type="number"
        name="rating"
        step="0.1"
        lang="en-US"
        min="0"
        max="10"
        pattern="[0-9]+([,\.][0-9]+)?"
        value={movie.rating}
        onChange={handleChangeInput}
      />
      <Label>priorety: </Label>
      <InputText
        name="priorety"
        type="number"
        step="1"
        lang="en-US"
        min="0"
        max="10"
        pattern="[0-9]+([,\.][0-9]+)?"
        value={movie.priorety}
        onChange={handleChangeInput}
      />

      <Label>Time: </Label>
      <InputText
        type="text"
        name="time"
        value={movie.time}
        onChange={handleChangeInput}
      />
      <Button onClick={handleIncludeMovie}>Add Movie</Button>
      <CancelButton href={"/movies/list"}>Cancel</CancelButton>
    </Wrapper>
  );
};

export default MoviesInsert;
