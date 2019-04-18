import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OccModule } from '../../occ/occ.module';
import { CartAdapter } from '../connectors/cart.adapter';
import { OccCartAdapter } from './occ-cart.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule, OccModule],
  providers: [
    {
      provide: CartAdapter,
      useClass: OccCartAdapter,
    },
  ],
})
export class CartOccModule {}
