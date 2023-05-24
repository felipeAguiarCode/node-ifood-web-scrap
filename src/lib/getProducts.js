import axios from 'axios'
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

  try {
    let response = await axios.get(ifoodAPIRequest, options)
    return response.data
  } catch (err) {
    console.error('error: ' + err)
    return null
  }
}