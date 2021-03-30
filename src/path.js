import { writable } from 'svelte/store'

const path = writable(window.location.pathname)
export const hash = writable(window.location.hash)
export const noMatch = writable(true)

export default path

// reset match
path.subscribe(() => noMatch.set(true))

function update() {
    path.set(window.location.pathname)
    hash.set(window.location.hash)
}

window.addEventListener('popstate', update)

let hasPrevious = false

/** @type {import("./types").OnNavigateCallback} */
let on_navigate = () => true

/**
 * @param {import("./types").OnNavigateCallback} fn
 * @returns void
 */
export function onNavigate(fn) {
    on_navigate = fn
}

/**
 * @param {string} href
 * @param {boolean} replace
 * @returns void
 */
export function navigate(href, replace = false) {
    if (!on_navigate(href)) return
    hasPrevious = true
    const fn = replace ? 'replaceState' : 'pushState'
    history[fn](null, '', href)
    update()
}

export function back() {
    if (hasPrevious) history.back()
    else navigate(window.location.pathname.replace(/[^/]+\/?$/, ''))
}

// intercept local links for the router
window.addEventListener('click', event => {
    const anchor = /** @type {Element} */ (event.target)?.closest('a')
    const href = anchor?.href

    // partially lifted from roxiness/routify
    if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        event.button ||
        event.defaultPrevented ||
        // a attributes
        !href ||
        anchor?.target ||
        anchor?.host !== window.location.host
    )
        return

    event.preventDefault()

    navigate(href)
})
