import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { OccCmsModule } from './occ-cms/occ-cms.module';
import { OccCoreModule } from './occ-core/occ-core.module';
import { ConfigService} from './config.service';


// add a custom http client so that we can intercept every call and
// provide the access token
import { HttpClient } from './http-client';
import { RequestOptions, Http, XHRBackend} from '@angular/http';
function httpClientFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new HttpClient(xhrBackend, requestOptions);
}

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        OccCoreModule,
        OccCmsModule
    ],
    providers: [
        ConfigService,
        { provide: Http, useFactory: httpClientFactory, deps: [XHRBackend, RequestOptions]}
    ]
})
export class OccModule {
    static forRoot(settings: any): any {
        return {
            ngModule: OccModule,
            providers: [
                {
                    provide: ConfigService,
                    useValue: settings
                }
            ]
        };
    }
}
