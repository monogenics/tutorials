
import requestService from './requestService'

export default async function(paramsInput, payloadInput={method: "GET", },urlInput=null) {

  const encodedParameters = (paramsInput.load_all !== 'True')
    ? encodeURIComponent('False')
    : encodeURIComponent('True')
  
  const url = (urlInput === null) 
    ? `https://pre-trained-models-dot-word2vec-01.appspot.com/pretrained_get_all_info?load_all=${encodedParameters}`
    : urlInput


  return await requestService(url, payloadInput)

  //return await Object.keys(json)
  //Object.entries(load_info).map(item => console.log(item[0]))


}