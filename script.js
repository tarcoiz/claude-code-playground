(() => {
  const displayEl = document.getElementById("display");
  const toggleBtn = document.getElementById("toggleBtn");
  const resetBtn = document.getElementById("resetBtn");

  let startTime = 0;
  let elapsed = 0;
  let rafId = null;
  let running = false;

  const format = (ms) => {
    const totalCs = Math.floor(ms / 10);
    const cs = totalCs % 100;
    const totalSec = Math.floor(totalCs / 100);
    const sec = totalSec % 60;
    const min = Math.floor(totalSec / 60);
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(min)}:${pad(sec)}.${pad(cs)}`;
  };

  const render = () => {
    const ms = running ? elapsed + (performance.now() - startTime) : elapsed;
    displayEl.textContent = format(ms);
  };

  const tick = () => {
    render();
    rafId = requestAnimationFrame(tick);
  };

  const start = () => {
    if (running) return;
    running = true;
    startTime = performance.now();
    tick();
    toggleBtn.textContent = "ストップ";
    toggleBtn.classList.add("running");
    displayEl.classList.add("running");
  };

  const stop = () => {
    if (!running) return;
    running = false;
    elapsed += performance.now() - startTime;
    cancelAnimationFrame(rafId);
    rafId = null;
    render();
    toggleBtn.textContent = "スタート";
    toggleBtn.classList.remove("running");
    displayEl.classList.remove("running");
  };

  const reset = () => {
    running = false;
    elapsed = 0;
    startTime = 0;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    render();
    toggleBtn.textContent = "スタート";
    toggleBtn.classList.remove("running");
    displayEl.classList.remove("running");
  };

  toggleBtn.addEventListener("click", () => {
    if (running) stop();
    else start();
  });

  resetBtn.addEventListener("click", reset);

  render();
})();
