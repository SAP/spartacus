import { ComponentsEffects } from './components.effect';
import { NavigationEntryItemEffects } from './navigation-entry-item.effect';
import { PageEffects } from './page.effect';

export const effects: any[] = [
  PageEffects,
  ComponentsEffects,
  NavigationEntryItemEffects,
];

export * from './components.effect';
export * from './navigation-entry-item.effect';
export * from './page.effect';
