import React from "react"
import PropTypes from "prop-types"

class ReactJSONFetch extends React.Component {
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

  getChildContext() {
    return {
      status: this.state.status,
      json: this.state.json,
    }
  }

  render() {
    return React.Children.only(this.props.children(this.state))
  }
}
ReactJSONFetch.defaultProps = {
  url: "",
  init: {},
}
ReactJSONFetch.childContextTypes = {
  status: PropTypes.object,
  json: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default ReactJSONFetch
