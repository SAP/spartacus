import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterNavigationComponent } from './footer-navigation.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FooterNavigationComponent],
  entryComponents: [FooterNavigationComponent],
  exports: [FooterNavigationComponent]
})
export class FooterNavigationModule {}
