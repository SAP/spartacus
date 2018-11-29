import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { reducerToken, reducerProvider } from './store/reducers/index';
import { GlobalMessageService } from './facade/global-message.service';
import { GlobalMessageComponent } from './components/global-messsage.component';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('globalMessage', reducerToken)
  ],
  declarations: [GlobalMessageComponent],
  providers: [
    reducerProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    GlobalMessageService
  ],
  exports: [GlobalMessageComponent]
})
export class GlobalMessageModule {}
