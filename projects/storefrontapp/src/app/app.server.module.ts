import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';
import { ServerExternalConfigModule } from '@spartacus/core';
import { StorefrontComponent } from '@spartacus/storefront';
// import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    ServerExternalConfigModule.forRoot(),
    // ModuleMapLoaderModule // <-- *Important* to have lazy-loaded routes work
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [StorefrontComponent],
})
export class AppServerModule {}
