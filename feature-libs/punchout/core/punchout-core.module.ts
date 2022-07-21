import { NgModule } from '@angular/core';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  imports: [],
  providers: [...facadeProviders],
})
export class PunchoutCoreModule {}
