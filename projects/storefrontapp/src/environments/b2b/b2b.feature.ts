import { FeatureEnvironment } from '../models/feature.model';
import { SpartacusModule } from './spartacus/spartacus.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

export const b2bFeature: FeatureEnvironment = {
  imports: [
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SpartacusModule,
  ],
};
