import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 100,
      date: new Date(),
    };
  }

  componentDidMount() {
    if (this.props.start !== undefined) {
      this.setState({ time: this.props.start });
    }
    this.timerID = setInterval(() => this.waktu(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  waktu() {
    this.setState({
      time: this.state.time - 1,
      date: new Date(),
    });
  }

  render() {
    return (
      <>
        {this.state.time >= 0 && (
          <>
            <table style={{ marginTop: "50px" }}>
              <tr>
                <th>
                  {"sekarang jam : " + this.state.date.toLocaleTimeString()}
                </th>
                <th>{"hitung mundur : " + this.state.time}</th>
              </tr>
            </table>
          </>
        )}
      </>
    );
  }
}

export default Timer;
