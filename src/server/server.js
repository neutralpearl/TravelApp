const app = require("../client/js/app");

// Setup Server
const port = 3000;
const server = app.listen(port, () => {console.log(`Server running on localhost: ${port}`)});