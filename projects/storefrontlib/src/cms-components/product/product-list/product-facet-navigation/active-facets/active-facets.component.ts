import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Breadcrumb } from '@spartacus/core';
import { ICON_TYPE } from 'projects/storefrontlib/src/cms-components/misc';
import { FacetService } from '../facet.service';

@Component({
  selector: 'cx-active-facets',
  templateUrl: './active-facets.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ActiveFacetsComponent {
  @Input() facets;

  @Input() closeIcon = ICON_TYPE.CLOSE;

  constructor(private facetService: FacetService) {}

  getLinkParams(facet: Breadcrumb) {
    return this.facetService.getLinkParams(facet.removeQuery.query.value);
  }
}
