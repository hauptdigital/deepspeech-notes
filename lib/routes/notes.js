const { Router } = require('express');
const { getNote, getNotes, postNote, updateNote } = require('../models/notes');

const router = Router();

router.get('/:id', async (request, response) => {
  try {
    const noteId = request.params.id;
    const note = await getNote(noteId);
    return response.json(note);
  } catch (error) {
    console.error(error);
    return response.status(404).end('Error');
  }
});

router.get('/', async (request, response) => {
  try {
    const searchQuery = request.query.q;
    const notes = await getNotes(searchQuery);
    return response.json(notes);
  } catch (error) {
    console.error(error);
    return response.status(404).end('Error');
  }
});

router.post('/', async (request, response) => {
  try {
    const id = await postNote(request.body);
    return response.json(id);
  } catch (error) {
    console.error(error);
    response.status(400).end('Error');
  }
});

router.patch('/:id', async (request, response) => {
  try {
    const noteId = request.params.id;
    const id = await updateNote(request.body, noteId);
    return response.json(id);
  } catch (error) {
    console.error(error);
    response.status(400).end('Error');
  }
});

module.exports = router;
