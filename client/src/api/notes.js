export function getNote(noteId) {
  return fetch(`/api/notes/${noteId}`, {
    method: 'GET',
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json());
}

export function getNotes() {
  return fetch(`/api/notes/`, {
    method: 'GET',
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json());
}

export function postNote(note) {
  return fetch(`/api/notes/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Encrypt: 'true',
    },
    body: JSON.stringify(note),
  }).then((response) => response.json());
}

export function updateNote(note, noteId) {
  return fetch(`/api/notes/${noteId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Encrypt: 'true',
    },
    body: JSON.stringify(note),
  }).then((response) => response.json());
}
