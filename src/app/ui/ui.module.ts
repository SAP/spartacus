import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from './layout/layout.module';
import { TemplatesModule } from './templates/templates.module';
import { CmsModule } from './cms/cms.module';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        TemplatesModule,
        CmsModule
    ],
    exports: [
        LayoutModule
    ],
    declarations: []
})
export class UiModule { }
