const { Router } = require('express');
const { getNote, getNotes, setNote } = require('../models/notes');

const router = Router();

router.get('/:id', async (request, response) => {
  try {
    const noteId = request.params.id;
    console.log(noteId);
    const note = await getNote(noteId);
    return response.json(note);
  } catch (error) {
    console.error(error);
    return response.status(404).end('Error');
  }
});

router.get('/', async (request, response) => {
  try {
    const notes = await getNotes();
    return response.json(notes);
  } catch (error) {
    console.error(error);
    return response.status(404).end('Error');
  }
});

router.post('/', async (request, response) => {
  try {
    const id = await setNote(request.body);
    return response.json(id);
  } catch (error) {
    console.error(error);
    response.status(400).end('Error');
  }
});

module.exports = router;
