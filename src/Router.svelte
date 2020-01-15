<script>
  import createMatcher from './matcher.js'
  import { onDestroy } from 'svelte'

  const ctx = createMatcher()
  onDestroy(() => ctx.destroy())
</script>

<slot />
