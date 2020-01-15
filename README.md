# Route this much

A simple svelte router with nested route support. Uses [url-pattern](https://www.npmjs.com/package/url-pattern) for patch matching.

## Usage

```
<script>
  import { Router, Link, Route } from 'route-this-much'
  import Home from './routes/Home.svelte'
  import About from './routes/About.svelte'
  import Blog from './routes/Blog.svelte'
  import BlogPost from './routes/BlogPost.svelte'
</script>

<nav>
  <Link href="/">Home</Link>
  <Link href="about">About</Link>
  <Link href="blog">Blog</Link>
</nav>

<Router>
  <div>
    <Route path="/"><Home /></Route>
    <Route path="about" component="{About}" />
    <Route path="blog">
      <Blog />
      <Route path=":id" component="{BlogPost}" />
    </Route>
  </div>
</Router>
```

## API

### `Router`

The `Router` component supplies context information to its descendants all routes must have a parent `Router`.

### `Route`

Will render its `component` property or children when the `path` pattern matches the current URL.

The rendered component will be passed a `router` property containing `path` and `params`. All properties on the route other than `path`, `component`, and `redirect` are passed on to the component.

The `router` property can alternatively be exposed to the slot template using `let:router`.

```
<Route path="blog/:id" let:router>
  <BlogPost id="{router.params.id}" />
</Route>
```

|  Property   | Type                  | Description                                                                                                                                                               |
|-------------|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `path`      | Pattern string        |  The path pattern for when this component should be rendered. If no path is given the Route will act as the default that matches if no other Route in the Router matches. |
| `component` | Component constructor | The component that will be rendered when the `path` matches. If component is not set, the children of Route will be rendered instead.                                     |
| `redirect`  |  URL                  | If set will immediately navigate to this URL if the `path` matches.                                                                                                       |

### `Link`

A component simple wrapped `a` tag used for navigation.

Has the `active` class when the `href` property matches the current path.

|  Property | Type | Description             |
|-----------|------|-------------------------|
| `href`    | URL  | The URL to navigate to. |

### `navigate`

A function that allows you to imperatively navigate to a url.

### `path`

A store containing the current path.
