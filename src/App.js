import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import firebase from "./Firebase";
import TableMain from "./components/TableMain";

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("boards");
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const boards = [];
    querySnapshot.forEach(doc => {
      const { title, description, author } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author
      });
    });
    this.setState({
      boards
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div>
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">BOARD LIST</h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to="/create">Add Board</Link>
            </h4>
            <TableMain />
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default App;
