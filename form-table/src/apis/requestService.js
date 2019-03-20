export default async function (url='', payload={}) {

    const data = await (await (fetch(url,payload)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log('Error: ', err)
      })
    ))
    return data
}
