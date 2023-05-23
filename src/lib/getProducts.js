import fetch from 'node-fetch'
import { getTokenCollected } from './getToken.js'
import {
  createBaseURL,
  createOptionsRequest,
  transformJson
} from './utils.js'

export async function getCatalog(merchantUUID) {
  let apiToken = await getTokenCollected()
  let options = await createOptionsRequest(apiToken)
  let ifoodAPIRequest = await createBaseURL(merchantUUID)

  let response = fetch(ifoodAPIRequest, options)
    .then(res => res.json())
    .then(json => json['data'])
    .catch(err => {
      console.error('error:' + err)
      return null
    })


  return response
}
