import React, { Component } from "react";
import ReactDOM from "react-dom";
import firebase from "../Firebase";
import { Link } from "react-router-dom";

class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("boards");
    this.state = {
      title: "",
      description: "",
      author: ""
    };
  }
  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { title, description, author } = this.state;

    this.ref
      .add({
        title,
        description,
        author
      })
      .then(docRef => {
        this.setState({
          title: "",
          description: "",
          author: ""
        });
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const { title, description, author } = this.state;
    return (
      <div>
        <div>
          <div>
            <h3>ADD BOARD</h3>
          </div>
          <div>
            <h4>
              <Link to="/">Book List</Link>
            </h4>
            <form onSubmit={this.onSubmit}>
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  name="description"
                  onChange={this.onChange}
                  placeholder="Description"
                  cols="80"
                  rows="3"
                  value={description}
                />
              </div>
              <div>
                <label htmlFor="author">Author:</label>
                <input
                  type="text"
                  name="author"
                  value={author}
                  onChange={this.onChange}
                  placeholder="Author"
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
