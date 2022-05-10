import { runInventoryDisplayE2E } from '../../../helpers/inventory-display';
import { inventoryDisplayB2C } from '../../../sample-data/inventory-display';

it(['inventory_display'],'should display image zoom trigger', () => {
    runInventoryDisplayE2E('B2C', inventoryDisplayB2C);
});
