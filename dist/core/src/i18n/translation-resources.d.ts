export interface TranslationResourceKey {
    [key: string]: any;
}
export interface TranslationResources {
    [lang: string]: {
        [chunkName: string]: TranslationResourceKey;
    };
}
export interface TranslationChunksConfig {
    [chunk: string]: string[];
}
