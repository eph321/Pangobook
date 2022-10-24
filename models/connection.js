const mongoose = require("mongoose");

const options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

mongoose.connect(`mongodb+srv://franck:123TestProjet@cluster0.u2ixh.mongodb.net/Pangolin-app?retryWrites=true&w=majority`,
    options,
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Connecté à MongoDb")
        }
    }
)

module.exports = mongoose