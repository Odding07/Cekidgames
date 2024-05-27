const dataAU2mobile = require('./au2mobile.json');
const dataCoda = require('./codashop.json');
const dataDunia = require('./duniagames.json');
const dataRoglobal = require('./roglobal.json');
const dataJollymax = require('./jollymax.json');
const dataElite = require('./elitedias.json');
const dataTopupLive = require('./topuplive.json');
const dataBosBos = require('./bosbosgame.json');

let oldDataGame = [
   ...dataCoda.data,
   ...dataDunia.data,
   ...dataAU2mobile.data,
   ...dataRoglobal.data,
   ...dataJollymax.data,
   ...dataElite.data,
   ...dataTopupLive.data,
   ...dataBosBos.data,
];

// Fillter data agar tidak duplikat slugnya
const dataGame = [...new Map(oldDataGame.map((m) => [m.slug, m])).values()];

module.exports = { dataGame };
