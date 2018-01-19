import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { CategoryNavigationComponent } from './category-navigation.component';

import { NewCmsModule } from '../../newcms/newcms.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        NewCmsModule
    ],
    declarations: [CategoryNavigationComponent],
    entryComponents: [CategoryNavigationComponent],
    exports: [CategoryNavigationComponent]
})
export class CategoryNavigationModule { }
