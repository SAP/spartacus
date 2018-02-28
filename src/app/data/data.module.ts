import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenService } from './token.service';

import { ModelService } from './model.service';

import { CartModelService } from './cart-model.service';
import { CartLoaderService } from './cart-loader.service';

import { ConfigService } from './config.service';

// import { OccModule } from '../occ/occ.module';

@NgModule({
  imports: [CommonModule],
  providers: [TokenService, ModelService, CartModelService, CartLoaderService]
})
export class DataModule {
  static forRoot(config: any): any {
    return {
      ngModule: DataModule,
      providers: [
        {
          provide: ConfigService,
          useExisting: config
        }
      ]
    };
  }
}
