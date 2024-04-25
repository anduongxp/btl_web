const user = require('../routes/accountRouter');
function route(app){
    app.use('/home', user);
}
module.exports = route;