import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServer } from '@spartacus/setup/ssr';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [
    ...provideServer({
      serverRequestOrigin: process.env['SERVER_REQUEST_ORIGIN'],
    }),
  ],
})
export class AppServerModule {}
