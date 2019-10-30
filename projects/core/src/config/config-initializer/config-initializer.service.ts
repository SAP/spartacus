import { Inject, Injectable } from '@angular/core';
import { Config } from '../config.module';
import { deepMerge } from '../utils/deep-merge';

// spike todo remove - dummy implementation to be replaced after #5181
@Injectable({ providedIn: 'root' })
export class ConfigInitializerService {
  private resolve: Function;
  private readonly donePromise: Promise<void>;

  constructor(@Inject(Config) private config: any) {
    this.donePromise = new Promise(res => {
      this.resolve = res;
    });
  }

  add(...chunks: object[]) {
    deepMerge(this.config, ...chunks);
    this.resolve(this.config);
  }

  async getStableConfig(...scopes: string[]): Promise<any> {
    console.log(scopes);
    return this.donePromise;
  }
}
