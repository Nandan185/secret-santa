const csv = require('csv-parser');
const fs = require('fs');
const { parse } = require('json2csv');

function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

function generateCSV(data) {
    try {
        return parse(data);
    } catch (error) {
        throw new Error('Error generating CSV');
    }
}

module.exports = { parseCSV, generateCSV };
