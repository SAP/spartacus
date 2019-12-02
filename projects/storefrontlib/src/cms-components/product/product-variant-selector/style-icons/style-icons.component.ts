import { Component, Input, OnInit } from '@angular/core';
import { VariantOption, VariantOptionQualifier } from 'projects/backend/occ-client/lib/models';
import { OccConfig } from '@spartacus/core';

@Component({
  selector: 'cx-style-icons',
  templateUrl: './style-icons.component.html',
  styleUrls: ['./style-icons.component.scss']
})
export class StyleIconsComponent implements OnInit {

  constructor(private config: OccConfig) { }

  @Input()
  variants: VariantOption[];

  variantNames: { [key: string]: string } = {};

  ngOnInit() {
    this.variants.forEach(variant => {
      this.variantNames[variant.code] = this.getVariantName(variant.variantOptionQualifiers);
    });
  }

  getVariantThumbnailUrl(variantOptionQualifiers: VariantOptionQualifier[]): string {
    const thumbnail = variantOptionQualifiers.find(item => item.qualifier === 'thumbnail');
    return thumbnail ? `${this.config.backend.occ.baseUrl}${thumbnail.image.url}` : '';
  }

  private getVariantName(variantOptionQualifiers: VariantOptionQualifier[]): string {
    const rollupProperty = variantOptionQualifiers.find(item => item.qualifier === 'rollupProperty');
    const property = rollupProperty ? variantOptionQualifiers.find(item => item.qualifier === rollupProperty.value) : null;
    return property ? property.value : '';
  }
}
