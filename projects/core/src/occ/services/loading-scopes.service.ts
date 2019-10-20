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
   * I.e. if 'details' scope includes 'list' scope by configuration, you'll get ['details', 'list']
   *
   * @param scopes
   */
  expand(model: string, scopes: string[]): string[] {
    const scopesConfig =
      this.config &&
      this.config.backend &&
      this.config.backend.loadingScopes &&
      this.config.backend.loadingScopes[model];

    if (scopesConfig) {
      const includedScopes = [];

      scopes.forEach(scope => {
        if (scopesConfig[scope] && scopesConfig[scope].include) {
          includedScopes.push(...scopesConfig[scope].include);
        }
      });

      return Array.from(new Set([...scopes, ...includedScopes]));
    }

    return scopes;
  }
}
