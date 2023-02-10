import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdpMyAccountComponent } from './cdp-my-account.component';



@NgModule({
  declarations: [
    // CdpMyAccountComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
     { path: 'my-account',component: CdpMyAccountComponent }
    ])
  ]
})
export class CdpMyAccountModule { }
