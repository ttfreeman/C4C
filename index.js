const app = require("./app");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("C4C app listening on " + PORT));
