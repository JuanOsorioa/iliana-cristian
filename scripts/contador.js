(function () {
  // 1. Fecha en formato ISO estricto (YYYY-MM-DD)
  const META = new Date('2026-06-06T00:00:00');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const diff = META - Date.now();
    
    // Referencias a los elementos (para no buscarlos 4 veces cada segundo)
    const elDias = document.getElementById('dias');
    const elHoras = document.getElementById('horas');
    const elMins = document.getElementById('minutos');
    const elSegs = document.getElementById('segundos');

    // Si los elementos no existen en el HTML, salimos para no dar error
    if (!elDias) return;

    if (diff <= 0) {
      [elDias, elHoras, elMins, elSegs].forEach(el => el.textContent = '00');
      return;
    }

    // Cálculos
    elDias.textContent  = pad(Math.floor(diff / 86400000));
    elHoras.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    elMins.textContent  = pad(Math.floor((diff % 3600000) / 60000));
    elSegs.textContent  = pad(Math.floor((diff % 60000) / 1000));
  }

  // Esperar a que el HTML esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      tick();
      setInterval(tick, 1000);
    });
  } else {
    tick();
    setInterval(tick, 1000);
  }
})();