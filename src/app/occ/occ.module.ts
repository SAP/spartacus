import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { OccCmsModule } from './occ-cms/occ-cms.module';
import { ConfigService} from './config.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        OccCmsModule
    ],
    providers: [
        ConfigService
    ]
})
export class OccModule {
    static forRoot(settings: any): any {
        return {
            ngModule: OccModule,
            providers: [
                {provide: ConfigService, useValue: settings }
            ]
        };
    }
}
