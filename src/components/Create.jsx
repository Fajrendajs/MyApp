import React, { Component } from "react";
import ReactDOM from "react-dom";
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
  Input,
  Select
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("boards");
    this.state = {
      title: "",
      description: "",
      author: "",
      teams: new Set([
        { key: "wsh", text: "Washington", value: "wsh" },
        { key: "lal", text: "Los Angeles Lakers", value: "lal" }
      ]),
      seasons: new Set([
        { key: "10/11", text: "2010/2011", value: "10/11" },
        { key: "11/12", text: "2011/2012", value: "11/12" }
      ])
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
      <>
        <Header as="h1">ADD BOARD</Header>
        <Header as="h1">
          <Link to="/">Book List</Link>
        </Header>
        <Container style={{ paddingTop: 50 }}>
          <Header as="h2" attached="top" inverted>
            ADD BOARD
          </Header>

          <Segment attached>
            <Form onSubmit={this.onSubmit}>
              <Form.Field
                required
                control={Select}
                options={this.state.teams.keys}
                label={{
                  children: "Team",
                  htmlFor: "form-select-control-team"
                }}
                placeholder="Team"
                search
                searchInput={{ id: "form-select-control-team" }}
              />

              <Form.Field
                required
                control={Select}
                options={this.state.seasons}
                label={{
                  children: "Season",
                  htmlFor: "form-select-control-season"
                }}
                placeholder="Season"
                search
                searchInput={{ id: "form-select-control-season" }}
              />

              <Form.Input
                width={8}
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

export default Create;
