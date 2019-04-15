import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";
import {
  Grid,
  Header,
  Form,
  Segment,
  Message,
  Button,
  Container,
  Input
} from "semantic-ui-react";

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
    const { title, description, author } = this.state;
    return (
      <>
        <Header as="h1">EDIT BOARD</Header>
        <Header as="h1">
          <Link to="/">Book List</Link>
        </Header>
        <Container style={{ paddingTop: 50 }}>
          <Header as="h2" attached="top" inverted>
            EDIT BOARD
          </Header>

          <Segment attached>
            <Form onSubmit={this.onSubmit}>
              <Form.Input
                label="Author"
                name="author"
                value={author}
                onChange={this.onChange}
              />
              <Form.Input
                value={description}
                label="Description"
                name="description"
                onChange={this.onChange}
              />
              <Form.Input
                value={title}
                label="Title"
                name="title"
                onChange={this.onChange}
              />
              <Button positive>Submit</Button>
            </Form>
          </Segment>
        </Container>
      </>
    );
  }
}

export default Edit;
