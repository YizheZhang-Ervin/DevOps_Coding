const { NodeSSH } = require('node-ssh')
const configJson = require("./config.json")

const ssh = new NodeSSH()

// 单命令
let runSingle = (command, paramList, nowPath) => {
    ssh.connect(conf).then(() => {
        // ssh.execCommand('ls -la', { cwd: '/home' }).then((result) => {
        //     console.log('STDOUT: ' + result.stdout)
        //     console.log('STDERR: ' + result.stderr)
        // })
        // 如：'ls', ['-al'],/home
        ssh.exec(command, paramList, {
            cwd: nowPath,
            options: { pty: true },
            onStdout(chunk) {
                console.log('OK$: ', chunk.toString('utf8'))
            },
            onStderr(chunk) {
                console.log('ERR$: ', chunk.toString('utf8'))
            },
        })
    })
}

// 多命令promise
let runByPromise = (command, nowPath) => {
    return new Promise((resolve, reject) => {
        ssh.execCommand(command, { cwd: nowPath })
            .then(result => {
                if (result.stdout) {
                    resolve(result.stdout);
                }
                if (result.stderr) {
                    reject(result.stderr);
                    process.exit(1);
                }
            })
            .catch(err => {
                reject(err);
            });
    });
}

// 执行多命令promise
let runMultiple = (conenctConfig) => {
    ssh.connect(conenctConfig).then(() => {
        let needPath = "/home"
        const commands = [`ls -al`, 'pwd'];
        const promises = [];
        for (let i = 0; i < commands.length; i += 1) {
            promises.push(runByPromise(commands[i], needPath));
        }
        Promise.all(promises).then((res) => {
            console.log(`SUCCESS:${res}`)
        }).catch(err => {
            console.log(`FAILED:${err}`)
            process.exit(0)
        });
    }).catch(err => {
        console.log(`Connect Failed: ${err}`)
    })
}

runMultiple(configJson)