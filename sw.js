// Service Worker placeholder para evitar errores 404 al registrar
// Este sw es muy simple y no implementa caching avanzado. Se puede extender
// más tarde si se desea funcionalidad PWA completa.

self.addEventListener('install', (event) => {
  // Activar inmediatamente
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Responder con 404 o con simple mensaje para requests que no existan
// No se registra fetch handler para evitar overhead en navegación.
// Si en el futuro se desea control de caché, implementar estrategias aquí.

// Nota: Este archivo es un placeholder. Para una PWA real, se deben agregar
// estrategias de cache y manejo de versiones.
