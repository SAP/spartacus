import { PipeTransform } from '@angular/core';
import { SemanticPathService } from './semantic-path.service';
import { UrlCommands } from './url-command';
import * as i0 from "@angular/core";
export declare class UrlPipe implements PipeTransform {
    private urlService;
    constructor(urlService: SemanticPathService);
    transform(commands: UrlCommands): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<UrlPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<UrlPipe, "cxUrl", false>;
}
