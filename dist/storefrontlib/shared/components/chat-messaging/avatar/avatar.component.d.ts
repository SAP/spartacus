import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { MessageEvent } from '../messaging/messaging.model';
import * as i0 from "@angular/core";
export declare class AvatarComponent {
    message: MessageEvent;
    iconTypes: typeof ICON_TYPE;
    getInitials(author: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AvatarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AvatarComponent, "cx-avatar", never, { "message": "message"; }, {}, never, never, false, never>;
}
