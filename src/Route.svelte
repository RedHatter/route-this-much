<script>
  import UrlPattern from 'url-pattern'
  import { getContext, onDestroy } from 'svelte'
  import { writable } from 'svelte/store'
  import createMatcher, {
    ROUTER_CONTEXT,
    path as currentPath,
    navigate
  } from './matcher.js'

  export let path = ''
  export let component
  export let redirect

  const route = writable({ params: null })
  const ctx = getContext(ROUTER_CONTEXT)
  const base = ctx.base
  ctx.register(route)

  const _ctx = createMatcher()
  onDestroy(() => {
    ctx.unregister(route)
    _ctx.destroy()
  })

  $: _ctx.base.set(path.replace(/\(?\/[^/]*\*[^/]*$/, '/'))
  $: $route.pattern =
    path !== '' && new UrlPattern(path.startsWith('/') ? path : $base + path)
  $: if ($route.params !== null && redirect) navigate(redirect, true)
  $: router = { params: $route.params, path: $currentPath }

  let props = {}
  $: {
    const { path, component, ...rest } = $$props
    props = rest
  }
</script>

{#if $route.params !== null}
  {#if component}
    <svelte:component this={component} {router} {...props} />
  {:else}
    <slot {router} />
  {/if}
{/if}
