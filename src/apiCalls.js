export const getData = (dataSet) => {
  return fetch(`http://localhost:3001/api/v1/${dataSet}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(`${dataSet} error: ${err}`))
}