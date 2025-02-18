const { parseCSV, generateCSV } = require('../utils/csvParser');
const fs = require('fs');
const path = require('path');

async function assignSecretSanta(employeesFile) {
    try {
        const employees = await parseCSV(employeesFile);

        const availableRecipients = [...employees];
        const assignments = [];

        for (const giver of employees) {
            let potentialRecipients = availableRecipients.filter(r => r.Employee_EmailID !== giver.Employee_EmailID);
            
            if (potentialRecipients.length === 0) {
                throw new Error('Cannot generate a valid Secret Santa assignment. Please check the input data.');
            }
            
            const recipientIndex = Math.floor(Math.random() * potentialRecipients.length);
            const recipient = potentialRecipients.splice(recipientIndex, 1)[0];
            
            assignments.push({
                Employee_Name: giver.Employee_Name,
                Employee_EmailID: giver.Employee_EmailID,
                Secret_Child_Name: recipient.Employee_Name,
                Secret_Child_EmailID: recipient.Employee_EmailID
            });
        }

        return assignments;
    } catch (error) {
        throw error;
    }
}

async function generateSecretSantaCSV(req, res) {
    try {
        if (!req.files || !req.files.employees) {
            return res.status(400).json({ error: 'Employee CSV file is required' });
        }

        const employeesFile = path.join(__dirname, '../uploads/employees.csv');
        await req.files.employees.mv(employeesFile);

        const assignments = await assignSecretSanta(employeesFile);
        const csvData = generateCSV(assignments);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=secret_santa.csv');
        res.status(200).send(csvData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { assignSecretSanta, generateSecretSantaCSV };
