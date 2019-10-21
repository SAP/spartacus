import { Injectable } from '@angular/core';
import { OccConfig } from '../config/occ-config';

@Injectable({
  providedIn: 'root',
})
export class LoadingScopesService {
  constructor(protected config: OccConfig) {}

  /**
   * Aims to expand scopes based on loading scopes config.
   *
   * I.e. if 'details' scope includes 'list' scope by configuration, it'll return ['details', 'list']
   *
   * @param model
   * @param scopes
   */
  expand(model: string, scopes: string[]): string[] {
    const scopesConfig =
      this.config &&
      this.config.backend &&
      this.config.backend.loadingScopes &&
      this.config.backend.loadingScopes[model];

    if (scopesConfig) {
      let i = 0;

      scopes.reverse(); // to ensure proper scopes merging order

      while (i < scopes.length) {
        const includedScopes =
          scopesConfig[scopes[i]] && scopesConfig[scopes[i]].include;
        if (includedScopes) {
          for (const includedScope of includedScopes) {
            if (!scopes.includes(includedScope)) {
              scopes.push(includedScope);
            }
          }
        }
        i++;
      }

      scopes.reverse();
    }

    return scopes;
  }
}
