import { NgModule } from '@angular/core';
import { interceptors } from './http-interceptors/index';

@NgModule({
  providers: [...interceptors],
})
export class SmartEditCoreModule {}
