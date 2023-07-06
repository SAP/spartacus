import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {HttpErrorDispatcher} from "./http-error.dispatcher";

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorDispatcher,
      multi: true,
    },
  ],
})
export class HttpErrorDispatcherModule {}
