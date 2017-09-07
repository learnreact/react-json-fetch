# react-json-fetch
An extensible `fetch` component for prototyping.

## Why
I like prototyping with real data.
Fetching data right in the component tree is brilliant for that.

## Why not
In production, you might need a more coordinated, controlled,
data-fetching technique.
Maybe not, but maybe.

## Build your own...
This is a low-level fetch component.
It has almost no smarts, which makes it a good base for your
app's custom implementation.

## API
`react-fetch-component` is a thin component wrapper around
`fetch`.
It takes 2 props: `url` and `init`.
This maps 1:1 to the [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

```js
<ReactJSONFetch
  url="https://some-url.com/"
  init={{ credentials: "omit" }}
/>

// => fetch("https://some-url.com/", {credentials: "omit"})
```

That's effectively it.

Oh, and everything is handled in `children`.
I know that hijacking `children` is frowned on but it made sense
here.

`children` must be a function.

It will get called with a `response` object.

```js
<ReactJSONFetch url="http://pokeapi.co/api/v2/pokemon/">
  {response => {
    {response =>
      response.status && response.status.ok
        ? <div>Hurray!</div>
        : <div>Bummer!</div>  
    }
  }}
</ReactJSONFetch>
```

The `children` function gets called with a single response object.
It has properties `status` and `json`.

`status` includes `ok`, `status`, `statusText`, and `url`, from
the `Response` object.

`json` is the result of calling `.json()` on a successful
request.

## Examples

### Basic Example
```js
<ReactJSONFetch url="http://pokeapi.co/api/v2/pokemon/">
  {({ status, json }) => {
    if (status && status.ok) {
      return (
        <ul>
          {json.results.map(pokemon =>
            <li>{pokemon.name}</li>
          )}
        </ul>
      )
    }

    if (status && !status.ok) {
      return <div>{`${status.status}: ${status.statusText}`}</div>
    }

    return <div>Loading...</div>
  }}
</ReactJSONFetch>
```

### Error handling switch
```js
<ReactJSONFetch {...this.props}>
  {({ status, json }) => {
    if (status && status.ok) {
      return (
        <ul>
          {json.results.map(pokemon =>
            <li>{pokemon.name}</li>
          )}
        <ul/>
      )
    }

    if (status && !status.ok) {
      switch (status.status) {
        case 404:
          return <div>Uuuum, we can{"'"}t find that.</div>
        case 500:
          return (
            <div> Crap! Looks like our server is having trouble </div>
          )
        default:
          return <div> error </div>
      }
    }

    return <div>Loading...</div>
  }}
</ReactJSONFetch>
```

### Build your own
This is a very bad API for common use.
But's a great low-level API for you to build your own.
Here's what an application-specific wrapper might look like.

```js
class Pokeapi extends React.Component {
  render() {
    return (
      <ReactJSONFetch {...this.props}>
        {({ status, json }) => {
          if (status && status.ok) {
            return typeof this.props.ok === "function"
              ? React.Children.only(this.props.ok(json))
              : React.Children.only(this.props.ok)
          }

          if (status) {
            return typeof this.props.error === "function"
              ? React.Children.only(this.props.error(status))
              : React.Children.only(this.props.error)
          }

          return this.props.loading
        }}
      </ReactJSONFetch>
    )
  }

}
Pokeapi.defaultProps = {
  error: <div>error</div>,
  loading: <div>loading...</div>,
  ok: <div>ok</div>,
}
```

## Installation
### Node
```npm i react-json-fetch --save```
or
```yarn add react-json-fetch```

```js
import Fetch from "react-json-fetch"

<Fetch url="http://pokeapi.co/api/v2/pokemon/">
  {({ status, json }) => {
    if (status && status.ok) { return <div>Hurray!</div> }
    if (status && !status.ok) { return <div>Bummer!</div> }
    return <div>Loading...</div>
  }}
</Fetch>
```

### Browser
Exports `ReactJSONFetch` on `window`.

```js
<script
  crossorigin
  src="https://unpkg.com/react-json-fetch"
></script>

<script type="text/babel">
  <ReactJSONFetch url="http://pokeapi.co/api/v2/pokemon/">
    {({ status, json }) => {
      if (status && status.ok) { return <div>Hurray!</div> }
      if (status && !status.ok) { return <div>Bummer!</div> }
      return <div>Loading...</div>
    }}
  </ReactJSONFetch>
</script>
```

## TODO
* re-renders. the current API is based completely on the url prop. so i need to provide a controlled way to re-fetch when that prop changes.


## Code Quality
[Learn React](#https://learnreact.com) open source, is intended for education.
Source should be singularly focus and readable above all.

## License
MIT License
Copyright &copy; Michael Chan 2017
