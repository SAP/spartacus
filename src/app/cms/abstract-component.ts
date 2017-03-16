import { ChangeDetectorRef } from '@angular/core';
import { ConfigService } from './config.service';

export abstract class AbstractComponent {

    protected contextParameters: any;

    constructor(
        protected changeDetector: ChangeDetectorRef,
        protected configService: ConfigService
    ) { }

    setContextParameters(contextParameters: any) {
        this.contextParameters = contextParameters;
    }

}
