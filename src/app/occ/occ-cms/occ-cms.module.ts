import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../config.service';
import { OccCmsService } from './occ-cms.service';
import { StubService } from './stub.service';

@NgModule({
    schemas:   [],
    imports: [
        BrowserModule,
        CommonModule
    ],
    declarations: [
    ],
    providers: [
        OccCmsService,
        StubService,
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
