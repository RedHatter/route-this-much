import type { SvelteComponent } from "svelte"
import Route from "./Route.svelte"
import Noop from "./Noop.svelte"
import { pathname, hash, noMatch, onNavigate, navigate, back, hasPrevious } from "./path"

export declare function getContext(): Context | undefined 
export declare function setContext(context: Context): void
export { Route, Noop, pathname, hash, noMatch, onNavigate, navigate, back, hasPrevious }

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
