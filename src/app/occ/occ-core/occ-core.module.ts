import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccCartService } from './cart.service';

@NgModule({
  imports: [CommonModule],
  providers: [OccCartService]
})
export class OccCoreModule {}
