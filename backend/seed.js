require("dotenv").config();

const bcrypt = require("bcrypt");
const { pool, createTables } = require("./src/config/database");

const saltRounds = 10;
const plainPassword = "password123";

/**
 * Embaralha um array in-place usando o algoritmo Fisher-Yates.
 * @param {Array} array O array a ser embaralhado.
 */
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // Enquanto ainda houver elementos para embaralhar.
  while (currentIndex !== 0) {
    // Pega um elemento restante.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // E troca com o elemento atual.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

async function seedDatabase() {
  let connection;
  try {
    // Garante que as tabelas existem antes de continuar
    await createTables();

    connection = await pool.getConnection();

    // Limpa as tabelas para evitar duplicatas ao rodar o seed várias vezes
    // Usamos TRUNCATE para resetar os contadores de AUTO_INCREMENT
    await connection.query("TRUNCATE TABLE User");
    await connection.query("TRUNCATE TABLE Pokemon");

    // Gera o hash da senha
    const hash = await bcrypt.hash(plainPassword, saltRounds);

    // Insere um usuário de exemplo
    const userInsertQuery =
      "INSERT INTO User (email, password_hash) VALUES (?, ?)";
    await connection.query(userInsertQuery, ["test@example.com", hash]);

    // Insere os 300 Pokémon
    const pokemonData = [
      {"id":1,"name":"bulbasaur","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"poison"}}]}},
      {"id":2,"name":"ivysaur","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"poison"}}]}},
      {"id":3,"name":"venusaur","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"poison"}}]}},
      {"id":4,"name":"charmander","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":5,"name":"charmeleon","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":6,"name":"charizard","data":{"types":[{"type":{"name":"fire"}},{"type":{"name":"flying"}}]}},
      {"id":7,"name":"squirtle","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":8,"name":"wartortle","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":9,"name":"blastoise","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":10,"name":"caterpie","data":{"types":[{"type":{"name":"bug"}}]}},
      {"id":11,"name":"metapod","data":{"types":[{"type":{"name":"bug"}}]}},
      {"id":12,"name":"butterfree","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"flying"}}]}},
      {"id":13,"name":"weedle","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"poison"}}]}},
      {"id":14,"name":"kakuna","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"poison"}}]}},
      {"id":15,"name":"beedrill","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"poison"}}]}},
      {"id":16,"name":"pidgey","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"flying"}}]}},
      {"id":17,"name":"pidgeotto","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"flying"}}]}},
      {"id":18,"name":"pidgeot","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"flying"}}]}},
      {"id":19,"name":"rattata","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":20,"name":"raticate","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":21,"name":"spearow","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"flying"}}]}},
      {"id":22,"name":"fearow","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"flying"}}]}},
      {"id":23,"name":"ekans","data":{"types":[{"type":{"name":"poison"}}]}},
      {"id":24,"name":"arbok","data":{"types":[{"type":{"name":"poison"}}]}},
      {"id":25,"name":"pikachu","data":{"types":[{"type":{"name":"electric"}}]}},
      {"id":26,"name":"raichu","data":{"types":[{"type":{"name":"electric"}}]}},
      {"id":27,"name":"sandshrew","data":{"types":[{"type":{"name":"ground"}}]}},
      {"id":28,"name":"sandslash","data":{"types":[{"type":{"name":"ground"}}]}},
      {"id":29,"name":"nidoran-f","data":{"types":[{"type":{"name":"poison"}}]}},
      {"id":30,"name":"nidorina","data":{"types":[{"type":{"name":"poison"}}]}},
      {"id":31,"name":"nidoqueen","data":{"types":[{"type":{"name":"poison"}},{"type":{"name":"ground"}}]}},
      {"id":32,"name":"nidoran-m","data":{"types":[{"type":{"name":"poison"}}]}},
      {"id":33,"name":"nidorino","data":{"types":[{"type":{"name":"poison"}}]}},
      {"id":34,"name":"nidoking","data":{"types":[{"type":{"name":"poison"}},{"type":{"name":"ground"}}]}},
      {"id":35,"name":"clefairy","data":{"types":[{"type":{"name":"fairy"}}]}},
      {"id":36,"name":"clefable","data":{"types":[{"type":{"name":"fairy"}}]}},
      {"id":37,"name":"vulpix","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":38,"name":"ninetales","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":39,"name":"jigglypuff","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"fairy"}}]}},
      {"id":40,"name":"wigglytuff","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"fairy"}}]}},
      {"id":41,"name":"zubat","data":{"types":[{"type":{"name":"poison"}},{"type":{"name":"flying"}}]}},
      {"id":42,"name":"golbat","data":{"types":[{"type":{"name":"poison"}},{"type":{"name":"flying"}}]}},
      {"id":43,"name":"oddish","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"poison"}}]}},
      {"id":44,"name":"gloom","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"poison"}}]}},
      {"id":45,"name":"vileplume","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"poison"}}]}},
      {"id":46,"name":"paras","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"grass"}}]}},
      {"id":47,"name":"parasect","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"grass"}}]}},
      {"id":48,"name":"venonat","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"poison"}}]}},
      {"id":49,"name":"venomoth","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"poison"}}]}},
      {"id":50,"name":"diglett","data":{"types":[{"type":{"name":"ground"}}]}},
      {"id":51,"name":"dugtrio","data":{"types":[{"type":{"name":"ground"}}]}},
      {"id":52,"name":"meowth","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":53,"name":"persian","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":54,"name":"psyduck","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":55,"name":"golduck","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":56,"name":"mankey","data":{"types":[{"type":{"name":"fighting"}}]}},
      {"id":57,"name":"primeape","data":{"types":[{"type":{"name":"fighting"}}]}},
      {"id":58,"name":"growlithe","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":59,"name":"arcanine","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":60,"name":"poliwag","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":61,"name":"poliwhirl","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":62,"name":"poliwrath","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"fighting"}}]}},
      {"id":63,"name":"abra","data":{"types":[{"type":{"name":"psychic"}}]}},
      {"id":64,"name":"kadabra","data":{"types":[{"type":{"name":"psychic"}}]}},
      {"id":65,"name":"alakazam","data":{"types":[{"type":{"name":"psychic"}}]}},
      {"id":66,"name":"machop","data":{"types":[{"type":{"name":"fighting"}}]}},
      {"id":67,"name":"machoke","data":{"types":[{"type":{"name":"fighting"}}]}},
      {"id":68,"name":"machamp","data":{"types":[{"type":{"name":"fighting"}}]}},
      {"id":69,"name":"bellsprout","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"poison"}}]}},
      {"id":70,"name":"weepinbell","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"poison"}}]}},
      {"id":71,"name":"victreebel","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"poison"}}]}},
      {"id":72,"name":"tentacool","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"poison"}}]}},
      {"id":73,"name":"tentacruel","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"poison"}}]}},
      {"id":74,"name":"geodude","data":{"types":[{"type":{"name":"rock"}},{"type":{"name":"ground"}}]}},
      {"id":75,"name":"graveler","data":{"types":[{"type":{"name":"rock"}},{"type":{"name":"ground"}}]}},
      {"id":76,"name":"golem","data":{"types":[{"type":{"name":"rock"}},{"type":{"name":"ground"}}]}},
      {"id":77,"name":"ponyta","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":78,"name":"rapidash","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":79,"name":"slowpoke","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"psychic"}}]}},
      {"id":80,"name":"slowbro","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"psychic"}}]}},
      {"id":81,"name":"magnemite","data":{"types":[{"type":{"name":"electric"}},{"type":{"name":"steel"}}]}},
      {"id":82,"name":"magneton","data":{"types":[{"type":{"name":"electric"}},{"type":{"name":"steel"}}]}},
      {"id":83,"name":"farfetchd","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"flying"}}]}},
      {"id":84,"name":"doduo","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"flying"}}]}},
      {"id":85,"name":"dodrio","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"flying"}}]}},
      {"id":86,"name":"seel","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":87,"name":"dewgong","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"ice"}}]}},
      {"id":88,"name":"grimer","data":{"types":[{"type":{"name":"poison"}}]}},
      {"id":89,"name":"muk","data":{"types":[{"type":{"name":"poison"}}]}},
      {"id":90,"name":"shellder","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":91,"name":"cloyster","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"ice"}}]}},
      {"id":92,"name":"gastly","data":{"types":[{"type":{"name":"ghost"}},{"type":{"name":"poison"}}]}},
      {"id":93,"name":"haunter","data":{"types":[{"type":{"name":"ghost"}},{"type":{"name":"poison"}}]}},
      {"id":94,"name":"gengar","data":{"types":[{"type":{"name":"ghost"}},{"type":{"name":"poison"}}]}},
      {"id":95,"name":"onix","data":{"types":[{"type":{"name":"rock"}},{"type":{"name":"ground"}}]}},
      {"id":96,"name":"drowzee","data":{"types":[{"type":{"name":"psychic"}}]}},
      {"id":97,"name":"hypno","data":{"types":[{"type":{"name":"psychic"}}]}},
      {"id":98,"name":"krabby","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":99,"name":"kingler","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":100,"name":"voltorb","data":{"types":[{"type":{"name":"electric"}}]}},
      {"id":101,"name":"electrode","data":{"types":[{"type":{"name":"electric"}}]}},
      {"id":102,"name":"exeggcute","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"psychic"}}]}},
      {"id":103,"name":"exeggutor","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"psychic"}}]}},
      {"id":104,"name":"cubone","data":{"types":[{"type":{"name":"ground"}}]}},
      {"id":105,"name":"marowak","data":{"types":[{"type":{"name":"ground"}}]}},
      {"id":106,"name":"hitmonlee","data":{"types":[{"type":{"name":"fighting"}}]}},
      {"id":107,"name":"hitmonchan","data":{"types":[{"type":{"name":"fighting"}}]}},
      {"id":108,"name":"lickitung","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":109,"name":"koffing","data":{"types":[{"type":{"name":"poison"}}]}},
      {"id":110,"name":"weezing","data":{"types":[{"type":{"name":"poison"}}]}},
      {"id":111,"name":"rhyhorn","data":{"types":[{"type":{"name":"ground"}},{"type":{"name":"rock"}}]}},
      {"id":112,"name":"rhydon","data":{"types":[{"type":{"name":"ground"}},{"type":{"name":"rock"}}]}},
      {"id":113,"name":"chansey","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":114,"name":"tangela","data":{"types":[{"type":{"name":"grass"}}]}},
      {"id":115,"name":"kangaskhan","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":116,"name":"horsea","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":117,"name":"seadra","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":118,"name":"goldeen","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":119,"name":"seaking","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":120,"name":"staryu","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":121,"name":"starmie","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"psychic"}}]}},
      {"id":122,"name":"mr-mime","data":{"types":[{"type":{"name":"psychic"}},{"type":{"name":"fairy"}}]}},
      {"id":123,"name":"scyther","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"flying"}}]}},
      {"id":124,"name":"jynx","data":{"types":[{"type":{"name":"ice"}},{"type":{"name":"psychic"}}]}},
      {"id":125,"name":"electabuzz","data":{"types":[{"type":{"name":"electric"}}]}},
      {"id":126,"name":"magmar","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":127,"name":"pinsir","data":{"types":[{"type":{"name":"bug"}}]}},
      {"id":128,"name":"tauros","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":129,"name":"magikarp","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":130,"name":"gyarados","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"flying"}}]}},
      {"id":131,"name":"lapras","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"ice"}}]}},
      {"id":132,"name":"ditto","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":133,"name":"eevee","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":134,"name":"vaporeon","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":135,"name":"jolteon","data":{"types":[{"type":{"name":"electric"}}]}},
      {"id":136,"name":"flareon","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":137,"name":"porygon","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":138,"name":"omanyte","data":{"types":[{"type":{"name":"rock"}},{"type":{"name":"water"}}]}},
      {"id":139,"name":"omastar","data":{"types":[{"type":{"name":"rock"}},{"type":{"name":"water"}}]}},
      {"id":140,"name":"kabuto","data":{"types":[{"type":{"name":"rock"}},{"type":{"name":"water"}}]}},
      {"id":141,"name":"kabutops","data":{"types":[{"type":{"name":"rock"}},{"type":{"name":"water"}}]}},
      {"id":142,"name":"aerodactyl","data":{"types":[{"type":{"name":"rock"}},{"type":{"name":"flying"}}]}},
      {"id":143,"name":"snorlax","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":144,"name":"articuno","data":{"types":[{"type":{"name":"ice"}},{"type":{"name":"flying"}}]}},
      {"id":145,"name":"zapdos","data":{"types":[{"type":{"name":"electric"}},{"type":{"name":"flying"}}]}},
      {"id":146,"name":"moltres","data":{"types":[{"type":{"name":"fire"}},{"type":{"name":"flying"}}]}},
      {"id":147,"name":"dratini","data":{"types":[{"type":{"name":"dragon"}}]}},
      {"id":148,"name":"dragonair","data":{"types":[{"type":{"name":"dragon"}}]}},
      {"id":149,"name":"dragonite","data":{"types":[{"type":{"name":"dragon"}},{"type":{"name":"flying"}}]}},
      {"id":150,"name":"mewtwo","data":{"types":[{"type":{"name":"psychic"}}]}},
      {"id":151,"name":"mew","data":{"types":[{"type":{"name":"psychic"}}]}},
      {"id":152,"name":"chikorita","data":{"types":[{"type":{"name":"grass"}}]}},
      {"id":153,"name":"bayleef","data":{"types":[{"type":{"name":"grass"}}]}},
      {"id":154,"name":"meganium","data":{"types":[{"type":{"name":"grass"}}]}},
      {"id":155,"name":"cyndaquil","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":156,"name":"quilava","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":157,"name":"typhlosion","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":158,"name":"totodile","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":159,"name":"croconaw","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":160,"name":"feraligatr","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":161,"name":"sentret","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":162,"name":"furret","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":163,"name":"hoothoot","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"flying"}}]}},
      {"id":164,"name":"noctowl","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"flying"}}]}},
      {"id":165,"name":"ledyba","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"flying"}}]}},
      {"id":166,"name":"ledian","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"flying"}}]}},
      {"id":167,"name":"spinarak","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"poison"}}]}},
      {"id":168,"name":"ariados","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"poison"}}]}},
      {"id":169,"name":"crobat","data":{"types":[{"type":{"name":"poison"}},{"type":{"name":"flying"}}]}},
      {"id":170,"name":"chinchou","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"electric"}}]}},
      {"id":171,"name":"lanturn","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"electric"}}]}},
      {"id":172,"name":"pichu","data":{"types":[{"type":{"name":"electric"}}]}},
      {"id":173,"name":"cleffa","data":{"types":[{"type":{"name":"fairy"}}]}},
      {"id":174,"name":"igglybuff","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"fairy"}}]}},
      {"id":175,"name":"togepi","data":{"types":[{"type":{"name":"fairy"}}]}},
      {"id":176,"name":"togetic","data":{"types":[{"type":{"name":"fairy"}},{"type":{"name":"flying"}}]}},
      {"id":177,"name":"natu","data":{"types":[{"type":{"name":"psychic"}},{"type":{"name":"flying"}}]}},
      {"id":178,"name":"xatu","data":{"types":[{"type":{"name":"psychic"}},{"type":{"name":"flying"}}]}},
      {"id":179,"name":"mareep","data":{"types":[{"type":{"name":"electric"}}]}},
      {"id":180,"name":"flaaffy","data":{"types":[{"type":{"name":"electric"}}]}},
      {"id":181,"name":"ampharos","data":{"types":[{"type":{"name":"electric"}}]}},
      {"id":182,"name":"bellossom","data":{"types":[{"type":{"name":"grass"}}]}},
      {"id":183,"name":"marill","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"fairy"}}]}},
      {"id":184,"name":"azumarill","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"fairy"}}]}},
      {"id":185,"name":"sudowoodo","data":{"types":[{"type":{"name":"rock"}}]}},
      {"id":186,"name":"politoed","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":187,"name":"hoppip","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"flying"}}]}},
      {"id":188,"name":"skiploom","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"flying"}}]}},
      {"id":189,"name":"jumpluff","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"flying"}}]}},
      {"id":190,"name":"aipom","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":191,"name":"sunkern","data":{"types":[{"type":{"name":"grass"}}]}},
      {"id":192,"name":"sunflora","data":{"types":[{"type":{"name":"grass"}}]}},
      {"id":193,"name":"yanma","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"flying"}}]}},
      {"id":194,"name":"wooper","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"ground"}}]}},
      {"id":195,"name":"quagsire","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"ground"}}]}},
      {"id":196,"name":"espeon","data":{"types":[{"type":{"name":"psychic"}}]}},
      {"id":197,"name":"umbreon","data":{"types":[{"type":{"name":"dark"}}]}},
      {"id":198,"name":"murkrow","data":{"types":[{"type":{"name":"dark"}},{"type":{"name":"flying"}}]}},
      {"id":199,"name":"slowking","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"psychic"}}]}},
      {"id":200,"name":"misdreavus","data":{"types":[{"type":{"name":"ghost"}}]}},
      {"id":201,"name":"unown","data":{"types":[{"type":{"name":"psychic"}}]}},
      {"id":202,"name":"wobbuffet","data":{"types":[{"type":{"name":"psychic"}}]}},
      {"id":203,"name":"girafarig","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"psychic"}}]}},
      {"id":204,"name":"pineco","data":{"types":[{"type":{"name":"bug"}}]}},
      {"id":205,"name":"forretress","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"steel"}}]}},
      {"id":206,"name":"dunsparce","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":207,"name":"gligar","data":{"types":[{"type":{"name":"ground"}},{"type":{"name":"flying"}}]}},
      {"id":208,"name":"steelix","data":{"types":[{"type":{"name":"steel"}},{"type":{"name":"ground"}}]}},
      {"id":209,"name":"snubbull","data":{"types":[{"type":{"name":"fairy"}}]}},
      {"id":210,"name":"granbull","data":{"types":[{"type":{"name":"fairy"}}]}},
      {"id":211,"name":"qwilfish","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"poison"}}]}},
      {"id":212,"name":"scizor","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"steel"}}]}},
      {"id":213,"name":"shuckle","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"rock"}}]}},
      {"id":214,"name":"heracross","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"fighting"}}]}},
      {"id":215,"name":"sneasel","data":{"types":[{"type":{"name":"dark"}},{"type":{"name":"ice"}}]}},
      {"id":216,"name":"teddiursa","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":217,"name":"ursaring","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":218,"name":"slugma","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":219,"name":"magcargo","data":{"types":[{"type":{"name":"fire"}},{"type":{"name":"rock"}}]}},
      {"id":220,"name":"swinub","data":{"types":[{"type":{"name":"ice"}},{"type":{"name":"ground"}}]}},
      {"id":221,"name":"piloswine","data":{"types":[{"type":{"name":"ice"}},{"type":{"name":"ground"}}]}},
      {"id":222,"name":"corsola","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"rock"}}]}},
      {"id":223,"name":"remoraid","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":224,"name":"octillery","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":225,"name":"delibird","data":{"types":[{"type":{"name":"ice"}},{"type":{"name":"flying"}}]}},
      {"id":226,"name":"mantine","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"flying"}}]}},
      {"id":227,"name":"skarmory","data":{"types":[{"type":{"name":"steel"}},{"type":{"name":"flying"}}]}},
      {"id":228,"name":"houndour","data":{"types":[{"type":{"name":"dark"}},{"type":{"name":"fire"}}]}},
      {"id":229,"name":"houndoom","data":{"types":[{"type":{"name":"dark"}},{"type":{"name":"fire"}}]}},
      {"id":230,"name":"kingdra","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"dragon"}}]}},
      {"id":231,"name":"phanpy","data":{"types":[{"type":{"name":"ground"}}]}},
      {"id":232,"name":"donphan","data":{"types":[{"type":{"name":"ground"}}]}},
      {"id":233,"name":"porygon2","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":234,"name":"stantler","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":235,"name":"smeargle","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":236,"name":"tyrogue","data":{"types":[{"type":{"name":"fighting"}}]}},
      {"id":237,"name":"hitmontop","data":{"types":[{"type":{"name":"fighting"}}]}},
      {"id":238,"name":"smoochum","data":{"types":[{"type":{"name":"ice"}},{"type":{"name":"psychic"}}]}},
      {"id":239,"name":"elekid","data":{"types":[{"type":{"name":"electric"}}]}},
      {"id":240,"name":"magby","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":241,"name":"miltank","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":242,"name":"blissey","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":243,"name":"raikou","data":{"types":[{"type":{"name":"electric"}}]}},
      {"id":244,"name":"entei","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":245,"name":"suicune","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":246,"name":"larvitar","data":{"types":[{"type":{"name":"rock"}},{"type":{"name":"ground"}}]}},
      {"id":247,"name":"pupitar","data":{"types":[{"type":{"name":"rock"}},{"type":{"name":"ground"}}]}},
      {"id":248,"name":"tyranitar","data":{"types":[{"type":{"name":"rock"}},{"type":{"name":"dark"}}]}},
      {"id":249,"name":"lugia","data":{"types":[{"type":{"name":"psychic"}},{"type":{"name":"flying"}}]}},
      {"id":250,"name":"ho-oh","data":{"types":[{"type":{"name":"fire"}},{"type":{"name":"flying"}}]}},
      {"id":251,"name":"celebi","data":{"types":[{"type":{"name":"psychic"}},{"type":{"name":"grass"}}]}},
      {"id":252,"name":"treecko","data":{"types":[{"type":{"name":"grass"}}]}},
      {"id":253,"name":"grovyle","data":{"types":[{"type":{"name":"grass"}}]}},
      {"id":254,"name":"sceptile","data":{"types":[{"type":{"name":"grass"}}]}},
      {"id":255,"name":"torchic","data":{"types":[{"type":{"name":"fire"}}]}},
      {"id":256,"name":"combusken","data":{"types":[{"type":{"name":"fire"}},{"type":{"name":"fighting"}}]}},
      {"id":257,"name":"blaziken","data":{"types":[{"type":{"name":"fire"}},{"type":{"name":"fighting"}}]}},
      {"id":258,"name":"mudkip","data":{"types":[{"type":{"name":"water"}}]}},
      {"id":259,"name":"marshtomp","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"ground"}}]}},
      {"id":260,"name":"swampert","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"ground"}}]}},
      {"id":261,"name":"poochyena","data":{"types":[{"type":{"name":"dark"}}]}},
      {"id":262,"name":"mightyena","data":{"types":[{"type":{"name":"dark"}}]}},
      {"id":263,"name":"zigzagoon","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":264,"name":"linoone","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":265,"name":"wurmple","data":{"types":[{"type":{"name":"bug"}}]}},
      {"id":266,"name":"silcoon","data":{"types":[{"type":{"name":"bug"}}]}},
      {"id":267,"name":"beautifly","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"flying"}}]}},
      {"id":268,"name":"cascoon","data":{"types":[{"type":{"name":"bug"}}]}},
      {"id":269,"name":"dustox","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"poison"}}]}},
      {"id":270,"name":"lotad","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"grass"}}]}},
      {"id":271,"name":"lombre","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"grass"}}]}},
      {"id":272,"name":"ludicolo","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"grass"}}]}},
      {"id":273,"name":"seedot","data":{"types":[{"type":{"name":"grass"}}]}},
      {"id":274,"name":"nuzleaf","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"dark"}}]}},
      {"id":275,"name":"shiftry","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"dark"}}]}},
      {"id":276,"name":"taillow","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"flying"}}]}},
      {"id":277,"name":"swellow","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"flying"}}]}},
      {"id":278,"name":"wingull","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"flying"}}]}},
      {"id":279,"name":"pelipper","data":{"types":[{"type":{"name":"water"}},{"type":{"name":"flying"}}]}},
      {"id":280,"name":"ralts","data":{"types":[{"type":{"name":"psychic"}},{"type":{"name":"fairy"}}]}},
      {"id":281,"name":"kirlia","data":{"types":[{"type":{"name":"psychic"}},{"type":{"name":"fairy"}}]}},
      {"id":282,"name":"gardevoir","data":{"types":[{"type":{"name":"psychic"}},{"type":{"name":"fairy"}}]}},
      {"id":283,"name":"surskit","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"water"}}]}},
      {"id":284,"name":"masquerain","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"flying"}}]}},
      {"id":285,"name":"shroomish","data":{"types":[{"type":{"name":"grass"}}]}},
      {"id":286,"name":"breloom","data":{"types":[{"type":{"name":"grass"}},{"type":{"name":"fighting"}}]}},
      {"id":287,"name":"slakoth","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":288,"name":"vigoroth","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":289,"name":"slaking","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":290,"name":"nincada","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"ground"}}]}},
      {"id":291,"name":"ninjask","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"flying"}}]}},
      {"id":292,"name":"shedinja","data":{"types":[{"type":{"name":"bug"}},{"type":{"name":"ghost"}}]}},
      {"id":293,"name":"whismur","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":294,"name":"loudred","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":295,"name":"exploud","data":{"types":[{"type":{"name":"normal"}}]}},
      {"id":296,"name":"makuhita","data":{"types":[{"type":{"name":"fighting"}}]}},
      {"id":297,"name":"hariyama","data":{"types":[{"type":{"name":"fighting"}}]}},
      {"id":298,"name":"azurill","data":{"types":[{"type":{"name":"normal"}},{"type":{"name":"fairy"}}]}},
      {"id":299,"name":"nosepass","data":{"types":[{"type":{"name":"rock"}}]}},
      {"id":300,"name":"skitty","data":{"types":[{"type":{"name":"normal"}}]}}
    ];

    // Embaralha a lista e seleciona os primeiros 50
    const selectedPokemon = shuffle(pokemonData).slice(0, 50);

    const pokemonInsertQuery =
      "INSERT INTO Pokemon (id, name, data) VALUES (?, ?, ?)";
    for (const p of selectedPokemon) {
      // O MySQL espera que objetos JSON sejam stringificados
      await connection.query(pokemonInsertQuery, [
        p.id,
        p.name,
        JSON.stringify(p.data),
      ]);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    if (connection) {
      connection.release();
    }
    // Encerra o pool de conexões para que o script possa terminar
    await pool.end();
  }
}

seedDatabase();
