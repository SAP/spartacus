import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { enableATHS, ATHSPrompt } from 'storefrontlib';

if (environment.production) {
  enableProdMode();
}

enableATHS(true);

if (ATHSPrompt.prompt) {
  // show ATHS promp wheneber you can
  ATHSPrompt.prompt();
}
platformBrowserDynamic().bootstrapModule(AppModule);
