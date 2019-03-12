import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YotporeviewComponent } from './yotporeview/yotporeview.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [YotporeviewsComponent],
  declarations: [YotporeviewComponent]
})
export class YotpoModule { }
