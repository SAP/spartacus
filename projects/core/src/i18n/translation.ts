export interface Translation {
  key?: string;
  params?: TranslationParams;
  raw?: string;
}

export interface TranslationParams {
  [param: string]: any;
}
