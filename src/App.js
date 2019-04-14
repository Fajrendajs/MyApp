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
        <div>
          <div>
            <h3>BOARD LIST</h3>
          </div>
          <div>
            <h4>
              <Link to="/create">Add Board</Link>
            </h4>
            <TableMain />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
