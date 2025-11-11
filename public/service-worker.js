// // Force immediate activation of new version
// self.addEventListener("install", () => {
//   self.skipWaiting();
// });
// // Claim control of clients right after activation
// self.addEventListener("activate", (event) => {
//   event.waitUntil(self.clients.claim());
// });