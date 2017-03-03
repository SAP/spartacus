import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';

import { MaterialModule } from '@angular/material';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule.forRoot()
    ],
    declarations: [BreadcrumbComponent],
    entryComponents: [BreadcrumbComponent],
    exports: [BreadcrumbComponent]
})
export class BreadcrumbModule { }
