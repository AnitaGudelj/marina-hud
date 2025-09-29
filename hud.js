(function(){
  const START_COINS = 1000;
  const START_ECO   = 100;
  const K_COINS = "martinaCoins";
  const K_ECO   = "martinaEco";

  const get = (k, d) => {
    const v = localStorage.getItem(k);
    return v === null ? d : parseInt(v,10);
  };
  const set = (k, v) => localStorage.setItem(k, String(v));

  let coins = get(K_COINS, START_COINS);
  let eco   = get(K_ECO,   START_ECO);

  // Napravi elemente
  const hud = document.createElement("div");
  hud.className = "hud";
  hud.innerHTML = `
    <div class="row">
      <div class="pill" id="coins">💰 ${coins}</div>
      <div class="pill" id="eco">🌱 ${eco}</div>
      <button id="reset" title="Reset">↺</button>
    </div>`;
  document.body.appendChild(hud);

  const toast = document.createElement("div");
  toast.className = "toast";
  document.body.appendChild(toast);

  function update(deltaCoins, deltaEco, label="") {
    coins += deltaCoins;
    eco += deltaEco;
    set(K_COINS, coins);
    set(K_ECO, eco);
    document.getElementById("coins").textContent = `💰 ${coins}`;
    document.getElementById("eco").textContent   = `🌱 ${eco}`;
    if(deltaCoins||deltaEco){
      toast.textContent = `${deltaCoins>=0?`+${deltaCoins}`:deltaCoins} 💰 · ${deltaEco>=0?`+${deltaEco}`:deltaEco} 🌱 ${label}`;
      toast.classList.add("show");
      setTimeout(()=>toast.classList.remove("show"),1800);
    }
  }

  // reset gumb
  hud.querySelector("#reset").addEventListener("click", ()=>{
    coins = START_COINS; eco = START_ECO;
    set(K_COINS, coins); set(K_ECO, eco);
    document.getElementById("coins").textContent = `💰 ${coins}`;
    document.getElementById("eco").textContent   = `🌱 ${eco}`;
  });

  // Expose update function globally
  window.marinaHUD = { update };
})();
