(() => {
  "use strict";

  const STARTING_NECTAR = 250, MAX_NECTAR = 999, MAX_LIVES = 5;
  const STORAGE_KEY = "hotelInsectosLeaderboard";
  const ROWS = 5, COLS = 7, WAVE_GAP = 4.5, MAX_FRAME_DT = .05, MIN_FRAME_DT = 1 / 240;

  // Ajusta costes, recargas, descripción educativa y comportamiento de cada material aquí.
  const MATERIALS = [
    { id:"canas", name:"Cañas huecas", insect:"Abeja solitaria", icon:"🎋", cost:50, cooldown:5.5, description:"Abeja solitaria · produce néctar.", role:"producer", hp:105, nectarEvery:8.5, nectarAmount:25 },
    { id:"pinas", name:"Piñas", insect:"Mariquita", icon:"🌰", cost:75, cooldown:4.2, description:"Mariquita · eficaz contra pulgones.", role:"shooter", hp:82, damage:13, interval:.72, projectileSpeed:4.5, bonusVs:{pulgon:1.3} },
    { id:"tronco", name:"Tronco perforado", insect:"Avispa solitaria", icon:"🪵", cost:125, cooldown:7, description:"Avispa solitaria · perfora cochinillas.", role:"shooter", hp:100, damage:42, interval:1.55, projectileSpeed:3.5, armorPierce:.78, bonusVs:{cochinilla:1.55} },
    { id:"corteza", name:"Corteza de árbol", insect:"Tijereta", icon:"🪹", cost:100, cooldown:7.5, description:"Tijereta · frena orugas; contraataca.", role:"wall", hp:370, meleeDamage:18 },
    { id:"paja", name:"Paja seca", insect:"Crisopa", icon:"🌾", cost:75, cooldown:5.2, description:"Crisopa · ralentiza mosca blanca.", role:"shooter", hp:88, damage:10, interval:1.08, projectileSpeed:4, slow:2.1, bonusVs:{mosca:1.3} },
    { id:"ladrillo", name:"Ladrillo hueco", insect:"Sírfido", icon:"🧱", cost:125, cooldown:8, description:"Sírfido · ráfaga contra grupos.", role:"shooter", hp:96, damage:14, interval:1.5, projectileSpeed:3.8, splash:1.15, bonusVs:{pulgon:1.25,mosca:1.2} },
    { id:"hojas", name:"Hojas secas", insect:"Escarabajo depredador", icon:"🍂", cost:150, cooldown:10, description:"Escarabajo · emboscada en área.", role:"mine", hp:1, blastDamage:105, blastRange:1.65 }
  ];

  const PESTS = {
    pulgon:{name:"Pulgón",icon:"🐜",hp:42,speed:.31,armor:0,biteDamage:10,reward:12},
    oruga:{name:"Oruga",icon:"🐛",hp:86,speed:.19,armor:.05,biteDamage:18,reward:18},
    cochinilla:{name:"Cochinilla acorazada",icon:"🪲",hp:132,speed:.135,armor:.52,biteDamage:22,reward:30},
    mosca:{name:"Mosca blanca",icon:"🪰",hp:38,speed:.38,armor:0,biteDamage:8,reward:14},
    avispa:{name:"Avispa invasora",icon:"🐝",hp:82,speed:.29,armor:.18,biteDamage:25,reward:25}
  };
  const WAVES = [
    ["pulgon","pulgon","pulgon","pulgon","pulgon","pulgon"],
    ["pulgon","oruga","pulgon","oruga","pulgon","oruga","pulgon","pulgon"],
    ["mosca","pulgon","cochinilla","mosca","oruga","pulgon","cochinilla","mosca","pulgon"],
    ["oruga","mosca","avispa","cochinilla","oruga","mosca","avispa","cochinilla","pulgon","mosca","oruga"],
    ["pulgon","avispa","mosca","oruga","cochinilla","pulgon","avispa","mosca","oruga","cochinilla","avispa","pulgon","mosca","cochinilla","oruga"]
  ];
  const TIPS = {
    pulgon:"Tip: las Piñas con mariquitas disparan rápido contra los pulgones.",
    oruga:"Tip: la Corteza con tijeretas frena a las orugas y les contraataca.",
    cochinilla:"Tip: el Tronco perforado hace mucho daño a las cochinillas acorazadas.",
    mosca:"Tip: la Paja ralentiza moscas blancas; el Ladrillo cubre grupos.",
    avispa:"Tip: combina la resistencia de la Corteza con el disparo del Tronco."
  };

  const $ = (s) => document.querySelector(s);
  const ui = {
    board:$("#tdBoard"), cells:$("#tdCells"), shop:$("#tdShop"), enemies:$("#tdEnemies"),
    projectiles:$("#tdProjectiles"), effects:$("#tdEffects"), drops:$("#tdNectarDrops"),
    nectar:$("#tdNectar"), wave:$("#tdWave"), lives:$("#tdLives"), kills:$("#tdKills"),
    score:$("#tdScore"), status:$("#tdStatus"), selection:$("#tdSelection"),
    start:$("#tdStart"), pause:$("#tdPause"), reset:$("#tdReset"), speed:$("#tdSpeed"),
    shovel:$("#tdShovel"), saveForm:$("#tdSaveForm"), playerName:$("#tdPlayerName"),
    resultTitle:$("#tdResultTitle"), summary:$("#tdFinalSummary"),
    feedback:$("#tdSaveFeedback"), records:$("#leaderboardRows")
  };
  const plants = new Map(), enemies = [], shots = [], drops = new Map(), effects = [];
  const cooldowns = Object.fromEntries(MATERIALS.map((m) => [m.id,0]));
  let state="ready", selected=null, shovel=false, nectar=STARTING_NECTAR, earned=STARTING_NECTAR;
  let lives=MAX_LIVES, wave=0, cleared=0, kills=0, killScore=0, finalScore=0, efficiency=0;
  let speed=1, raf=null, lastTime=null, waveQueue=[], spawnDelay=0, gapDelay=null;
  let dropDelay=4.5, uiDelay=0, previousLane=-1, saved=false;

  function makeBoard(){
    const fragment=document.createDocumentFragment();
    for(let row=0;row<ROWS;row++) for(let col=0;col<COLS;col++){
      const cell=document.createElement("button");
      cell.type="button"; cell.className="td-cell"+(col===0?" td-cell-hotel":"");
      cell.dataset.row=String(row); cell.dataset.col=String(col);
      cell.setAttribute("aria-label",col===0?"Carril "+(row+1)+": columna del hotel, zona protegida":"Carril "+(row+1)+", columna "+(col+1)+": casilla vacía");
      if(col===0) cell.disabled=true;
      const slot=document.createElement("span"); slot.className="td-plant-slot"; slot.setAttribute("aria-hidden","true"); cell.append(slot); fragment.append(cell);
    }
    ui.cells.replaceChildren(fragment);
  }

  function makeShop(){
    const fragment=document.createDocumentFragment();
    MATERIALS.forEach((m)=>{
      const card=document.createElement("button"); card.type="button"; card.className="td-material-card"; card.dataset.material=m.id; card.setAttribute("aria-pressed","false");
      const icon=document.createElement("span"); icon.className="td-material-icon"; icon.setAttribute("aria-hidden","true"); icon.textContent=m.icon;
      const copy=document.createElement("span"); copy.className="td-material-copy";
      const name=document.createElement("strong"); name.className="td-material-name"; name.textContent=m.name;
      const desc=document.createElement("small"); desc.className="td-material-description"; desc.textContent=m.description;
      copy.append(name,desc);
      const meta=document.createElement("span"); meta.className="td-material-meta";
      const cost=document.createElement("span"); cost.className="td-material-cost"; cost.textContent="✿ "+m.cost;
      const cooldown=document.createElement("small"); cooldown.className="td-material-cooldown"; cooldown.dataset.cooldown=m.id;
      meta.append(cost,cooldown); card.append(icon,copy,meta); fragment.append(card);
    });
    ui.shop.replaceChildren(fragment); refreshShop();
  }

  // Migra las puntuaciones del minijuego anterior sin borrarlas; las antiguas muestran Oleada «Anterior».
  function readRecords(){
    try{
      const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");
      if(!Array.isArray(raw)) return [];
      return raw.filter((r)=>r&&Number.isFinite(Number(r.score))&&typeof r.name==="string")
        .map((r)=>({name:r.name.trim().slice(0,18)||"Explorador/a",score:Math.max(0,Math.round(Number(r.score))),wave:Number.isFinite(Number(r.wave))?Number(r.wave):0,efficiency:Number(r.efficiency)||0,date:typeof r.date==="string"?r.date:""}))
        .sort((a,b)=>b.score-a.score).slice(0,10);
    }catch{return []}
  }

  function renderRecords(){
    const entries=readRecords(); ui.records.replaceChildren();
    if(!entries.length){const row=document.createElement("tr"),cell=document.createElement("td");cell.colSpan=4;cell.className="td-empty-records";cell.textContent="Aún no hay puntuaciones. ¡Empieza una defensa!";row.append(cell);ui.records.append(row);return}
    entries.forEach((entry,i)=>{
      const row=document.createElement("tr"),rank=document.createElement("th"),name=document.createElement("td"),reached=document.createElement("td"),score=document.createElement("td");
      rank.scope="row";rank.textContent=String(i+1);name.textContent=entry.name;reached.textContent=entry.wave?String(entry.wave):"Anterior";score.textContent=entry.score.toLocaleString("es-ES");row.append(rank,name,reached,score);ui.records.append(row);
    });
  }

  function setStatus(text){ui.status.textContent=text}
  function updateStats(){
    ui.nectar.textContent=String(nectar);ui.wave.textContent=wave?wave+" / "+WAVES.length:"Lista";
    ui.lives.textContent=(("♥ ").repeat(lives)+("♡ ").repeat(MAX_LIVES-lives)).trim();
    ui.kills.textContent=String(kills);ui.score.textContent=String(state==="over"?finalScore:killScore+cleared*55);
  }
  function refreshShop(){
    ui.shop.querySelectorAll("[data-material]").forEach((card)=>{
      const m=MATERIALS.find((item)=>item.id===card.dataset.material), left=Math.max(0,cooldowns[m.id]);
      card.classList.toggle("is-selected",selected===m.id);card.setAttribute("aria-pressed",String(selected===m.id));
      card.querySelector("[data-cooldown]").textContent=state==="ready"?"Recarga "+m.cooldown+"s":left>0?"Recarga "+left.toFixed(1)+"s":"Lista · "+m.cooldown+"s";
      card.disabled=!["ready","playing"].includes(state)||nectar<m.cost||left>0;
    });
    ui.shovel.disabled=!["ready","playing"].includes(state);ui.shovel.classList.toggle("is-selected",shovel);ui.shovel.setAttribute("aria-pressed",String(shovel));
  }
  function updateControls(){
    ui.pause.disabled=!["playing","paused"].includes(state);ui.pause.textContent=state==="paused"?"Reanudar":"Pausar";
    ui.start.disabled=state==="playing"||state==="paused"||state==="over";ui.start.textContent=state==="ready"?"Empezar oleadas":state==="over"?"Partida terminada":"Oleadas en marcha";
    ui.speed.textContent="Velocidad "+speed+"×";ui.speed.setAttribute("aria-label","Cambiar velocidad, ahora "+speed+" por");
  }
  function updateHealth(element,hp,max){
    const fill=element&&element.querySelector("i");if(fill)fill.style.width=Math.max(0,Math.min(100,hp/max*100))+"%";
  }
  function showPlant(plant){
    const cell=ui.cells.querySelector('[data-row="'+plant.row+'"][data-col="'+plant.col+'"]'),slot=cell&&cell.querySelector(".td-plant-slot");
    if(!slot)return;
    const marker=document.createElement("span");marker.className="td-plant td-plant-"+plant.material.id;marker.title=plant.material.name+" · "+plant.material.insect;
    const icon=document.createElement("span");icon.className="td-plant-icon";icon.textContent=plant.material.icon;
    const bar=document.createElement("span");bar.className="td-health-bar td-plant-health";bar.append(document.createElement("i"));marker.append(icon,bar);slot.replaceChildren(marker);
    plant.element=marker;plant.healthElement=bar;cell.classList.add("has-plant");cell.setAttribute("aria-label","Carril "+(plant.row+1)+", columna "+(plant.col+1)+": "+plant.material.name+".");updateHealth(bar,plant.hp,plant.maxHp);
  }  function placeMaterial(row,col){
    const m=MATERIALS.find((item)=>item.id===selected);
    if(!m){setStatus("Elige uno de los siete materiales o activa Pala / Retirar.");return}
    if(col===0){setStatus("La primera columna pertenece al Hotel de Insectos.");return}
    const key=row+"-"+col;
    if(plants.has(key)){setStatus("Esa casilla ya tiene una defensa. Usa Pala / Retirar para reorganizarla.");return}
    if(nectar<m.cost){setStatus("Necesitas "+m.cost+" de néctar para colocar "+m.name+".");return}
    if(state==="paused"||state==="over")return;
    nectar-=m.cost;
    const plant={material:m,row:row,col:col,hp:m.hp,maxHp:m.hp,attackTimer:.35+Math.random()*.35,producerTimer:m.role==="producer"?m.nectarEvery:0};
    plants.set(key,plant);showPlant(plant);cooldowns[m.id]=state==="playing"?m.cooldown:0;
    shovel=false;refreshShop();updateStats();
    setStatus(m.name+" colocado en el carril "+(row+1)+". "+(state==="ready"?"Puedes añadir defensas y empezar cuando quieras.":""));
  }
  function removeMaterial(row,col){
    const key=row+"-"+col,plant=plants.get(key);
    if(!plant){setStatus("No hay ningún material en esa casilla para retirar.");return}
    clearPlant(plant);
    const refund=Math.floor(plant.material.cost*.4);nectar=Math.min(MAX_NECTAR,nectar+refund);updateStats();refreshShop();setStatus(plant.material.name+" retirado. Recuperas "+refund+" de néctar.");
  }
  function clearPlant(plant){
    plants.delete(plant.row+"-"+plant.col);
    const cell=ui.cells.querySelector('[data-row="'+plant.row+'"][data-col="'+plant.col+'"]');
    if(cell){cell.classList.remove("has-plant");cell.querySelector(".td-plant-slot").replaceChildren();cell.setAttribute("aria-label","Carril "+(plant.row+1)+", columna "+(plant.col+1)+": casilla vacía")}
  }
  function handleBoardClick(event){
    if(!["ready","playing"].includes(state)){setStatus("La defensa está pausada. Pulsa Reanudar para continuar.");return}
    const dropButton=event.target.closest("[data-nectar-drop]");
    if(dropButton){const drop=drops.get(dropButton.dataset.nectarDrop);if(drop&&state==="playing"){nectar=Math.min(MAX_NECTAR,nectar+drop.amount);earned+=drop.amount;drop.element.remove();drops.delete(drop.id);updateStats();refreshShop();setStatus("¡Néctar recogido! +"+drop.amount+".")}return}
    const cell=event.target.closest(".td-cell");if(!cell||cell.disabled)return;
    const row=Number(cell.dataset.row),col=Number(cell.dataset.col);
    if(shovel)removeMaterial(row,col);else placeMaterial(row,col);
  }
  function chooseMaterial(id){
    const m=MATERIALS.find((item)=>item.id===id);if(!m)return;
    if(nectar<m.cost){setStatus("Te falta néctar para "+m.name+". Recoge flores o coloca Cañas huecas.");return}
    if(cooldowns[id]>0){setStatus(m.name+" necesita "+cooldowns[id].toFixed(1)+" s más de recarga.");return}
    selected=selected===id?null:id;shovel=false;refreshShop();
    ui.selection.textContent=selected?m.name+" seleccionado. Toca una casilla vacía para colocarlo.":"Elige un material para colocarlo en el tablero.";
    if(selected)setStatus(m.name+": "+m.description);
  }
  function toggleShovel(){
    if(!["ready","playing"].includes(state))return;
    shovel=!shovel;selected=null;refreshShop();
    ui.selection.textContent=shovel?"Pala activa: toca una defensa para retirarla.":"Elige un material para colocarlo en el tablero.";
    setStatus(shovel?"Pala activa. Toca una defensa para retirarla.":"Elige un material para la defensa.");
  }
  function addNectar(amount,message){
    const gained=Math.min(amount,MAX_NECTAR-nectar);if(gained<=0)return;
    nectar+=gained;earned+=gained;updateStats();refreshShop();if(message)setStatus(message+" +"+gained+" de néctar.");
  }
  function spawnDrop(){
    if(drops.size>=4)return;
    let row=Math.floor(Math.random()*ROWS),col=1+Math.floor(Math.random()*(COLS-1));
    for(let tries=0;tries<8&&plants.has(row+"-"+col);tries++){row=Math.floor(Math.random()*ROWS);col=1+Math.floor(Math.random()*(COLS-1))}
    const id="nectar-"+Math.random().toString(36).slice(2,9),amount=20+Math.floor(Math.random()*16);
    const element=document.createElement("button");element.type="button";element.className="td-nectar-drop";element.dataset.nectarDrop=id;element.setAttribute("aria-label","Recoger "+amount+" unidades de néctar");element.title="+"+amount+" de néctar";element.textContent="✿";
    element.style.left=((col+.5)/COLS*100)+"%";element.style.top=((row+.5)/ROWS*100)+"%";ui.drops.append(element);
    drops.set(id,{id:id,row:row,col:col,amount:amount,timeLeft:11,element:element});
  }
  function spawnPest(type,lane){
    const data=PESTS[type],row=Number.isInteger(lane)?lane:Math.floor(Math.random()*ROWS),element=document.createElement("span");
    previousLane=row;element.className="td-enemy td-enemy-"+type;element.title=data.name;
    const icon=document.createElement("span");icon.className="td-enemy-icon";icon.textContent=data.icon;
    const bar=document.createElement("span");bar.className="td-health-bar td-enemy-health";bar.append(document.createElement("i"));element.append(icon,bar);ui.enemies.append(element);
    const enemy={type:type,row:row,x:6.72,hp:data.hp,maxHp:data.hp,speed:data.speed*(1+Math.max(0,wave-1)*.035),armor:data.armor,biteDamage:data.biteDamage,biteTimer:.75,slowTimer:0,element:element,healthElement:bar,defeated:false};
    enemies.push(enemy);
    if(!noticed.has(type)){noticed.add(type);setStatus(data.name+" nueva. "+TIPS[type])}
  }
  function beginWave(number){
    wave=number;spawnDelay=0;gapDelay=null;waveQueue=WAVES[number-1].slice();updateStats();
    setStatus("¡Oleada "+number+"! Las plagas entran por la derecha.");
  }
  function startGame(){
    if(state!=="ready")return;
    state="playing";beginWave(1);updateControls();refreshShop();startLoop();
  }
  function pauseGame(message){
    if(state!=="playing")return;
    state="paused";stopLoop();updateControls();refreshShop();setStatus(message||"Partida pausada. Pulsa Reanudar para continuar.");
  }
  function resumeGame(){
    if(state!=="paused"||document.hidden||$("#juego").hidden)return;
    state="playing";updateControls();refreshShop();setStatus("Oleada "+wave+" de "+WAVES.length+" en marcha.");startLoop();
  }
  function resetGame(){
    stopLoop();state="ready";selected=null;shovel=false;nectar=STARTING_NECTAR;earned=STARTING_NECTAR;lives=MAX_LIVES;wave=0;cleared=0;kills=0;killScore=0;finalScore=0;efficiency=0;
    waveQueue=[];spawnDelay=0;gapDelay=null;dropDelay=4.5;uiDelay=0;previousLane=-1;saved=false;speed=1;noticed.clear();
    plants.clear();enemies.splice(0).forEach((e)=>e.element.remove());shots.splice(0).forEach((p)=>p.element.remove());drops.forEach((d)=>d.element.remove());drops.clear();effects.splice(0).forEach((fx)=>fx.element.remove());
    MATERIALS.forEach((m)=>{cooldowns[m.id]=0});
    ui.cells.querySelectorAll(".td-cell").forEach((cell)=>{cell.classList.remove("has-plant");if(Number(cell.dataset.col)>0)cell.setAttribute("aria-label","Carril "+(Number(cell.dataset.row)+1)+", columna "+(Number(cell.dataset.col)+1)+": casilla vacía");cell.querySelector(".td-plant-slot").replaceChildren()});
    ui.saveForm.hidden=true;ui.feedback.textContent="";ui.playerName.value="";ui.saveForm.querySelector("button[type=submit]").disabled=false;ui.selection.textContent="Elige un material para colocarlo en el tablero.";
    updateStats();updateControls();refreshShop();setStatus("Partida lista. Puedes preparar defensas y empezar cuando quieras.");
  }
  function makeEffect(row,x,kind){
    const el=document.createElement("span");el.className="td-effect "+kind;el.textContent=kind==="td-effect-blast"?"✹":"•";el.style.left=(x/COLS*100)+"%";el.style.top=((row+.5)/ROWS*100)+"%";ui.effects.append(el);effects.push({element:el,time:.42});
  }
  function damageEnemy(enemy,damage,pierce,bonus){
    enemy.hp-=damage*(1-enemy.armor*(1-(pierce||0)))*(bonus||1);updateHealth(enemy.healthElement,enemy.hp,enemy.maxHp);
    if(enemy.hp<=0)killPest(enemy);
  }
  function killPest(enemy){
    if(enemy.defeated)return;enemy.defeated=true;enemy.element.remove();kills++;killScore+=PESTS[enemy.type].reward+wave*3;updateStats();
  }
  function explodeLeaf(plant){
    makeEffect(plant.row,plant.col+.5,"td-effect-blast");
    enemies.forEach((enemy)=>{const dr=Math.abs(enemy.row-plant.row),dx=Math.abs(enemy.x-plant.col);if(!enemy.defeated&&dr<=1&&dx<=1.65&&(dr===0||dx<1.1))damageEnemy(enemy,105,.08,1)});
    clearPlant(plant);
    setStatus("¡Emboscada! Las Hojas secas han despejado la zona.");
  }
  function targetFor(plant){
    return enemies.filter((e)=>!e.defeated&&e.row===plant.row&&e.x>plant.col&&e.x-plant.col<=6.6).sort((a,b)=>a.x-b.x)[0]||null;
  }
  function blockerFor(enemy){
    for(const plant of plants.values())if(plant.row===enemy.row&&enemy.x<=plant.col+.52&&enemy.x>=plant.col-.48)return plant;
    return null;
  }
  function fire(plant,target){
    const m=plant.material,el=document.createElement("span");el.className="td-projectile td-projectile-"+m.id;el.textContent=m.id==="paja"?"•":m.id==="tronco"?"◆":"●";ui.projectiles.append(el);
    const x=plant.col+.28;
    shots.push({x:x,prevX:x,row:plant.row,speed:m.projectileSpeed,damage:m.damage,pierce:m.armorPierce||0,slow:m.slow||0,splash:m.splash||0,bonus:m.bonusVs||{},element:el,remove:false,targetType:target.type});
  }  function loseLife(enemy){
    if(enemy.defeated)return;enemy.defeated=true;enemy.element.remove();lives=Math.max(0,lives-1);updateStats();
    setStatus(PESTS[enemy.type].name+" llegó al hotel. Pierdes una vida. "+TIPS[enemy.type]);
    if(lives<=0)endGame(false);
  }
  function updateWaves(dt){
    if(waveQueue.length){spawnDelay-=dt;if(spawnDelay<=0){const type=waveQueue.shift();let lane=Math.floor(Math.random()*ROWS);if(lane===previousLane&&Math.random()<.7)lane=(lane+1+Math.floor(Math.random()*(ROWS-1)))%ROWS;spawnPest(type,lane);spawnDelay=Math.max(.68,1.5-wave*.12)}return}
    if(enemies.length)return;
    if(gapDelay===null){
      cleared=Math.max(cleared,wave);updateStats();
      if(wave>=WAVES.length){endGame(true);return}
      gapDelay=WAVE_GAP;setStatus("Oleada "+wave+" superada. Refuerza tus carriles y recoge néctar antes de la siguiente.");
      return;
    }
    gapDelay-=dt;if(gapDelay<=0)beginWave(wave+1);
  }
  function updatePlants(dt){
    for(const plant of [...plants.values()]){
      const m=plant.material;
      if(m.role==="producer"){plant.producerTimer-=dt;if(plant.producerTimer<=0){addNectar(m.nectarAmount,"Las Cañas huecas han producido néctar.");plant.producerTimer+=m.nectarEvery}}
      else if(m.role==="mine"){
        const target=enemies.find((e)=>!e.defeated&&Math.abs(e.row-plant.row)<=1&&e.x<=plant.col+1.15&&e.x>=plant.col-.2);
        if(target)explodeLeaf(plant);
      }else if(m.role==="shooter"){
        plant.attackTimer-=dt;const target=targetFor(plant);if(target&&plant.attackTimer<=0){fire(plant,target);plant.attackTimer=m.interval}
      }
    }
  }
  function updateEnemies(dt){
    for(const enemy of enemies){
      if(enemy.defeated)continue;enemy.prevX=enemy.x;enemy.slowTimer=Math.max(0,enemy.slowTimer-dt);
      const blocker=blockerFor(enemy);
      if(blocker){
        enemy.x=Math.max(enemy.x,blocker.col+.48);enemy.biteTimer-=dt;
        if(enemy.biteTimer<=0){
          blocker.hp-=enemy.biteDamage;enemy.biteTimer=.9;updateHealth(blocker.healthElement,blocker.hp,blocker.maxHp);
          if(blocker.material.role==="wall")damageEnemy(enemy,blocker.material.meleeDamage,0,1);
          if(blocker.hp<=0){
            clearPlant(blocker);
            setStatus(blocker.material.name+" se ha agotado. Reorganiza el carril con la pala.");
          }
        }
      }else enemy.x-=enemy.speed*(enemy.slowTimer>0?.46:1)*dt;
      if(enemy.x<=.48)loseLife(enemy);
      if(state!=="playing")break;
    }
  }
  function updateShots(dt){
    for(const shot of shots){
      if(shot.remove)continue;
      shot.prevX=shot.x;shot.x+=shot.speed*dt;
      if(shot.x>=COLS+.15){shot.remove=true;continue}
      // Comprueba el tramo entre fotogramas para evitar que un disparo rápido atraviese al enemigo.
      const target=enemies.filter((enemy)=>{
        if(enemy.defeated||enemy.row!==shot.row)return false;
        const gapBefore=(enemy.prevX??enemy.x)-shot.prevX;
        const gapAfter=enemy.x-shot.x;
        return gapBefore>=-.28&&gapAfter<=.28;
      }).sort((a,b)=>a.x-b.x)[0];
      if(!target)continue;
      damageEnemy(target,shot.damage,shot.pierce,shot.bonus[target.type]||1);
      if(shot.slow)target.slowTimer=Math.max(target.slowTimer,shot.slow);
      if(shot.splash){
        makeEffect(target.row,target.x,"td-effect-burst");
        enemies.forEach((e)=>{if(e!==target&&!e.defeated&&e.row===target.row&&Math.abs(e.x-target.x)<=shot.splash)damageEnemy(e,shot.damage*.64,shot.pierce,shot.bonus[e.type]||1)});
      }
      shot.remove=true;
    }
  }
  function updateDrops(dt){
    dropDelay-=dt;if(dropDelay<=0){if(drops.size<4)spawnDrop();dropDelay=7.5+Math.random()*2.5}
    for(const drop of drops.values()){drop.timeLeft-=dt;if(drop.timeLeft<=0){drop.element.remove();drops.delete(drop.id)}}
  }
  function updateEffects(dt){
    for(let i=effects.length-1;i>=0;i--){effects[i].time-=dt;if(effects[i].time<=0){effects[i].element.remove();effects.splice(i,1)}}
  }
  function cleanup(){
    for(let i=enemies.length-1;i>=0;i--)if(enemies[i].defeated)enemies.splice(i,1);
    for(let i=shots.length-1;i>=0;i--)if(shots[i].remove){shots[i].element.remove();shots.splice(i,1)}
  }
  function paint(){
    enemies.forEach((e)=>{e.element.style.left=(e.x/COLS*100)+"%";e.element.style.top=((e.row+.5)/ROWS*100)+"%"});
    shots.forEach((s)=>{s.element.style.left=(s.x/COLS*100)+"%";s.element.style.top=((s.row+.5)/ROWS*100)+"%"});
  }
  function update(dt){
    MATERIALS.forEach((m)=>{cooldowns[m.id]=Math.max(0,cooldowns[m.id]-dt)});
    updateDrops(dt);updatePlants(dt);updateWaves(dt);updateEnemies(dt);
    if(state!=="playing")return;
    updateShots(dt);updateEffects(dt);cleanup();
    uiDelay-=dt;if(uiDelay<=0){refreshShop();updateStats();uiDelay=.18}
  }
  function frame(timestamp){
    raf=null;
    if(state!=="playing"){lastTime=null;return}
    if(document.hidden||$("#juego").hidden){pauseGame("Partida pausada mientras el Juego no está visible.");return}

    const now=Number.isFinite(timestamp)?timestamp:performance.now();
    const elapsed=lastTime===null?1/60:Math.max(0,(now-lastTime)/1000);
    const dt=Math.min(MAX_FRAME_DT,Math.max(MIN_FRAME_DT,elapsed*speed));
    lastTime=now;

    try{
      update(dt);
      paint();
    }catch(error){
      console.error("El bucle del juego se ha detenido por un error.",error);
      pauseGame("La partida se ha pausado para evitar un bloqueo. Pulsa Reiniciar para intentarlo de nuevo.");
    }
    if(state==="playing")raf=window.requestAnimationFrame(frame);
  }
  function startLoop(){
    if(state!=="playing"||raf!==null)return;
    if(document.hidden||$("#juego").hidden){pauseGame("Partida pausada mientras el Juego no está visible.");return}
    lastTime=null;
    raf=window.requestAnimationFrame(frame);
  }
  function stopLoop(){if(raf!==null)window.cancelAnimationFrame(raf);raf=null;lastTime=null}
  function efficiencyScore(){return Math.round(Math.min(100,Math.max(0,nectar)/Math.max(STARTING_NECTAR,earned)*100))}
  function endGame(victory){
    if(state==="over")return;state="over";stopLoop();if(victory)cleared=WAVES.length;
    efficiency=efficiencyScore();
    finalScore=killScore+lives*35+cleared*55+Math.round(efficiency*1.5)+(victory?100:0);
    ui.resultTitle.textContent=victory?"¡Hotel protegido!":"La defensa ha caído";
    ui.summary.textContent="Oleada alcanzada: "+wave+"/"+WAVES.length+" · Plagas derrotadas: "+kills+" · Eficiencia de néctar: "+efficiency+"% · Puntuación final: "+finalScore+" puntos.";
    ui.saveForm.hidden=false;ui.feedback.textContent="";ui.playerName.value="";saved=false;
    setStatus(victory?"¡Victoria! Has protegido el hotel durante todas las oleadas.":"Fin de la partida. Puedes guardar el resultado y volver a intentarlo.");
    updateStats();updateControls();refreshShop();
  }
  function saveRecord(event){
    event.preventDefault();if(state!=="over"||saved)return;
    const name=ui.playerName.value.trim().replace(/\s+/g," ").slice(0,18);
    if(!name){ui.feedback.textContent="Escribe un apodo para guardar el resultado.";ui.playerName.focus();return}
    const record={name:name,score:finalScore,wave:wave,efficiency:efficiency,date:new Date().toISOString()};
    const list=readRecords().concat(record).sort((a,b)=>b.score-a.score).slice(0,10);
    try{
      localStorage.setItem(STORAGE_KEY,JSON.stringify(list));saved=true;
      ui.feedback.textContent="Récord guardado para "+name+".";ui.saveForm.querySelector("button[type=submit]").disabled=true;renderRecords();
    }catch{ui.feedback.textContent="No se pudo guardar en este navegador. Prueba de nuevo más tarde."}
  }
  function handleShop(event){const card=event.target.closest("[data-material]");if(card)chooseMaterial(card.dataset.material)}
  function handleViewChange(event){if(event.detail&&event.detail.view!=="juego")pauseGame("Partida pausada al salir del Juego. Vuelve y pulsa Reanudar para continuar.")}
  function handleVisibility(){if(document.hidden)pauseGame("Partida pausada mientras la página está en segundo plano.")}

  let noticed=null;
  function init(){
    noticed=new Set();makeBoard();makeShop();renderRecords();updateStats();updateControls();
    ui.board.addEventListener("click",handleBoardClick);ui.shop.addEventListener("click",handleShop);
    ui.shovel.addEventListener("click",toggleShovel);ui.start.addEventListener("click",startGame);
    ui.pause.addEventListener("click",()=>state==="playing"?pauseGame():resumeGame());
    ui.reset.addEventListener("click",resetGame);ui.speed.addEventListener("click",()=>{
      speed=speed===1?2:1;updateControls();setStatus("Velocidad de juego: "+speed+"×.")
    });
    ui.saveForm.addEventListener("submit",saveRecord);
    window.addEventListener("hotel:viewchange",handleViewChange);document.addEventListener("visibilitychange",handleVisibility);
    window.addEventListener("pagehide",()=>pauseGame("Partida pausada al salir de la página."));
  }
  init();
})();
