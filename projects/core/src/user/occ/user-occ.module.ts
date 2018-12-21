import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccModule } from '../../occ/occ.module';
import { OccUserService } from './user.service';
import { OccOrderService } from './order.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, OccModule],
  providers: [OccUserService, OccOrderService]
})
export class UserOccModule {}
