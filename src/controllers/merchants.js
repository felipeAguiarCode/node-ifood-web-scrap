import { merchantService as service } from '../services/merchant-services.js'


export async function getMerchants(req, res) {

  try {
    const response = await service()

    return res.status(200).json({
      sucess: true,
      data: response
    })

  } catch (error) {

    return res.status(400).json({
      sucess: false,
      error: error.response
        ? error.response.data
        : 'There was an inssue on the server'
    })

  }
}