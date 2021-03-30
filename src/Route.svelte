<script context="module">
    import { setContext as _setContext, getContext as _getContext } from 'svelte'

    const key = Symbol()

    /**
     * @returns import('./types').Context | undefined
     */
    export const getContext = _getContext.bind(undefined, key)

    /**
     * @param {import("./types").Context}
     * @returns void
     */
    export const setContext = _setContext.bind(undefined, key)
</script>

<script>
    import UrlPattern from 'url-pattern'
    import pathname, { navigate, noMatch } from './path'
    import Noop from './Noop.svelte'

    import { tick } from 'svelte'

    const context = getContext()

    // for UrlPattern constructor
    /** @type string | RegExp */
    export let path = undefined
    /** @type {import("./types").UrlPatternOptions} */
    export let options = undefined
    /** @type string[] */
    export let groupNames = undefined

    /** @type  typeof import("svelte").SvelteComponent */
    export let component = undefined
    /** @type string */
    export let redirect = undefined
    /** @type (params: object) => Promise<any>  */
    export let resource = () => Promise.resolve()
    export let decorator = context?.decorator
    export let didLoad = context?.didLoad

    /** @type Promise<any> */
    let promise

    // @ts-ignore
    $: pattern = new UrlPattern(path, typeof path === 'string' ? options : groupNames)
    /** @type any */
    let params
    $: params = pattern.match($pathname)

    $: {
        if (params !== null) {
            $noMatch = false
            if (redirect) navigate(redirect, true)
            promise = resource(params)
        }
    }

    $: promise?.then(tick).then(didLoad)

    /**
     * @param {any} data
     * @returns {Router}
     */
    function router(data) {
        return {
            params,
            data,
            path: $pathname
        }
    }
</script>

{#if params !== null}
    <svelte:component this={decorator ?? context?.decorator ?? Noop}>
        {#await promise then data}
            {#if component}
                <svelte:component this={component} router={router(data)} {...$$restProps} />
            {:else}
                <slot router={router(data)} {...$$restProps} />
            {/if}
        {/await}
    </svelte:component>
{/if}
