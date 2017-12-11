import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { CategoryNavigationComponent } from './category-navigation.component';

import { CmsModule } from '../../cms/cms.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        CmsModule
    ],
    declarations: [CategoryNavigationComponent],
    entryComponents: [CategoryNavigationComponent],
    exports: [CategoryNavigationComponent]
})
export class CategoryNavigationModule { }
