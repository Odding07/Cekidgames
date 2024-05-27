const { default: axios } = require('axios');
const fetch = require('node-fetch');

const elitediasServices = async (game, id = null, zone = null) => {
   let filteredZone = zone ? game?.dropdown.filter((a) => zone == a.zoneId) : null;

   // const { data, error } = await axios.post('https://api.elitedias.com/checkid', {
   //    game: game.game,
   //    userid: id,
   //    serverid: filteredZone ? filteredZone[0]?.name : null,
   // });

   // if (error) return { code: 500, status: false, message: 'Internal Server Error, Silahkan coba lagi nanti' };
   // if (data.valid == 'valid') {
   //    return {
   //       code: 200,
   //       status: true,
   //       message: 'ID Berhasil Ditemukan',
   //       data: {
   //          user_id: id,
   //          username: data.name,
   //          zone: zone,
   //          region: data.region ? { region: data.region } : {},
   //       },
   //    };
   // } else {
   //    return {
   //       code: 404,
   //       status: false,
   //       message: 'ID Tidak Ditemukan',
   //    };
   // }

   const checkElite = await fetch('https://api.elitedias.com/checkid', {
      method: 'POST',
      headers: {
         Accept: '*/*',
         'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
         'X-Reqquested-WIth': 'XMLHttpRequest',
         Referer: 'https://elitedias.com/',
         Origin: 'https://elitedias.com',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         game: game.game,
         userid: id,
         serverid: filteredZone ? filteredZone[0]?.name : null,
      }),
   });

   try {
      const checkEliteJson = await checkElite.json();

      let region = checkEliteJson.region ? { region: checkEliteJson.region } : {};

      if (checkEliteJson.valid == 'valid') {
         return {
            code: 200,
            status: true,
            message: 'ID Berhasil Ditemukan',
            data: {
               user_id: id,
               username: checkEliteJson.name,
               zone: zone,
               ...region,
            },
         };
      } else {
         return {
            code: 404,
            status: false,
            message: 'ID Tidak Ditemukan',
         };
      }
   } catch (e) {
      console.log(e.message);
      return {
         code: 500,
         status: false,
         message: 'Internal Server Error, Silahkan coba lagi nanti',
      };
   }
};

module.exports = elitediasServices;
