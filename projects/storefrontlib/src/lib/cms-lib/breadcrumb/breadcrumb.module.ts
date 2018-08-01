import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';

import { MaterialModule } from '../../material.module';
@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [BreadcrumbComponent],
  entryComponents: [BreadcrumbComponent],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule {}
