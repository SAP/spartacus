let ATHSPrompt = {
  canPrompt: false,
  prompt: function() {
    return false;
  }
};

function enableATHS(auto: boolean = false) {
  window.addEventListener('beforeinstallprompt', (e: any) => {
    e.preventDefault();
    ATHSPrompt = e;
    ATHSPrompt.canPrompt = true;
    if (auto) {
      ATHSPrompt.prompt();
    }
  });
}

export { enableATHS, ATHSPrompt };
