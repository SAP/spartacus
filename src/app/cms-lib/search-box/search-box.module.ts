import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';


import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { SearchBoxComponent } from './search-box.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        // FormsModule,
        ReactiveFormsModule,
        MaterialModule.forRoot()
    ],
    declarations: [SearchBoxComponent],
    entryComponents: [SearchBoxComponent],
    exports: [SearchBoxComponent]
})
export class SearchBoxModule { }
