export interface TranslationCommand {
  key?: string;
  params?: TranslationCommandParams;
  raw?: string;
}

export interface TranslationCommandParams {
  [param: string]: any;
}
