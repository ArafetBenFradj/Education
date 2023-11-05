// import app file
const expressApp = require ("./backend/app");
// Make express application listening on http://localhost:3000
expressApp.listen(3000 , ()=>{
    console.log(" Express Application is Listening on PORT 3000 ...")
});