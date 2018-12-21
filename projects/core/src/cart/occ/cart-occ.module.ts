import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccCartService } from './cart.service';
import { OccModule } from '../../occ/occ.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, OccModule],
  providers: [OccCartService]
})
export class CartOccModule {}
