import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DataModule } from '../data/data.module';
import { DynamicSlotComponent } from './dynamic-slot/dynamic-slot.component';
import { ComponentWrapperComponent } from './component-wrapper/component-wrapper.component';
import { ComponentMapperService } from './component-mapper.service';

import { ConfigService } from './config.service';
import { ComponentMapperConfigService } from './component-mapper-config.service';

@NgModule({
    imports: [
        CommonModule,
        DataModule,
        FlexLayoutModule
    ],
    declarations: [
        DynamicSlotComponent,
        ComponentWrapperComponent
    ],
    providers: [
        ComponentMapperService
    ],
    exports: [
        DynamicSlotComponent,
        ComponentWrapperComponent
    ]
})
export class CmsModule {
    static forRoot(settings: any, componentMapping: any): any {
        return {
            ngModule: CmsModule,
            providers: [
                {
                    provide: ConfigService, useValue: settings
                },
                {
                    provide: ComponentMapperConfigService, useValue: componentMapping
                }
            ]
        };
    }
}
