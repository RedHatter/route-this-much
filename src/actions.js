import { path, navigate } from './matcher.js'

export function link(node, url) {
  const unsubscribe = path.subscribe(o => {
    const href = url || node.getAttribute('href')
    const part = href.startsWith('/') ? o : o.substring(o.lastIndexOf('/') + 1)
    if (part == href)
      node.classList.add('active')
    else
      node.classList.remove('active')

    if (part != href && part.startsWith(href))
      node.classList.add('partial')
    else
      node.classList.remove('partial')
  })

  function onClick (e) {
    e.preventDefault()
    navigate(url || node.getAttribute('href'))
  }

  node.addEventListener('click', onClick)

  return {
    update(_url) {
      url = _url
    },

    destroy() {
      unsubscribe()
      node.removeEventListener('click', onClick)
    }
  };
}
