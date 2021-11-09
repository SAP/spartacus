import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ContextService, LaunchDialogService } from '@spartacus/storefront';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-import-order-entries',
  templateUrl: './import-order-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportOrderEntriesComponent {
  protected subscription = new Subscription();
  @ViewChild('open') element: ElementRef;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected contextService: ContextService
  ) {}
}
