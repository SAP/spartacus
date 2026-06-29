import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from '@spartacus/storefront';
import { bffExampleProviders } from './bff/examples/bff-example.providers';
import { SpartacusModule } from './spartacus/spartacus.module';

@NgModule({
  imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), AppRoutingModule, SpartacusModule],
  providers: [bffExampleProviders],
})
export class AppModule {}
