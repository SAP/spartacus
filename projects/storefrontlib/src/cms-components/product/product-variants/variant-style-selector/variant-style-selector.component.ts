import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  OccConfig,
  BaseOption,
  VariantQualifier,
  VariantOptionQualifier,
} from '@spartacus/core';

@Component({
  selector: 'cx-variant-style-selector',
  templateUrl: './variant-style-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantStyleSelectorComponent {
  constructor(private config: OccConfig) {}

  variantQualifier = VariantQualifier;

  @Input()
  variants: BaseOption;

  getVariantOptionValue(qualifiers: VariantOptionQualifier[]) {
    const obj = qualifiers.find(q => q.qualifier === VariantQualifier.STYLE);
    return obj ? obj.value : '';
  }

  getVariantThumbnailUrl(
    variantOptionQualifiers: VariantOptionQualifier[]
  ): string {
    const qualifier = variantOptionQualifiers.find(item => item.image);
    return qualifier
      ? `${this.config.backend.occ.baseUrl}${qualifier.image.url}`
      : '';
  }
}
