import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccCartService } from './cart.service';

import { OccUserService } from './user.service';

@NgModule({
  imports: [CommonModule],
  providers: [OccUserService, OccCartService]
})
export class OccCoreModule {}
