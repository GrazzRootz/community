const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

const dataPath = path.resolve('./data/events.json');

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

function appendEvents(events) {
    return readData().then(data => {
        const es = data.events.concat(events);
        return writeData(JSON.stringify({
            events: es
        }));
    });
}

function event({ title, user, date, desc, garden }) {
    return {
        id: uuid(),
        title,
        user,
        date,
        desc,
        garden
    };
}

function allEvents() {
    return readData().then(x => {
        return x;
    });
}

module.exports = {
    event,
    allEvents,
    appendEvents,
}
