const mongoose = require('mongoose');

const options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
};

mongoose.connect(`mongodb+srv://test:test@cluster-yh-subtb.mongodb.net/ManPaCook?retryWrites=true&w=majority`,
    options,
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("<--- DB CONNECT OK --->")
        }
    }
);

module.exports = mongoose;