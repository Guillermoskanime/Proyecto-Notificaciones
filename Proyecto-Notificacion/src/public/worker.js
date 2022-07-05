console.log('Service Worker Works');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log(data)
    console.log('Notificacion Recibida');
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'https://w7.pngwing.com/pngs/855/697/png-transparent-bell-notification-communication-information-icon-thumbnail.png'
    });
});