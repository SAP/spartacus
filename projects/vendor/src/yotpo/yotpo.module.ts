import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YotporeviewComponent } from './yotporeview/yotporeview.component';
import { YotpostarratingComponent } from './yotpostarrating/yotpostarrating.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [YotporeviewComponent, YotpostarratingComponent],
  declarations: [YotporeviewComponent, YotpostarratingComponent]
})
export class YotpoModule { }
