import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
// import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { StorefrontComponent } from '@spartacus/storefront';

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
    ServerTransferStateModule
    // ModuleMapLoaderModule // <-- *Important* to have lazy-loaded routes work
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [StorefrontComponent]
})
export class AppServerModule {}
