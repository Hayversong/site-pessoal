// Efeitos de jogo retrô. Tudo é disparado por evento ou pelo relógio de baixa
// frequência abaixo: nenhuma animação CSS fica rodando para sempre, o que
// mantém o Firefox (e a bateria do celular) tranquilos com a página parada.

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Relógio de 8 quadros por segundo, como os sprites de 16 bits.
// A cada 4 quadros alterna html[data-beat] entre 0 e 1 (piscadas e cursores).
const FRAME_MS = 125;
type FrameListener = (tick: number) => void;
const listeners = new Set<FrameListener>();
let timer = 0;
let tick = 0;
let users = 0;

function runTick() {
  tick += 1;
  if (tick % 4 === 0) {
    document.documentElement.dataset.beat = String((tick / 4) % 2);
  }
  listeners.forEach((listener) => listener(tick));
}

function syncTimer() {
  const shouldRun = users > 0 && !document.hidden;
  if (shouldRun && !timer) timer = window.setInterval(runTick, FRAME_MS);
  if (!shouldRun && timer) {
    window.clearInterval(timer);
    timer = 0;
  }
}

export function startRetroClock() {
  if (prefersReducedMotion()) return () => {};
  users += 1;
  syncTimer();
  document.addEventListener('visibilitychange', syncTimer);
  return () => {
    users -= 1;
    syncTimer();
    document.removeEventListener('visibilitychange', syncTimer);
    if (users === 0) delete document.documentElement.dataset.beat;
  };
}

export function onRetroFrame(listener: FrameListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Camada fixa para faíscas e textos flutuantes.
function fxLayer() {
  let layer = document.getElementById('fx-layer');
  if (!layer) {
    layer = document.createElement('div');
    layer.id = 'fx-layer';
    layer.className = 'fx-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.append(layer);
  }
  return layer;
}

function removeOnEnd(element: HTMLElement) {
  element.addEventListener('animationend', () => element.remove(), {
    once: true,
  });
}

const sparkColors = ['var(--xp)', 'var(--primary)', 'var(--ember)'];

// Faíscas quadradas saindo do ponto do clique.
export function burst(x: number, y: number, count = 6) {
  if (prefersReducedMotion()) return;
  const layer = fxLayer();
  for (let index = 0; index < count; index += 1) {
    const angle = (index / count) * Math.PI * 2 + Math.random() * 0.6;
    const distance = 18 + Math.random() * 16;
    const spark = document.createElement('span');
    spark.className = 'fx-spark';
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty(
      '--dx',
      `${Math.round(Math.cos(angle) * distance)}px`,
    );
    spark.style.setProperty(
      '--dy',
      `${Math.round(Math.sin(angle) * distance)}px`,
    );
    spark.style.setProperty('--c', sparkColors[index % sparkColors.length]);
    removeOnEnd(spark);
    layer.append(spark);
  }
}

// Texto que sobe e some, como o dano ou o item ganho num RPG.
export function popText(x: number, y: number, text: string) {
  if (prefersReducedMotion()) return;
  const label = document.createElement('span');
  label.className = 'fx-pop';
  label.textContent = text;
  label.style.left = `${x}px`;
  label.style.top = `${y}px`;
  removeOnEnd(label);
  fxLayer().append(label);
}

// Transição de "entrada em batalha": blocos fecham a tela das bordas para o
// centro, a ação acontece com a tela coberta e os blocos abrem de novo.
let warping = false;
const STEP_MS = 14;
const CELL_MS = 200;
const ARRIVAL_KEY = 'warp-arrival';

function buildWarp(phase?: 'out') {
  const size = window.innerWidth < 640 ? 48 : 72;
  const cols = Math.ceil(window.innerWidth / size);
  const rows = Math.ceil(window.innerHeight / size);
  const centerX = (cols - 1) / 2;
  const centerY = (rows - 1) / 2;
  const maxDistance = Math.ceil(centerX + centerY);

  const overlay = document.createElement('div');
  overlay.className = 'warp';
  overlay.setAttribute('aria-hidden', 'true');
  if (phase) overlay.dataset.phase = phase;
  overlay.style.setProperty('--cols', String(cols));
  overlay.style.setProperty('--size', `${size}px`);
  overlay.style.setProperty('--max', String(maxDistance));

  const fragment = document.createDocumentFragment();
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cell = document.createElement('i');
      const fromCenter = Math.round(
        Math.abs(col - centerX) + Math.abs(row - centerY),
      );
      cell.style.setProperty('--d', String(maxDistance - fromCenter));
      fragment.append(cell);
    }
  }
  overlay.append(fragment);
  document.body.append(overlay);

  return { overlay, duration: CELL_MS + maxDistance * STEP_MS + 40 };
}

function openWarp(overlay: HTMLElement, duration: number) {
  overlay.dataset.phase = 'out';
  window.setTimeout(() => {
    overlay.remove();
    warping = false;
  }, duration);
}

export function warp(onCovered: () => void) {
  if (warping) return;
  if (prefersReducedMotion()) {
    onCovered();
    return;
  }
  warping = true;
  const { overlay, duration } = buildWarp();
  window.setTimeout(() => {
    onCovered();
    openWarp(overlay, duration);
  }, duration);
}

// Troca de página: fecha a tela aqui e a nova página abre com warpArrival().
export function warpTo(href: string) {
  if (prefersReducedMotion()) {
    window.location.assign(href);
    return;
  }
  if (warping) return;
  warping = true;
  const { duration } = buildWarp();
  window.setTimeout(() => {
    try {
      sessionStorage.setItem(ARRIVAL_KEY, '1');
    } catch {
      // Sem sessionStorage a nova página só abre sem a animação.
    }
    window.location.assign(href);
  }, duration);
}

// O script no <head> marca html[data-warp="arriving"] e a tela já nasce coberta.
export function warpArrival() {
  const root = document.documentElement;
  if (root.dataset.warp !== 'arriving') return;
  delete root.dataset.warp;
  if (prefersReducedMotion()) return;
  warping = true;
  const { overlay, duration } = buildWarp('out');
  window.setTimeout(() => {
    overlay.remove();
    warping = false;
  }, duration);
}

// Voltando pelo histórico, o navegador pode restaurar a página com a tela ainda fechada.
export function clearWarp() {
  document.querySelectorAll('.warp').forEach((overlay) => overlay.remove());
  delete document.documentElement.dataset.warp;
  warping = false;
}
