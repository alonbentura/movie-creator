import React, { Component } from "react";
import ReactTable from "react-table";
import api from "../api";
import { ListWrapper, Update, Delete } from "../style/index";
import "react-table/react-table.css";

class UpdateMovie extends Component {
  constructor(props) {
    super(props);
  }

  updateUser = (event) => {
    console.log(this.props)
    debugger;
    const { movie } = this.props;
    event.preventDefault();
    this.props.history.push(
      `/user/${this.props.userId}/movie/update/${(movie.id)}`,
      movie
    );
    // window.location.href = ;
  };

  render() {
    return <Update onClick={this.updateUser}>Update</Update>;
  }
}

class DeleteMovie extends Component {
  deleteUser = (event) => {
    event.preventDefault();

    if (
      window.confirm(
        `Do tou want to delete the movie ${this.props.id} permanently?`
      )
    ) {
      api.deleteMovieById(this.props.id);
      window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>;
  }
}

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: this.props.location.state.movies,
      userId: this.props.location.state._id,
      columns: [],
      isLoading: false,
    };
  }

  addMovie = () => {
    this.props.history.push("/movie/create" , this.state.userId);
  };

  render() {
    const { movies, isLoading, userId } = this.state;
    const {history} = this.props
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
        Cell: (props) => <span>{props.value.join(" / ")}</span>,
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
              <UpdateMovie movie={props.original} userId={userId} history={history} />
            </span>
          );
        },
      },
    ];

    let showTable = true;
    if (!movies.length) {
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
              userId={this.state.userId}
            />

            <button onClick={this.addMovie}>Add a Movie</button>
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
  }
}

export default MoviesList;
