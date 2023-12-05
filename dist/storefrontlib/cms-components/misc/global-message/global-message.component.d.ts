import { OnInit } from '@angular/core';
import { GlobalMessageEntities, GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import * as i0 from "@angular/core";
export declare class GlobalMessageComponent implements OnInit {
    protected globalMessageService: GlobalMessageService;
    iconTypes: typeof ICON_TYPE;
    messages$: Observable<GlobalMessageEntities>;
    messageType: typeof GlobalMessageType;
    constructor(globalMessageService: GlobalMessageService);
    ngOnInit(): void;
    clear(type: GlobalMessageType, index: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlobalMessageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GlobalMessageComponent, "cx-global-message", never, {}, {}, never, never, false, never>;
}
