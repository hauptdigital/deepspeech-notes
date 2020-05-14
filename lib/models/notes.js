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

async function getNotes(searchQuery) {
  const textSearchQuery =
    searchQuery.length > 0 ? { $text: { $search: searchQuery } } : {};

  const notesCollection = await getCollection(collectionName);
  const notes = await notesCollection
    .find(textSearchQuery)
    .project({ score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } })
    .toArray();
  return notes;
}

async function getAllNotes() {
  const notesCollection = await getCollection(collectionName);
  const notes = await notesCollection.find().toArray();
  return notes;
}

async function postNote() {
  const notesCollection = await getCollection(collectionName);
  // Create new note
  const result = await notesCollection.insertOne({});
  return result.insertedId;
}

async function updateNote(note, noteId) {
  const notesCollection = await getCollection(collectionName);
  const objectId = new ObjectID.createFromHexString(noteId);
  const result = await notesCollection.updateOne(
    { _id: objectId },
    { $set: note }
  );
  return result;
}

exports.getNote = getNote;
exports.getNotes = getNotes;
exports.getAllNotes = getAllNotes;
exports.postNote = postNote;
exports.updateNote = updateNote;
