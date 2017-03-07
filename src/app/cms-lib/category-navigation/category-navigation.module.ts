import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { CategoryNavigationComponent } from './category-navigation.component';

import { CmsModule } from '../../cms/cms.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule.forRoot(),
        CmsModule
    ],
    declarations: [CategoryNavigationComponent],
    entryComponents: [CategoryNavigationComponent],
    exports: [CategoryNavigationComponent]
})
export class CategoryNavigationModule { }
