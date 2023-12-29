export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service worker not available in the browser");
  }
  await navigator.serviceWorker.register("/serviceWorker.js");
}

export async function getReadyServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service worker not available in the browser");
  }
  return await navigator.serviceWorker.ready;
}
