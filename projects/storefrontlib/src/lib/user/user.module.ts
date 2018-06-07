import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { metaReducers } from './store/reducers';
import * as fromGuards from './guards';
import { LoginModule } from './components/login/login.module';
import { effects, reducers } from './store';
import { UserTokenInterceptor } from './http-interceptors/user-token.interceptor';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    LoginModule,
    ReactiveFormsModule,
    StoreModule.forFeature('user', reducers, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  declarations: [RegisterComponent],
  providers: [
    ...fromGuards.guards,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserTokenInterceptor,
      multi: true
    }
  ],
  exports: [RegisterComponent]
})
export class UserModule {}
