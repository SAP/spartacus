import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericLinkComponent } from './generic-link.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [GenericLinkComponent],
  exports: [GenericLinkComponent]
})
export class GenericLinkModule {}
