import type { SvelteComponent } from "svelte"

export * from "./path"
export { default as path } from "./path"
export * from "./Route.svelte"
export { default as Route } from "./Route.svelte"
export { default as Noop } from "./Noop.svelte"

export interface UrlPatternOptions {
    escapeChar?: string
    segmentNameStartChar?: string
    segmentValueCharset?: string
    segmentNameCharset?: string
    optionalSegmentStartChar?: string
    optionalSegmentEndChar?: string
    wildcardChar?: string
}

export interface Context {
    decorator?: typeof SvelteComponent 
    didLoad?: () => Promise<void>
}

/**
 * @param path The next navigation location.
 * @return If the navigation should continue.
 */
export type OnNavigateCallback = (path: string) => boolean

export interface Router {
    params: any
    data: any
    path: string
}
