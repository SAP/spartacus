import { NgModule } from '@angular/core';
import { ConfigModule } from '../config/config.module';
import { LoggingService } from './logging.service';

@NgModule({
  imports: [
    ConfigModule.forRoot()
  ],
  providers: [LoggingService]
})
export class LoggingModule { }
