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
  Button
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

//https://codesandbox.io/s/ywjoykw95x

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
      <Grid centered columns={2}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Login
          </Header>
          <Segment>
            <Form size="large">
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Email address"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />

              <Button color="blue" fluid size="large">
                Login
              </Button>
            </Form>
          </Segment>
          <Message>
            Not registered yet? <a href="#">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Create;
