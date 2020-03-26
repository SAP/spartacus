import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Config, provideDefaultConfig } from '../config/config.module';
import { defaultKymaConfig } from './config/default-kyma-config';
import { KymaConfig } from './config/kyma-config';
import { KymaServices } from './services/index';
import { KymaStoreModule } from './store/kyma-store.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, KymaStoreModule],
  providers: [
    provideDefaultConfig(defaultKymaConfig),
    ...KymaServices,
    { provide: KymaConfig, useExisting: Config },
  ],
})
export class KymaModule {}
