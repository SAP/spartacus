import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdpMyAccountModule } from './cdp-my-account';
import { CdpPageTitleComponent } from './cdp-page-title/cdp-page-title.component';



@NgModule({
  declarations: [
    CdpPageTitleComponent
  ],
  imports: [
    CommonModule,
    CdpMyAccountModule
  ]
})
export class CdpComponentsModule { }
