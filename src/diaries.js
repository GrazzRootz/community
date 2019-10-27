// diaries are essentially blog posts
// we will support markdown
const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

const dataPath = path.resolve('./data/diaries.json');

function readData() {
    return new Promise((res, rej) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (!err) {
                res(JSON.parse(data));
            } else {
                rej(err);
            }
        });
    });
}

function writeData(data) {
    return new Promise((res, rej) => {
        fs.writeFile(dataPath, data, 'utf8', (err, response) => {
            if (!err) {
                res(response);
            } else {
                rej(err);
            }
        });
    });
}

function appendDiary(entry) {
    return readData().then(data =>  
        writeData(JSON.stringify({
            entries: data.entries.concat(entry);
        }))
    );
}

function entry({ title, user, date, body, garden }) {
    return {
        id: uuid(),
        title,
        user,
        date,
        body,
        garden
    };
}

function allEntries() {
    return readData();
}

module.exports = {
    entry,
    allEntries,
    appendDiary,
}
