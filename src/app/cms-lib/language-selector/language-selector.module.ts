import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './language-selector.component';

import { DataModule } from '../../data/data.module';
import { UiFrameworkModule } from '../../ui/ui-framework/ui-framework.module';

// import { MaterialModule } from '@angular/material';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        CommonModule,
        DataModule,
        UiFrameworkModule
        // MaterialModule.forRoot()
    ],
    declarations: [LanguageSelectorComponent],
    entryComponents: [LanguageSelectorComponent],
    exports: [LanguageSelectorComponent]
})
export class LanguageSelectorModule { }
