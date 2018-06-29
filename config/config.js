const currentEnv = process.env.NODE_ENV; 
const config = require('./config.json');

const envConfig = config[currentEnv];

Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
});