
const FETCH_OPTS = {
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'user-agent': 'NotSoRare/1.0 Pepe',
      'content-type': 'application/json'
    },
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // *manual, follow, error
    referrer: 'no-referrer' // *client, no-referrer
}

export { FETCH_OPTS }
export default FETCH_OPTS
