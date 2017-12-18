import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { CategoryNavigationComponent } from './category-navigation.component';

import { CmsModule } from '../../cms/cms.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        MaterialModule.forRoot(),
        CmsModule
    ],
    declarations: [CategoryNavigationComponent],
    entryComponents: [CategoryNavigationComponent],
    exports: [CategoryNavigationComponent]
})
export class CategoryNavigationModule { }
