import { FeatureEnvironment } from '../models/feature.model';
import { SpartacusModule } from './spartacus/spartacus.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';

export const b2cFeature: FeatureEnvironment = {
  imports: [
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SpartacusModule,
  ],
};
