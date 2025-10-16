import { inject } from '@angular/core';
import { FeatureToggles } from '@spartacus/core';
import { defaultOccConfig } from './default-occ-config';
import { OccConfig } from './occ-config';

export function defaultOccConfigFactory(): OccConfig {
  const featureToggles = inject(FeatureToggles);
  const config = { ...defaultOccConfig };

  if (featureToggles.enableWithCredentialsByDefault) {
    if (config.backend && config.backend.occ) {
      config.backend.occ.useWithCredentials = true;
    }
  }
  return config;
}
