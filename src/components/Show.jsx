import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("boards")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete = id => () => {
    firebase
      .firestore()
      .collection("boards")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <h4>
              <Link to="/">Board List</Link>
            </h4>
            <h3>{this.state.board.title}</h3>
          </div>
          <div>
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.board.description}</dd>
              <dt>Author:</dt>
              <dd>{this.state.board.author}</dd>
            </dl>
            <Button.Group>
              <Button
                labelPosition="left"
                icon="delete"
                content="Delete"
                onClick={this.delete(this.state.key)}
              />
              <Button.Or />
              <Link to={`/edit/${this.state.key}`}>
                <Button
                  labelPosition="left"
                  icon="edit"
                  content="Edit"
                  positive
                />
              </Link>
            </Button.Group>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
