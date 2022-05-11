import { runInventoryDisplayE2E } from '../../../../helpers/inventory-display';
import { inventoryDisplayB2B } from '../../../../sample-data/inventory-display';

it(['inventory_display_b2b'], 'should validate inventory display functionality', () => {
    runInventoryDisplayE2E('B2B', inventoryDisplayB2B);
});
