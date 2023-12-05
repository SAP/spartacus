export interface Translatable {
    key?: string;
    params?: TranslatableParams;
    raw?: string;
}
export interface TranslatableParams {
    [param: string]: any;
}
