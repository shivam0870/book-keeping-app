const mongoose = require('mongoose');
// const url = process.env.MONGODB_URL;

const dbConnect = () => {
    
mongoose.connect(process.env.MONGODB_URL, {
    // useFindAndModify : true,
    useUnifiedTopology : true,
    // useCreateIndex : true,
    useNewUrlParser : true,
}).then(()=> console.log('Database Connected')).catch(err => console.log(err));
}

module.exports = dbConnect;