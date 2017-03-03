import { ChangeDetectorRef } from '@angular/core';
import { ConfigService } from './config.service';

export abstract class AbstractComponent {

    constructor(
        private changeDetector: ChangeDetectorRef,
        protected configService: ConfigService
    ) { }
}
