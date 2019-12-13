import React, { Component } from "react";
import YouTube from "react-youtube";

export class FetchData extends Component {
  static displayName = FetchData.name;

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
              <YouTube
                videoId={this.state.music ? this.state.music.id : "Oqpqr1vYuGs"}
                opts={opts}
                onReady={this._onReady}
              />
              <p>{this.state.music.lyric}</p>
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
