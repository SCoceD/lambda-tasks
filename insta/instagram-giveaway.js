const fsa = require("fs").promises;
const fs = require("fs");

let arrOfSetsFromAllFile;
let setUniqNames;

const uniqueValues = async () => {
    setUniqNames = new Set();
    const path = __dirname + '/files/';
    const start = new Date().getTime();
    const fileNames = fs.readdirSync(path);

    await Promise.all(fileNames.map((item) => fsa.readFile(path + item, 'utf8')
        .then(data => data.split('\n').forEach(element => setUniqNames.add(element))))
    ).then(() => {
        const end = new Date().getTime();

        console.log('Уникальных словосочетаний: ' + setUniqNames.size);
        console.log('Time of work: ' + (end - start));
    })
}

const existInTwentyFiles = async () => {
    arrOfSetsFromAllFile = []
    setUniqNames = new Set()
    const path = __dirname + '/files/';
    const start = new Date().getTime();
    let fileNames = fs.readdirSync(path);
    let twentyOrMore = 0;
    await parseNames();
    setUniqNames.forEach(elementUniq => {
        let counter = 0;
        arrOfSetsFromAllFile.forEach(elementInSets => {
            if (elementInSets.has(elementUniq)) {
                counter++;
                if (counter === fileNames.length) {
                    twentyOrMore++;
                }
            }
        })
    })
    console.log('Словосочетаний, которые есть во всех 20 файлах: ' + twentyOrMore);
    console.log('Time of work: ' + (new Date().getTime() - start));
}

const existInAtLeastTen = async () => {
    arrOfSetsFromAllFile = []
    setUniqNames = new Set()
    const start = new Date().getTime();
    let tenOrMore = 0;
    await parseNames();
    setUniqNames.forEach(elementUniq => {
        let counter = 0;
        arrOfSetsFromAllFile.forEach(elementInSets => {
            if (elementInSets.has(elementUniq)) {
                counter++;
                if (counter === 10) {
                    tenOrMore++;
                }
            }
        })
    })
    console.log('Словосочетаний, которые есть, как минимум, в десяти файлах: ' + tenOrMore);
    console.log('Time of work: ' + (new Date().getTime() - start));
}

async function parseNames() {
    const path = __dirname + '/files/'
    let fileNames = fs.readdirSync(path);
    let dataPromises = [];
    fileNames.forEach(item => {
        const setOfName = new Set();
        dataPromises.push(fsa.readFile(path + item, 'utf8')
            .then(data => data.split('\n').forEach(element => {
                setOfName.add(element);
                setUniqNames.add(element);
            })));
        arrOfSetsFromAllFile.push(setOfName)
    });
    await Promise.all(dataPromises);
}

(async function () {
    await uniqueValues()
    await existInTwentyFiles();
    await existInAtLeastTen();
}())
