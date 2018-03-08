import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';

import { CartDetailsComponent } from './cart-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule],
  declarations: [CartDetailsComponent],
  entryComponents: [CartDetailsComponent],
  exports: [CartDetailsComponent]
})
export class CartDetailsModule {}
