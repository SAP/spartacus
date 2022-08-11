export interface TranslationResources {
  [lang: string]: {
    [chunkName: string]: {
      [key: string]: any;
    };
  };
}
export interface TranslationChunksConfig {
  [chunk: string]: string[];
}
