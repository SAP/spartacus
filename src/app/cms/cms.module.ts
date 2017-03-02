import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataModule } from '../data/data.module';
import { DynamicSlotComponent } from './dynamic-slot/dynamic-slot.component';
import { ComponentWrapperComponent } from './component-wrapper/component-wrapper.component';
import { ComponentMapperService } from './component-mapper.service';


import { ComponentMapperConfigService } from './component-mapper-config.service';

@NgModule({
    imports: [
        CommonModule,
        DataModule
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
export class CmsModule {
    static forRoot(componentMapping: any): any {
        return {
            ngModule: CmsModule,
            providers: [
                {provide: ComponentMapperConfigService, useValue: componentMapping }
            ]
        };
    }
}
