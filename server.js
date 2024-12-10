const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const csvWriter = createCsvWriter({
    path: 'database.csv',
    header: [
        { id: 'name', title: 'Name' },
        { id: 'email', title: 'Email' },
        { id: 'phone', title: 'Phone' },
        { id: 'gender', title: 'Gender' },
        { id: 'dob', title: 'Date of Birth' },
        { id: 'address', title: 'Address' }
    ],
    append: true
});

app.post('/register', (req, res) => {
    const user = [
        {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            dob: req.body.dob,
            address: req.body.address
        }
    ];

    csvWriter.writeRecords(user)
        .then(() => {
            res.send('User Registered successfully.');
        });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
