// // @ts-check

// self.addEventListener("push", () => {
//   console.log("Push received");
// })


// // @ts-check

/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = /** @type {ServiceWorkerGlobalScope & typeof globalThis} */ {
  globalThis,
};

sw.addEventListener("push", (event) => {
  console.log('Push received hree');
  const message = event.data?.json();
  const { title, body, icon, image, chatId } = message;
  console.log("Push received", message);

  async function handlePushEvent() {
    const windowClients = await sw.clients.matchAll({ type: "window" });

    if (windowClients.length > 0) {
      const appInForeground = windowClients.some((client) => client.focused);
      if (appInForeground) {
        console.log("App is in foreground, don't show notification");
        return;
      }
      await sw.registeration.showNotification(title, {
        body,
        icon,
        image,
        badge: "/logo.png",
        actions: [{title: "Open Chat", action: 'open_chat'}],
        tag: chatId,
        renotify: true,
        data: message,
      });
    }
  }

  event.waitUntil(handlePushEvent());
});

sw.addEventListener("notificationclick", (event) => {
  const notification = event.notification;
  notification.close()
  async function handleNotificationClick() {
    const windowClients = await sw.clients.matchAll({ type: "window", includeUncontrolled: true });

    const chatId = notification.data.chatId;
    if (windowClients.length > 0) {
      await windowClients[0].focus()
      windowClients[0].postMessage({ chatId })
    }else{
      sw.clients.openWindow(`/chat?chatId=${chatId}`)
    }
  }
  event.waitUntil(handleNotificationClick());
})
