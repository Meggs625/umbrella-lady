import domUpdates from './domUpdates';

export const getData = (dataSet, modal) => {
  return fetch(`http://localhost:3001/api/v1/${dataSet}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => checkErrors(err, modal))
};

function checkErrors(err, modal) { 
  if (err) {
    domUpdates.renderErrorMessage(modal, 'network');  
  } 
}
