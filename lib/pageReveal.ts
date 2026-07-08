type Listener = () => void;

let pageRevealed = true;
const listeners = new Set<Listener>();

export function getPageRevealed() {
  return pageRevealed;
}

export function setPageRevealed(revealed: boolean) {
  pageRevealed = revealed;
  if (revealed) {
    listeners.forEach((listener) => listener());
  }
}

export function onPageReveal(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
