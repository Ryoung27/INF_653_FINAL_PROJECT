// Ronnie, this is important. Whatever our web application domain will access this domain server.
//Where ever we host our front-end project we want our domain in this whitelist.
const whitelist = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5500', 
    'http://localhost:3500'
];
const corsOptions = {
    origin: (origin, callback) => {
        //Ronnie, || !origin is for development only
        if (whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;