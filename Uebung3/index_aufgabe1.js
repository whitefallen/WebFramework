const fs = require('fs');

const logWithTime = (logText, counter) => {
    console.log(logText, counter, new Date().toLocaleString());
}

const immediateFunction = (counter) => {
    logWithTime("Immediate", counter);
}
const timeOutFunction = (counter) => {
    logWithTime("Timeout", counter)
}
const doHeavy = () => {
    for(let i = 0; i < 3000000000; i++) {
    }
}
const readFile = (fileName, counter) => {
    let readStream = fs.createReadStream(fileName);
    readStream.on("open", () => {
        doHeavy();
        logWithTime('Open', counter)
    })
    readStream.on('data', () => {
        doHeavy();
        logWithTime('Data', counter)
        if(counter%3 === 0) {
            setImmediate(() => {
                immediateFunction(counter)
            })
        }
    })
    readStream.on('end', () => {
        doHeavy();
        logWithTime('End', counter)
    })
    readStream.on('close',() => {
        doHeavy();
        logWithTime('Close', counter)
    })
}
setTimeout(() => timeOutFunction(1), 100);
setTimeout(() => timeOutFunction(2), 3000);
readFile('./index_aufgabe1.js',1);
readFile('./index_aufgabe1.js',2);
readFile('./index_aufgabe1.js',3);
readFile('./index_aufgabe1.js',4);
readFile('./index_aufgabe1.js',5);
