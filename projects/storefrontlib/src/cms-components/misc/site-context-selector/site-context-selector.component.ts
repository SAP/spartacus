import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SiteContext } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../icon/icon.model';
import { SiteContextComponentService } from './site-context-component.service';
import { SiteContextType } from './site-context.model';

@Component({
  selector: 'cx-site-context-selector',
  templateUrl: './site-context-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteContextSelectorComponent {
  siteContextService: SiteContext<any>;
  iconTypes = ICON_TYPE;
  /**
   * the context type can be set as an input. If the context is
   * not given, the context will be loaded from the backend.
   */
  @Input() context: SiteContextType;

  constructor(private componentService: SiteContextComponentService) {}

  get items$(): Observable<any> {
    return this.componentService.getItems(this.context);
  }

  get activeItem$(): Observable<string> {
    return this.componentService.getActiveItem(this.context);
  }

  set active(value: string) {
    this.componentService.setActive(value, this.context);
  }

  get label$(): Observable<any> {
    return this.componentService.getLabel(this.context);
  }
}
