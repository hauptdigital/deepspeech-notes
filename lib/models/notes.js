const { ObjectID } = require('mongodb');
const { getCollection } = require('../database/database');

const collectionName = 'notes';

async function getNote(noteId) {
  const notesCollection = await getCollection(collectionName);
  const objectId = new ObjectID.createFromHexString(noteId);
  const note = await notesCollection.findOne({ _id: objectId });
  if (!note) {
    throw new Error('Cannot find this note');
  }
  return note;
}

async function getNotes(query) {
  const notesCollection = await getCollection(collectionName);
  const notes = await notesCollection.find(query).toArray();
  return notes;
}

async function setNote(note) {
  const notesCollection = await getCollection(collectionName);

  const noteContent = {
    title: note.noteTitle,
    content: note.noteContent.text,
  };

  // Create new note
  const result = await notesCollection.insertOne(noteContent);
  return result.insertedId;
}

exports.getNote = getNote;
exports.getNotes = getNotes;
exports.setNote = setNote;
