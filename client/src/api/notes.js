export function getNote(noteId) {
  return fetch(`/api/notes/${noteId}`, {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json());
}

export function getNotes(searchQuery) {
  return fetch(`/api/notes/?q=${searchQuery}`, {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
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
    },
    body: JSON.stringify(note),
  }).then((response) => response.json());
}

export function updateNote(note, noteId) {
  return fetch(`/api/notes/${noteId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  }).then((response) => response.json());
}
