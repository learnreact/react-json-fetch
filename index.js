import React from "react"

class Fetch extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    let status = {}

    if (!this.props.url) return

    fetch(this.props.url, this.props.init)
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
