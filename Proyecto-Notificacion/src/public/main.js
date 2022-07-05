const PUBLIC_VAPID_KEY =
  "BKrdd0Z_ZxGnYgppzBJ8NTL2mFDhvxrfD_RQy4ocvSPjOnhZ1CK4Nam5G7Ys-45w5-2gzKIS4aiCeBWSHDR4LNQ";

const subscription = async () => {
  // Service Worker
  console.log("Registrando un Service worker");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  console.log("Nuevo Service Worker");

  // Escuchando el Push Notifications
  console.log("Escuchando el  Push Notifications");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  });

  console.log(subscription);

  // Send Notification
  await fetch("/subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log("Suscrito!");
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// UI
const form = document.querySelector('#myform');
const message = document.querySelector('#message');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('/new-message', {
    method: 'POST',
    body: JSON.stringify({message: message.value}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  form.reset();
});

//  Apoyo Service Worker 
if ("serviceWorker" in navigator) {
  subscription().catch(err => console.log(err));
}
