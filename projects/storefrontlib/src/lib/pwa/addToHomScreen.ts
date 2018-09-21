declare global {
  interface Window {
    addToHomeScreen: any;
  }
}
function enableATHS() {
  window.addToHomeScreen = window.addToHomeScreen || {};
  window.addToHomeScreen.isAvailable = false;

  window.addEventListener('beforeinstallprompt', function(e: any) {
    e.preventDefault();
    window.addToHomeScreen = e;
    window.addToHomeScreen.isAvailable = true;
  });
}

export { enableATHS };
