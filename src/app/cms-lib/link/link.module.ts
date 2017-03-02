import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LinkComponent } from './link.component';

import { MaterialModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule.forRoot()
    ],
    declarations: [LinkComponent],
    exports: [LinkComponent],
    entryComponents: [LinkComponent]
})
export class LinkModule { }
