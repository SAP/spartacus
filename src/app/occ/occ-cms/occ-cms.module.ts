import { NgModule } from '@angular/core';
import { ConfigService } from '../config.service';
import { OccCmsService } from './occ-cms.service';

@NgModule({
    schemas:   [],
    imports: [
    ],
    declarations: [
    ],
    providers: [
        OccCmsService,
        ConfigService
    ],
    exports: []
})
export class OccCmsModule {
    static forRoot(config: any): any {
        return {
            ngModule: OccCmsModule,
            providers: [
                {
                    provide: ConfigService,
                    useExisting: config
                }
            ]
        };
    }
}
