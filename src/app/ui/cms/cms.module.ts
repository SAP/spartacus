import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataModule } from '../../data/data.module';
import { DynamicSlotComponent } from './dynamic-slot/dynamic-slot.component';
import { ComponentWrapperComponent } from './component-wrapper/component-wrapper.component';
import { ComponentMapperService } from './component-mapper.service';

import { CmsComponentsModule } from './components/cms-components.module';

@NgModule({
    imports: [
        CommonModule,
        DataModule,
        CmsComponentsModule
    ],
    declarations: [
        DynamicSlotComponent,
        ComponentWrapperComponent
    ],
    providers: [
        ComponentMapperService
    ],
    exports: [
        DynamicSlotComponent
    ]
})
export class CmsModule { }
