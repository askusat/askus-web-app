// // @ts-check

/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = /** @type {ServiceWorkerGlobalScope & typeof globalThis} */ {
  globalThis,
};

// self.addEventListener("push", (event) => {
//   console.log("alk push received");
//   // const message = event.data?.json();
//   // const { title, body, icon, image, chatId } = message;
//   // console.log("message:");
//   console.log(event);

//   const data = event.data?.json() ?? {};
//   const { body, icon, image, chatId } = data;
//   const title = data?.title || "Something Has Happened";
//   const message =
//     data?.message || "Here's something you might want to check out.";
//   // const icon = "http://localhost:3000/logo.svg";

//   const options = {
//     body: message,
//     tag: chatId,
//     icon,
//     badge: "/logo.png",
//     actions: [{ title: "Open Chat", action: "open_chat" }],
//     renotify: true,
//     data,
//   };

//   async function handlePushEvent() {
//     const windowClients = await sw?.clients?.matchAll({ type: "window" });

//     if (windowClients.length > 0) {
//       const appInForeground = windowClients.some((client) => client.focused);
//       if (appInForeground) {
//         console.log("App is in foreground, don't show notification");
//         return;
//       }
//       await sw.registeration.showNotification(title, {
//         body,
//         icon,
//         image,
//         badge: "/logo.png",
//         actions: [{ title: "Open Chat", action: "open_chat" }],
//         tag: chatId,
//         renotify: true,
//         data: message,
//       });
//     }
//   }

//   event.waitUntil(handlePushEvent());

//   console.log("title, options");
//   console.log(title, options);

//   const notification = new self.Notification(title, options);

//   notification.addEventListener("click", () => {
//     clients.openWindow(
//       "https://example.blog.com/2015/03/04/something-new.html"
//     );
//   });
// });

self.addEventListener("push", (event) => {
  console.log('sw js push', event);
  const data = event.data?.json() ?? {};

  console.log("data: ");
  console.log(data);

  const { body, icon, image, chatId } = data;
  const title = data?.title || "Something Has Happened";
  const message =
    body || "Here's something you might want to check out.";
  // const icon = "http://localhost:3000/logo.svg";

  const options = {
    body: message,
    tag: chatId,
    icon,
    image,
    badge: "/logo.png",
    actions: [{ title: "Open Chat", action: "open_chat" }],
    renotify: true,
    data,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
