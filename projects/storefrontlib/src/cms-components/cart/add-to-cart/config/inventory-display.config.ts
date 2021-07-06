import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class InventoryDisplayConfig {
  /**
   * Flag indicates whether product availablity will be displayed in Spartacus.
   */
  showInventory?: boolean;
}

declare module '@spartacus/core' {
  interface Config extends InventoryDisplayConfig {}
}
