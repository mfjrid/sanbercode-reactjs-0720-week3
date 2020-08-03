import React, { Component } from "react";
import "./App.css";
import TabelBuah from "./tugas11/Tabel";

// App.js ini menggunakan CSS dari App.css

class App extends Component {
  render() {
    return (
      <div>
        {/* Tugas 1 */}
        <TabelBuah />
      </div>
    );
  }
}

export default App;
