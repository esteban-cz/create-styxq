self.addEventListener("install", (event) => {
  console.log("Service Worker installing.")
})

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.")
})

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request))
})

self.addEventListener("push", (event) => {
  const data = event.data?.json() || {}
  const title = data.title || "New notification"
  const options = {
    body: data.body || "",
    icon: data.icon || "/img/logo.png",
    data: data.url || "/",
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  const url = event.notification.data
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientsArr) => {
        for (const client of clientsArr) {
          if (client.url === url && "focus" in client) return client.focus()
        }
        if (clients.openWindow) return clients.openWindow(url)
      }),
  )
})
