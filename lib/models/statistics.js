const { getCollection } = require('../database/database');
const { getAllNotes } = require('./notes');
const { getNumberOfWords } = require('../utils/utils');

const collectionName = 'notes';

async function getStatistics() {
  const statistics = {};

  // Get number of notes
  statistics.noteCount = await getDocumentCount();

  // Get number of words
  statistics.numberOfWords = await getNumberOfWordsInAllDocuments();

  return statistics;
}

async function getDocumentCount() {
  const notesCollection = await getCollection(collectionName);
  const documentCount = await notesCollection.countDocuments({});
  return documentCount;
}

async function getNumberOfWordsInAllDocuments() {
  const notes = await getAllNotes();
  let numberOfWords = 0;
  notes.map((note) => {
    if (note.title) {
      numberOfWords = numberOfWords + getNumberOfWords(note.title);
    }
    if (note.content) {
      numberOfWords = numberOfWords + getNumberOfWords(note.content);
    }

    numberOfWords++;
  });

  return numberOfWords;
}

exports.getStatistics = getStatistics;
