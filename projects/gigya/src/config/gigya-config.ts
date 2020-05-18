export abstract class GigyaConfig {
  gigya?: {
      baseSite: string;
      javascriptUrl: string;
      sessionExpiration: number;
  }[]
}
