const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const secretSantaRoutes = require('./routes/secretSanta');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/api/secret-santa', secretSantaRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
