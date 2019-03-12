export abstract class TranslationConfig {
  translation: {
    ns: string[];
    fallbackLng: string | false;
    backend: {
      loadPath: string;
    };
    debug: boolean;
  };
}
