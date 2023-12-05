import { EventEmitter, OnInit } from '@angular/core';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import * as i0 from "@angular/core";
export interface CardAction {
    event: string;
    name: string;
}
export interface CardLinkAction {
    link: string;
    name: string;
}
export interface Card {
    header?: string;
    title?: string;
    textBold?: string;
    text?: Array<string>;
    paragraphs?: Array<{
        title?: string;
        text?: Array<string>;
    }>;
    img?: string;
    actions?: Array<CardAction | CardLinkAction>;
    deleteMsg?: string;
    label?: string;
    role?: string;
    customClass?: string;
}
export declare class CardComponent implements OnInit {
    iconTypes: typeof ICON_TYPE;
    deleteCard: EventEmitter<number>;
    setDefaultCard: EventEmitter<number>;
    sendCard: EventEmitter<number>;
    editCard: EventEmitter<number>;
    cancelCard: EventEmitter<number>;
    border: boolean;
    editMode: boolean;
    isDefault: boolean;
    content: Card | null;
    fitToContainer: boolean;
    truncateText: boolean;
    charactersLimit: number;
    index: number;
    setEditMode(): void;
    cancelEdit(): void;
    delete(): void;
    setDefault(): void;
    send(): void;
    edit(): void;
    isCardAction(action: CardAction | CardLinkAction): action is CardAction;
    isCardLinkAction(action: CardAction | CardLinkAction): action is CardLinkAction;
    constructor();
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardComponent, "cx-card", never, { "border": "border"; "editMode": "editMode"; "isDefault": "isDefault"; "content": "content"; "fitToContainer": "fitToContainer"; "truncateText": "truncateText"; "charactersLimit": "charactersLimit"; "index": "index"; }, { "deleteCard": "deleteCard"; "setDefaultCard": "setDefaultCard"; "sendCard": "sendCard"; "editCard": "editCard"; "cancelCard": "cancelCard"; }, never, ["[label_container_bottom]"], false, never>;
}
