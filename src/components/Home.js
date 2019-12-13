import React, { Component } from "react";
import YouTube from "react-youtube";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

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
      playerVars: {
        autoplay: 1
      }
    };

    return (
      <div>
        <Container>
          <Row style={{ " margin-left": 0, "margin-right": 0 }}>
            <Col sm="12">
              <Form onSubmit={this.handleSubmit}>
                <Form.Label>Nome da música</Form.Label>
                <Form.Row>
                  <Form.Group as={Col} controlId="formMusic">
                    <Form.Control
                      type="text"
                      placeholder="Nome da música"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                    <Form.Text className="text-muted">
                      Pesquise sua música favorita.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group as={Col} controlId="submitButton">
                    <Button variant="primary" type="submit">
                      Pesquisar
                    </Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Col>
          </Row>
          {this.state.music.youtube ? (
            <Row style={{ " margin-left": 0, "margin-right": 0 }}>
              <Col sm="5">
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
              </Col>
              <Col sm="7">
                <div style={{ float: "right", width: "65%" }}>
                  <span
                    style={{
                      whiteSpace: "pre-line"
                    }}
                  >
                    {this.state.music.lyric}
                  </span>
                </div>
              </Col>
            </Row>
          ) : (
            "Pesquise a música acima"
          )}
        </Container>
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
