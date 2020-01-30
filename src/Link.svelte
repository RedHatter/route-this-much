<script>
  import { path, navigate } from './matcher.js'

  export let href

  $: part = href.startsWith('/')
    ? $path
    : $path.substring($path.lastIndexOf('/') + 1)
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a
  {...$$props}
  on:click|preventDefault={() => navigate(href)}
  class:active={part == href}
  class:partial={part != href && part.startsWith(href)}>
  <slot />
</a>
