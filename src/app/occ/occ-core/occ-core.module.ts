import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccCartService } from './cart.service';

import { OccUserService } from '../../newocc/user.service';

import { ConfigService } from '../config.service';

@NgModule({
  imports: [CommonModule],
  providers: [OccUserService, OccCartService]
})
export class OccCoreModule {
  static forRoot(config: any): any {
    return {
      ngModule: OccCoreModule,
      providers: [
        {
          provide: ConfigService,
          useExisting: config
        }
      ]
    };
  }
}
