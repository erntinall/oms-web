const BASE_URL = 'http://3.130.252.18:5000';

function deleteRecord(endpoint, id) {
  return fetch(`${BASE_URL}/${endpoint}/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

export default {
  deleteRecord,
};
