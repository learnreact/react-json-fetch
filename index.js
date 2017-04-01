import React, { Component, PropTypes, createElement } from 'react';

class Fetch extends Component {
  constructor() {
    super();
    this.state = {
      response: null
    };
  }

  getChildContext() {
    return { response: this.state.response };
  }

  componentDidMount() {
    fetch(this.props.path, this.props.options)
      .then(r => r.json())
      .then(response => this.setState({ response }));
  }

  render() {
    return (
      <div>
        {this.state.response
          ? <div>
              {this.props.children(this.state.response)}
            </div>
          : <div>no response</div>}
      </div>
    );
  }
}

Fetch.childContextTypes = {
  response: PropTypes.object
};

const Formatter = ({ obj }) => <pre>{JSON.stringify(obj, null, 2)}</pre>;

const withResponse = Composed => {
  class FetchContextProvider extends Component {
    render() {
      return <Composed {...this.context} />;
    }
  }

  FetchContextProvider.contextTypes = {
    response: PropTypes.object
  };

  return FetchContextProvider;
};

const Response = withResponse(({ response }) => <Formatter obj={response} />);

// TODO: JSONAPI
// const Idx = ({ idx }) =>
//   createElement(
//     withResponse(({ response }) => <Formatter obj={response[idx]} />)
//   );
// const Links = () => <Idx idx="links" />;
// const Data = () => <Idx idx="data" />;
// const Included = () => <Idx idx="included" />;
// const Meta = () => <Idx idx="meta" />;

export default {
  Fetch,
  Formatter,
  Idx,
  Response,
  withResponse,
}