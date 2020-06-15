import { CommerceWebservicesV2 } from 'occ-client';
import * as fs from 'fs';

export interface GeneratorOptions {
  anonymize?: boolean;
}

export interface Generator {
  generate(): Promise<{ [key: string]: any }>;
}

export abstract class ClientGenerator implements Generator {
  constructor(
    public client: CommerceWebservicesV2,
    public sites: string[],
    public options: GeneratorOptions = { anonymize: true }
  ) {}

  async generate() {
    const data = {};
    for (const site of this.sites) {
      Object.assign(data, await this.generateForSite(site));
    }
    return data;
  }

  abstract async generateForSite(site: string): Promise<{ [key: string]: any }>;
}

export async function generateAll(generators: Generator[]) {
  const data = {};
  for (const generator of generators) {
    Object.assign(data, await generator.generate());
  }
  return data;
}

export async function generateToFile(
  generators: Generator[],
  output = 'db.json'
) {
  const data = await generateAll(generators);
  fs.writeFileSync(output, JSON.stringify(data));
}
