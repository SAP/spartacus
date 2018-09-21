let ATHSPrompt = {
  canPrompt: false,
  prompt: function() {
    return false;
  }
};

function enableATHS() {
  window.addEventListener('beforeinstallprompt', (e: any) => {
    e.preventDefault();
    ATHSPrompt = e;
    ATHSPrompt.canPrompt = true;
  });
}

export { enableATHS, ATHSPrompt };
