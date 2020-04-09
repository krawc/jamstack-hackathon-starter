import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  state = { loading: false, msg: null, streams: [] }
  handleClick = e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/token-hider")
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.message }))


  }

  componentDidMount() {
    fetch('/.netlify/functions/streams').then((response) => {
      return response.json();
    }).then((response) => {
      console.log(response);
      this.setState({streams: response});
    });
  }

  render() {

    const { loading, msg, streams } = this.state;

    const streamItems = streams.map( (stream) => {

      const id = stream ? stream.ref['@ref'].id : '';
      const link = '/app/stream/' + id;

      return (
        <div className="stream">
          <a href={link}>
            <h1>{link}</h1>
          </a>
        </div>
      );
    });

    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >

          {streamItems}

         
        </div>
      </Layout>
    )
  }
}

export default IndexPage
