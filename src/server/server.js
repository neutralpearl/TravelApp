const app = require("../client/js/app");

// Setup Server
const port = 3000;
const server = app.listen(process.env.PORT || port, () => {console.log(`Server running on port ${process.env.PORT || port}`)});