import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { MediaModule } from '../../ui/components/media/media.module';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'; 
import { SearchBoxComponent } from './search-box.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialModule.forRoot(),
        FlexLayoutModule,
        MediaModule
    ],
    declarations: [SearchBoxComponent],
    entryComponents: [SearchBoxComponent],
    exports: [SearchBoxComponent]
})
export class SearchBoxModule { }
