const { request, response } = require('express')
const exp = require('express')
const app = exp()
const path = require('path')
app.listen(3500, () => console.log('server listening on port 3500..'))
const cors = require('cors');


app.use(cors());
app.use(exp.static(path.join(__dirname, './build')))
const committeeApp = require('./APIs/committeesAPI');
app.use('/committee-api', committeeApp);

const userApp = require('./APIs/usersAPI');
app.use('/user-api', userApp);

const bookingApp = require('./APIs/bookingAPI');
app.use('/booking-api', bookingApp);


const mclient = require('mongodb').MongoClient;

mclient.connect('mongodb://127.0.0.1')
    .then((dbRef) => {
        const dbObj = dbRef.db('event')
        const committeeCollectionObj = dbObj.collection('committeeCollection')
        const usersCollectionObj = dbObj.collection('userscollection')
        const bookingCollectionObj = dbObj.collection('bookingCollection')

        app.set('committeeCollectionObj', committeeCollectionObj);
        app.set('usersCollectionObj', usersCollectionObj);
        app.set('bookingCollectionObj', bookingCollectionObj);


        console.log('DB connection Success')
    })
    .catch((err) => console.log('DB error: ' + err))


const pageRefresh = (request, response, next) => {
    response.sendFile(path.join(__dirname, './build/index.html'))
}
app.use('*', pageRefresh)

const invalidPathMiddleware = (request, response, next) => {
    response.send({ message: 'Invalid path' });
}
app.use(invalidPathMiddleware)

const errhandlingMiddleware = (error, request, response, next) => {
    response.send({ message: error.message });
}
app.use(errhandlingMiddleware);
