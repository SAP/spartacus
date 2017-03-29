import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataModule } from '../data/data.module';
import { DynamicSlotComponent } from './dynamic-slot/dynamic-slot.component';
import { ComponentWrapperComponent } from './component-wrapper/component-wrapper.component';
import { ComponentMapperService } from './component-mapper.service';

import { ConfigService } from './config.service';

@NgModule({
    imports: [
        CommonModule,
        DataModule
        // FlexLayoutModule
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
    static forRoot(config: any): any {
        return {
            ngModule: CmsModule,
            providers: [
                {
                    provide: ConfigService,
                    useExisting: config
                }
            ]
        };
    }
}
