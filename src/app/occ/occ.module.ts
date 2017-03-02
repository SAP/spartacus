import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { OccCmsModule } from './occ-cms/occ-cms.module';
import { OccConfigService} from './occ-config.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        OccCmsModule
    ],
    providers: [
        OccConfigService
    ],
    exports: [
        // OccCmsModule
    ],
    declarations: []
})
export class OccModule {
    static forRoot(settings: any): any {
        return {
            ngModule: OccModule,
            providers: [
                {provide: OccConfigService, useValue: settings }
            ]
        };
    }
}
