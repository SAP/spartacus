import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { reducerToken, reducerProvider } from './reducers/index';
import { CAPTCHA_FEATURE } from './captcha-state';
import { StateModule } from '../../state/state.module';

@NgModule({
  imports: [StateModule, StoreModule.forFeature(CAPTCHA_FEATURE, reducerToken)],
  providers: [reducerProvider],
})
export class CaptchaStoreModule {}
