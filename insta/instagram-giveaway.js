const fsa = require("fs").promises;
const fs = require("fs");

const arrOfSetsFromAllFile = [];
const setUniqNames = new Set();

const uniqueValues = async () => {
    const path = __dirname + '/files/';
    const start = new Date().getTime();
    let fileNames = fs.readdirSync(path);
    // for (let i = 0; i < fileNames.length; i++) {
    // let data = fsa.readFileSync(__dirname + 'out' + i + '.txt', 'utf8');
    // data.split('\n').forEach(element => setUniqNames.add(element))}
    await Promise.all(fileNames.map((item) => fsa.readFile(path + item, 'utf8')
        .then(data => data.split('\n').forEach(element => setUniqNames.add(element))))
    );
console.log('Уникальных словосочетаний: ' + setUniqNames.size)
console.log('Time of work: ' + (new Date().getTime() - start));
}

const existInTwentyFiles = async () => {
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
    for (let i = 0; i < fileNames.length; i++) {
        const setOfName = new Set();
        dataPromises.push(fsa.readFile(path + fileNames[i], 'utf8')
            .then(data => data.split('\n').forEach(element => {
                setOfName.add(element);
                setUniqNames.add(element);
            })));
        arrOfSetsFromAllFile.push(setOfName);
    }
    await Promise.all(dataPromises);
}

(async () => {
    await uniqueValues()
    await existInTwentyFiles();
    await existInAtLeastTen();
})()
