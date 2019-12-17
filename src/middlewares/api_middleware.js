import nodeFetch from 'node-fetch'

// TODO: Add common authz logic here
const request = async ({ url = '', method = 'GET' }) => {
  const options = {
    method,
    headers: { 'Accept': 'application/json' }
  }

  try {
    const res = await nodeFetch(url, options)
    const jsonData = await res.json()

    return jsonData
  } catch (err) {
    throw err.message
  }
}

export {
  request as default
}
