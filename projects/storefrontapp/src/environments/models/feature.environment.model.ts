import { ModuleWithProviders } from '@angular/core';

export interface FeatureEnvironment {
  enabled: boolean;
  feature?: ModuleWithProviders;
}
