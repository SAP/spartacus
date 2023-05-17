import { NgModule } from '@angular/core';
import { ClientLogger } from './client-logger';
import { Logger } from './logger';

@NgModule({
  providers: [
    {
      provide: Logger,
      useClass: ClientLogger,
    },
  ],
})
export class LoggerModule {}
