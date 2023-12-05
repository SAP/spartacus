import { EntitiesModel } from '@spartacus/core';
import { TableStructure } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ListComponent } from '../list/list.component';
import { MessageService } from '../message/services/message.service';
import * as i0 from "@angular/core";
export declare class SubListComponent extends ListComponent {
    hostClass: string;
    messageService: MessageService;
    previous: boolean | string;
    key: string;
    showHint?: boolean | undefined;
    set routerKey(key: string);
    hasGhostData: boolean;
    subKey$: Observable<string>;
    readonly listData$: Observable<EntitiesModel<any> | undefined>;
    readonly dataStructure$: Observable<TableStructure>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SubListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SubListComponent, "cx-org-sub-list", never, { "previous": "previous"; "key": "key"; "showHint": "showHint"; "routerKey": "routerKey"; }, {}, never, ["[actions]", "[main]", "[info]"], false, never>;
}
