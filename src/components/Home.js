import React, { Component } from "react";
import YouTube from "react-youtube";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      music: [],
      loading: true,
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.populateMusicData(this.state.value);
    event.preventDefault();
  }

  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <div>
        <h1 id="tabelLabel">Awesome music player</h1>
        <p>Assista sua música preferida lendo a letra ao mesmo tempo.</p>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Nome:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Enviar" />
          </form>
          {this.state.music ? (
            <div>
              <div style={{ float: "left", width: "35%" }}>
                <YouTube
                  videoId={
                    this.state.music.youtube
                      ? this.state.music.youtube.id
                      : "Oqpqr1vYuGs"
                  }
                  opts={opts}
                  onReady={this._onReady}
                />
              </div>
              <div style={{ float: "right", width: "65%" }}>
                <span
                  style={{
                    whiteSpace: "pre-line",
                    float: "right",
                    width: "50%"
                  }}
                >
                  {this.state.music.lyric}
                </span>
              </div>
              <br style={{ clear: "both" }} />
            </div>
          ) : (
            "Pesquise a música acima"
          )}
        </div>
      </div>
    );
  }

  async populateMusicData(query) {
    const response = await fetch(
      "https://amm-song-service.herokuapp.com/song/" + query
    );
    const data = await response.json();
    this.setState({ music: data, loading: false });
  }
}
