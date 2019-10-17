const config = require(process.env.NODE_ENV ? `./${process.env.NODE_ENV}.json` : './development.json');


export default config;

