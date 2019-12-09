import { ComponentEffects } from './component.effect';
import { NavigationEntryItemEffects } from './navigation-entry-item.effect';
import { PageEffects } from './page.effect';

export const effects: any[] = [
  PageEffects,
  ComponentEffects,
  NavigationEntryItemEffects,
];

export * from './page.effect';
export * from './component.effect';
export * from './navigation-entry-item.effect';
