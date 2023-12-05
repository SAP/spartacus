export interface PromotionListEntry {
    [key: string]: string | boolean | undefined;
}
export interface GeneralEntry extends PromotionListEntry {
    applied: boolean;
    code: string;
    name?: string;
}
