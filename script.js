(() => {
  const displayEl = document.getElementById("display");
  const segMin = displayEl.querySelector(".seg-min");
  const segSec = displayEl.querySelector(".seg-sec");
  const segCs = displayEl.querySelector(".seg-cs");
  const toggleBtn = document.getElementById("toggleBtn");
  const toggleLabel = toggleBtn.querySelector(".label");
  const resetBtn = document.getElementById("resetBtn");

  let startTime = 0;
  let elapsed = 0;
  let rafId = null;
  let running = false;

  const pad = (n) => String(n).padStart(2, "0");

  const render = () => {
    const ms = running ? elapsed + (performance.now() - startTime) : elapsed;
    const totalCs = Math.floor(ms / 10);
    const cs = totalCs % 100;
    const totalSec = Math.floor(totalCs / 100);
    const sec = totalSec % 60;
    const min = Math.floor(totalSec / 60);
    segMin.textContent = pad(min);
    segSec.textContent = pad(sec);
    segCs.textContent = pad(cs);
  };

  const tick = () => {
    render();
    rafId = requestAnimationFrame(tick);
  };

  const setRunningUI = (isRunning) => {
    document.body.classList.toggle("is-running", isRunning);
    toggleBtn.classList.toggle("running", isRunning);
    toggleLabel.textContent = isRunning
      ? toggleLabel.dataset.stop
      : toggleLabel.dataset.start;
    toggleBtn.setAttribute(
      "aria-label",
      isRunning ? "ストップ" : "スタート"
    );
  };

  const start = () => {
    if (running) return;
    running = true;
    startTime = performance.now();
    tick();
    setRunningUI(true);
  };

  const stop = () => {
    if (!running) return;
    running = false;
    elapsed += performance.now() - startTime;
    cancelAnimationFrame(rafId);
    rafId = null;
    render();
    setRunningUI(false);
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
    setRunningUI(false);
  };

  toggleBtn.addEventListener("click", () => {
    if (running) stop();
    else start();
  });

  resetBtn.addEventListener("click", reset);

  render();
})();
