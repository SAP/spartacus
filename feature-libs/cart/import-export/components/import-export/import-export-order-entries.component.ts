import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContextService } from '@spartacus/storefront';

@Component({
  selector: 'cx-import-export-order-entries',
  templateUrl: './import-export-order-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportExportOrderEntriesComponent {
  constructor(protected contextService: ContextService) {}
}
