import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      title: "",
      description: "",
      author: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("boards")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          description: board.description,
          author: board.author
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ board: state });
  };

  onSubmit = e => {
    e.preventDefault();

    const { title, description, author } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("boards")
      .doc(this.state.key);
    updateRef
      .set({
        title,
        description,
        author
      })
      .then(docRef => {
        this.setState({
          key: "",
          title: "",
          description: "",
          author: ""
        });
        this.props.history.push("/show/" + this.props.match.params.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <h3>EDIT BOARD</h3>
          </div>
          <div>
            <h4>
              <Link to={`/show/${this.state.key}`}>Board List</Link>
            </h4>
            <form onSubmit={this.onSubmit}>
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  placeholder="Description"
                />
              </div>
              <div>
                <label htmlFor="author">Author:</label>
                <input
                  type="text"
                  name="author"
                  value={this.state.author}
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

export default Edit;
