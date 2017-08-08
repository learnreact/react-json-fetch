import React, { Component } from "react"

class Fetch extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const url = this.props.__status
      ? `http://httpstat.us/${this.props.__status}`
      : this.props.url

    let status = {}

    fetch(url, this.props.init)
      .then(response => {
        status = {
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        }

        return response
      })
      .then(response => response.json())
      .then(json => this.setState({ status, json }))
      .catch(error => this.setState({ status }))
  }

  render() {
    return React.Children.only(this.props.children(this.state))
  }
}
Fetch.defaultProps = {
  url: "",
  init: {},
}

export default Fetch
