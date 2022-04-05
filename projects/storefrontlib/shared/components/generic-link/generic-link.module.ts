import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GenericLinkComponent } from './generic-link.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [GenericLinkComponent],
  exports: [GenericLinkComponent],
})
export class GenericLinkModule {}
