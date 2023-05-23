async function createBaseURL(UUID) {
  return `https://wsloja.ifood.com.br/ifood-ws-v3/v1/merchants/${UUID}/catalog?category_items_size=1`
}

async function createOptionsRequest(token) {
  return {
    method: 'GET',
    headers: {
      Session_token: token,
      cookie: 'session_token=; '
    }
  }
}

async function transformJson(json) {
  const transformedJson = JSON.parse(JSON.stringify(json))

  transformedJson.data.menu.forEach((menuItem) => {
    const menuName = menuItem.name

    menuItem.itens.forEach((item) => {
      item.menuName = menuName
      item.id = item.id || null
      item.description = item.description || null
      item.details = item.details || null
      item.unitPrice = item.unitPrice || null
      delete item.needChoices
      delete item.choices
      delete item.unitMinPrice
      delete item.sellingOption
      delete item.ean
    })
  })

  return transformedJson;
}


export {
  createBaseURL,
  createOptionsRequest,
  transformJson
}