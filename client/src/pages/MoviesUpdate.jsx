import React, { useState, useEffect } from "react";
import api from "../api";
import {
  Wrapper,
  InputText,
  Label,
  Title,
  Button,
  CancelButton,
} from "../style/index";
import "../style/style.scss";

const MoviesUpdate = (props) => {
  const [movie, setMovie] = useState({
    id: props.match.params.id,
    name: "",
    rating: "",
    time: "",
    priorety: "",
  });

  const handleChangeInput = async (event) => {
    const value = event.target.value;
    const inputname = event.target.name;
    setMovie((prevState) => ({
      ...prevState,
      id: props.match.params.id,
      [inputname]: value,
    }));
  };

  const handleUpdateMovie = async () => {
    const { id, name, rating, time, priorety } = this.state;
    const arrayTime = time.split("/");
    const payload = { name, rating, time: arrayTime, priorety };

    await api.updateMovieById(id, payload).then((res) => {
      window.alert(`Movie updated successfully`);
    });
  };

  useEffect(async () => {
    const { id } = props;
    const movie = await api.getMovieById(id);
    setMovie({
      name: movie.data.data.name,
      priorety: movie.data.data.priorety,
      rating: movie.data.data.rating,
      time: movie.data.data.time.join("/"),
    });
  });

  return (
    <div className="bla">
      <Wrapper>
        <Title>Update Movie Details</Title>
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
          min="0"
          max="10"
          name="rating"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={movie.rating}
          onChange={handleChangeInput}
        />
        <Label>priorety: </Label>
        <InputText
          name="priorety"
          type="number"
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

        <Button onClick={handleUpdateMovie}>Update Movie</Button>
        <CancelButton href={"/movies/list"}>Cancel</CancelButton>
      </Wrapper>
    </div>
  );
};

export default MoviesUpdate;
