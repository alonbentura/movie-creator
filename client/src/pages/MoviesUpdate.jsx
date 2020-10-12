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
    id: "",
    name: "",
    rating: "",
    time: "",
    priorety: "",
  });

  useEffect(() => {
    const { name, priorety, rating, time, _id } = props.location.state;
    setMovie({
      id: _id,
      name,
      priorety,
      rating,
      time,
    });
  }, []);

  const handleChangeInput = async (event) => {
    const { value, name } = event.target;
    setMovie((prevState) => ({
      ...prevState,
      id: movie.id,
      [name]: value,
    }));
  };

  const handleUpdateMovie = async () => {
    const { id, name, rating, time, priorety } = movie;
    const arrayTime = time.split("/");
    const payload = { name, rating, time, priorety };

    await api.updateMovieById(id, payload).then((res) => {
      window.alert(`Movie updated successfully`)
      ;
    });
    props.history.push("/movies/list");
  };

  return (
    <div className="bla">
      <Wrapper>
        <Title>Update Movie Details</Title>
        <Label>Name: </Label>
        <InputText
          type="text"
          name="name"
          defaultValue={movie.name}
          onChange={handleChangeInput}
        />
        <Label>Rating: </Label>
        <InputText
          type="number"
          min="0"
          maxLength="3"
          max="10"
          name="rating"
          pattern="[0-9]+([,\.][0-9]+)?"
          defaultValue={movie.rating}
          onChange={handleChangeInput}
        />
        <Label>priorety: </Label>
        <InputText
          name="priorety"
          type="number"
          min="0"
          max="10"
          maxLength="3"
          pattern="[0-9]+([,\.][0-9]+)?"
          defaultValue={movie.priorety}
          onChange={handleChangeInput}
        />
        <Label>Time: </Label>
        <InputText
          type="text"
          name="time"
          maxLength="4"
          defaultValue={movie.time}
          onChange={handleChangeInput}
        />

        <Button onClick={handleUpdateMovie}>Update Movie</Button>
        <CancelButton href={"/movies/list"}>Cancel</CancelButton>
      </Wrapper>
    </div>
  );
};

export default MoviesUpdate;
