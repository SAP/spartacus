import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { defaultKymaConfig } from './config/default-kyma-config';
import { KymaStoreModule } from './store/kyma-store.module';
import { provideDefaultConfig } from '../config/config-providers';

@NgModule({
  imports: [CommonModule, KymaStoreModule],
  providers: [provideDefaultConfig(defaultKymaConfig)],
})
export class KymaModule {}
