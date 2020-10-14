import React, { Component } from "react";
import ReactTable from "react-table";
import api from "../api";
import { ListWrapper, Update, Delete } from "../style/index";
import "react-table/react-table.css";
import { useState, useEffect } from "react";

const UpdateMovie = (props) => {
  const updateUser = (event) => {
    const { movie } = this.props;
    event.preventDefault();
    props.history.push(`/user/movie/update/`, movie);
  };

  return <Update onClick={updateUser}>Update</Update>;
};

class DeleteMovie extends Component {
  deleteUser = async (event) => {
    event.preventDefault();

    if (
      window.confirm(
        `Do tou want to delete the movie ${this.props.id} permanently?`
      )
    ) {
      await api.deleteMovieById(this.props.id);
      window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>;
  }
}

const MoviesList = (props) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    api.getUserMovies().then((res) => {
      setMovies(res.data.data);
    });
  }, []);

  const addMovie = () => {
    props.history.push("/movie/create");
  };
  const columns = [
    {
      Header: "ID",
      accessor: "_id",
      filterable: true,
    },
    {
      Header: "Name",
      accessor: "name",
      filterable: true,
    },
    {
      Header: "Rating",
      accessor: "rating",
      filterable: true,
    },
    {
      Header: "Priorety",
      accessor: "priorety",
      filterable: true,
    },
    {
      Header: "Time",
      accessor: "time",
      // Cell: (props) => <span>{props.value.join(" / ")}</span>,
    },
    {
      Header: "",
      accessor: "",
      Cell: function (props) {
        return (
          <span>
            <DeleteMovie id={props.original._id} />
          </span>
        );
      },
    },
    {
      Header: "",
      accessor: "",
      Cell: function (props) {
        return (
          <span>
            <UpdateMovie movie={props.original} history={props.history} />
          </span>
        );
      },
    },
  ];

  let showTable = true;
  if (!movies) {
    showTable = false;
  }
  return (
    <ListWrapper>
      {showTable ? (
        <React.Fragment>
          <ReactTable
            data={movies}
            columns={columns}
            loading={isLoading}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={0}
            // userId={this.state.userId}
          />

          <button onClick={addMovie}>Add a Movie</button>
        </React.Fragment>
      ) : (
        <div>
          <div>there is no movies!!!</div>
          <div>if you want to create on click </div>
          <a href="/movie/create">here</a>
        </div>
      )}
    </ListWrapper>
  );
};

export default MoviesList;
