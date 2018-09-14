import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

let addToHomeScreenPrompt;

window.addEventListener('beforeinstallprompt', (e: any) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  addToHomeScreenPrompt = e;
  e.prompt();
});

platformBrowserDynamic().bootstrapModule(AppModule);
