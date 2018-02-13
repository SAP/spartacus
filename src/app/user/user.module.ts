import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';
import { ConfigService } from '../newocc/config.service';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature(effects)
  ],
  // providers: [
  //   ConfigService,
  //   // {
  //   //   provide: HTTP_INTERCEPTORS,
  //   //   useClass: [Name of the Interceptor],
  //   //   multi: true
  //   // }
  // ]
  declarations: []
})
export class UserModule {
  static forRoot(config: any): any {
    return {
      ngModule: UserModule,
      providers: [
        {
          provide: ConfigService,
          useExisting: config
        }
      ]
    };
  }
}


