import { setContext, getContext } from 'svelte'
import { writable } from 'svelte/store'

export const ROUTER_CONTEXT = {}

export const path = writable(window.location.pathname)

window.addEventListener('popstate', e => path.set(window.location.pathname))

let hasPrevious = false

export function navigate(_path, replace = false) {
  hasPrevious = true
  const fn = replace ? 'replaceState' : 'pushState'
  history[fn](null, '', _path)
  path.set(window.location.pathname)
}

export function back() {
  if (hasPrevious) history.back()
  else navigate(window.location.pathname.replace(/[^/]+\/?$/, ''))
}

function match(list) {
  const defaultList = []
  let active = {}
  for (const route of list) {
    route.update(o => {
      if (o.pattern) {
        o.params = o.pattern.match(window.location.pathname)

        if (active && o.params !== null) active = null
      } else defaultList.push(route)

      return o
    })
  }

  for (const route of defaultList) {
    route.update(o => ((o.params = active), o))
  }
}

export default function createMatcher() {
  const routeList = []
  let matchQueued = false
  const ctx = {
    base: writable(),

    register(route) {
      routeList.push(route)
      route.subscribe(ctx.match)
    },

    unregister(route) {
      const i = routeList.indexOf(route)
      if (i < 0) return
      routeList.splice(i, 1)
    },

    match() {
      if (matchQueued) return
      matchQueued = true
      Promise.resolve().then(() => {
        match(routeList)
        matchQueued = false
      })
    },

    destroy() {
      routeList.length = 0
      unsubscribe()
    }
  }
  const unsubscribe = path.subscribe(ctx.match)

  setContext(ROUTER_CONTEXT, ctx)

  return ctx
}
