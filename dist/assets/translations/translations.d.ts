interface TranslationResources {
    [lang: string]: {
        [chunkName: string]: {
            [key: string]: any;
        };
    };
}
export declare const translations: TranslationResources;
export {};
