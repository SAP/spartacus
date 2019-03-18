import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YotporeviewComponent } from './yotporeview/yotporeview.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [YotporeviewComponent],
  declarations: [YotporeviewComponent]
})
export class YotpoModule { }
