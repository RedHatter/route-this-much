<script>
  import { Router, Route, Link, link } from '../../src/index.js'
</script>

<style>
  :global(a.active) {
    font-weight: bold;
  }

  :global(a.partial) {
    font-style: italic;
  }
</style>

<Router>
  <ul>
    <li>
      <Link href="/one/">Route one</Link>
    </li>
    <li>
      <Link href="/two">Route two</Link>
    </li>
    <li>
      <Link href="/three">Redirect to one</Link>
    </li>
  </ul>
  <Route path="/one/*">
    <b use:link={'nested'}>Nested route</b>
    <h1>One</h1>
    <p>
      Renders for any path beginning with
      <i>/one/</i>
      .
    </p>
    <Route path="nested">
      <h2>Nested route</h2>
      <p>A route that renders inside of another route.</p>
    </Route>

    <Route>
      <h2>Nested default</h2>
      <p>
        This route is render when no other routes inside of
        <i>/one/</i>
        match.
      </p>
    </Route>
  </Route>
  <Route path="/two">
    <h1>Two</h1>
    <p>A basic route.</p>
  </Route>
  <Route path="/three" redirect="/one/" />
  <Route>
    <h1>Default</h1>
    <p>This route is render when no other routes match.</p>
  </Route>
</Router>
