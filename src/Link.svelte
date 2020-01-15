<script>
  import { path, navigate } from './matcher.js'

  export let href

  $: part = href.startsWith('/')
    ? $path
    : $path.substring($path.lastIndexOf('/') + 1)
</script>

<a
  {href}
  on:click|preventDefault={() => navigate(href)}
  class:active={part.startsWith(href)}>
  <slot />
</a>
