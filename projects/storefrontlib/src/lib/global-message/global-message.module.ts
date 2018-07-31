import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { reducers } from './store';
import { GlobalMessageComponent } from './components/global-messsage.component';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('globalMessage', reducers)],
  declarations: [GlobalMessageComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  exports: [GlobalMessageComponent]
})
export class GlobalMessageModule {}
