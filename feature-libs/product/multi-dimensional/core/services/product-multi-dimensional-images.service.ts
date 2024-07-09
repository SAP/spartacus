import { inject, Injectable } from '@angular/core';
import { Config, Image, OccConfig, Product, VariantMatrixElement, VariantOptionQualifier, VariantQualifier } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class ProductMultiDimensionalImagesService {
  protected config: Config = inject(Config);

  getImagesFromVariantMatrix(qualifier: VariantOptionQualifier, product: Product): Image[] {
    const variantMatrix = product.variantMatrix ?? [];
    const categoryName = qualifier.name;
    let images: Image[] = [];

    const traverMatrix = (matrix: VariantMatrixElement[]) => {
      for (const matrixElement of matrix) {
        const elements = matrixElement.elements ?? [];
        const hasImages = this.everyElementHasImages(matrixElement.elements ?? []) && matrixElement.parentVariantCategory.hasImage;
        const isMatch = categoryName === matrixElement.parentVariantCategory.name && qualifier.value === matrixElement.variantValueCategory.name;

        if (isMatch && hasImages) {
          images = this.getVariantOptionImages(matrixElement.variantOption?.variantOptionQualifiers, qualifier);
          break;
        } else {
          traverMatrix(elements);
        }
      }
    };

    traverMatrix(variantMatrix);

    return images;
  }

  everyElementHasImages(elements: VariantMatrixElement[]): boolean {
    return elements.every((variant: VariantMatrixElement) => {
      if (variant.variantOption?.variantOptionQualifiers) {
        return variant.variantOption.variantOptionQualifiers.every(
          (qualifier: VariantOptionQualifier) => qualifier.image !== undefined
        );
      }
      return false;
    });
  }

  getVariantOptionImages(variantOptionQualifiers: VariantOptionQualifier[], qualifier: VariantOptionQualifier): Image[] {
    const format = VariantQualifier.SWATCH;
    return variantOptionQualifiers
      .filter(
        (optionQualifier) => optionQualifier.image?.format === format
      )
      .map((optionQualifier) => {
        const altText = optionQualifier.image?.altText ?? qualifier.value;
        return {
          altText,
          format: optionQualifier.image?.format,
          url: this.getBaseUrl() + optionQualifier.image?.url
        };
      });
  }

  protected getBaseUrl(): string {
    return (
      (this.config as OccConfig).backend?.media?.baseUrl ??
      (this.config as OccConfig).backend?.occ?.baseUrl ??
      ''
    );
  }
}
