const express = require("express");
const mongoose = require("mongoose");
const app = express();
const config = require('./config/index')
const port = process.env.PORT || config.port

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, token"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    next();
});

mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to database successfully"))
    .catch(console.log)

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})

console.log(config)

app.use(express.json());
app.use("/api/users", require("./routes/api/controllers/users"));
app.use("/api/movies", require("./routes/api/controllers/movies"));
app.use("/api/tickets", require("./routes/api/controllers/tickets"));
app.use("/api/movies", require("./routes/api/controllers/dates"));
app.use("/api/cinemas", require("./routes/api/controllers/cinemas"));
app.use("/api/promotions", require('./routes/api/controllers/promotions'));
app.use("/api/posters", require('./routes/api/controllers/posters'));