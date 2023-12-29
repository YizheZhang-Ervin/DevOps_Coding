const workerpool = require('workerpool');

const initPool = (pathToFile) => {
    // pathToFile：如 (__dirname + '/goWorker.js')
    const pool = workerpool.pool(pathToFile)
    return pool
}

const startByExec = (pool, funcName, paramVal, okFunc, errFunc) => {
    // okFunc: 如 (result) => {}
    // errFunc: 如 (err) => {}
    pool.exec(funcName, paramVal)
        .then(okFunc)
        .catch(errFunc)
        .then(() => { pool.terminate() });
}

const startByProxy = (pool, callFunc, okFunc, errFunc) => {
    // callFunc: 如 (worker) => {return worker.func1("xxParam")}
    // okFunc: 如 (result) => {}
    // errFunc: 如 (err) => {}
    pool.proxy()
        .then(callFunc)
        .then(okFunc)
        .catch(errFunc)
        .then(() => { pool.terminate() });
}

module.exports = {
    initPool, startByExec, startByProxy
}

