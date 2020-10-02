import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { defaultKymaConfig } from './config/default-kyma-config';
import { KymaStoreModule } from './store/kyma-store.module';
import { provideDefaultConfig } from '../config/config-providers';

@NgModule({
  imports: [CommonModule, HttpClientModule, KymaStoreModule],
  providers: [provideDefaultConfig(defaultKymaConfig)],
})
export class KymaModule {}
