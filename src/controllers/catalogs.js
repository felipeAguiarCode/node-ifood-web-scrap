// import { catalogService as service } from '../services/catalog-service.js'
import { getCatalog } from '../lib/getProducts.js'

export async function getCatalogs(req, res) {

  const { uuid } = req.body

  console.log(uuid)

  try {
    const response = await getCatalog(uuid)

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