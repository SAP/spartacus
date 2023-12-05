import { EventEmitter } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import * as i0 from "@angular/core";
export declare class MessageComponent {
    text: string;
    actionButtonText: string;
    actionButtonMessage: string;
    accordionText: string;
    showBody: boolean;
    isVisibleCloseButton: boolean;
    type: GlobalMessageType;
    closeMessage: EventEmitter<void>;
    buttonAction: EventEmitter<void>;
    iconTypes: typeof ICON_TYPE;
    constructor();
    get getCssClassesForMessage(): Record<string, boolean>;
    get getIconType(): ICON_TYPE;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessageComponent, "cx-message", never, { "text": "text"; "actionButtonText": "actionButtonText"; "actionButtonMessage": "actionButtonMessage"; "accordionText": "accordionText"; "showBody": "showBody"; "isVisibleCloseButton": "isVisibleCloseButton"; "type": "type"; }, { "closeMessage": "closeMessage"; "buttonAction": "buttonAction"; }, never, ["*"], false, never>;
}
