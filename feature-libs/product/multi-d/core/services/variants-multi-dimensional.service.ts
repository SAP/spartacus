import { Injectable } from '@angular/core';
import { isNotNullable } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import {
  Product,
  VariantMatrixElement,
  VariantOption,
  VariantOptionQualifier,
} from 'projects/core/src/model';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';

export interface GridVariantOption extends VariantOption {
  variantData: VariantData[];
}
export interface VariantData {
  type: string;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class VariantsMultiDimensionalService {
  product$: Observable<Product> = this.currentProductService.getProduct().pipe(
    filter(isNotNullable),
    distinctUntilChanged(),
    tap(this.getProductCategories.bind(this)),
    tap((product: Product) => {
      if (!!product && product.baseOptions?.length) {
        this.variantOptions = JSON.parse(
          JSON.stringify(product?.baseOptions[0]?.options)
        );
      }

      this.extractAndAssignVariantValuesFromMatrix(product);
      console.log('PRODUCT', product);
      console.log('variantCategories', this.variantCategories);
      console.log('variantOptions', this.variantOptions);
    })
  );

  private variantOptions: GridVariantOption[] = [];
  private variantCategories: string[] = [];
  private variants: VariantMatrixElement[] = [];

  constructor(private currentProductService: CurrentProductService) {}

  variantHasImages(variants: VariantMatrixElement[]): boolean {
    return variants.some(
      (variant: VariantMatrixElement) => variant.parentVariantCategory?.hasImage
    );
  }

  getVariants(): VariantMatrixElement[] {
    return this.variants;
  }

  getVariantCategories(): string[] {
    return this.variantCategories;
  }

  getVariantOptions(): Observable<GridVariantOption[]> {
    console.log('getVariantOptions', this.variantOptions);
    return of(this.variantOptions);
  }

  setVariantsGroups(product: Product): void {
    this.variants = [];

    if (!!product) {
      const levels = Array.from(
        { length: product.categories?.length },
        (_, k) => k + 1
      );

      let productMatrix = JSON.parse(JSON.stringify(product.variantMatrix));

      levels.forEach((level) => {
        const currentLevelProductVariantIndex = this.getProductVariantMatrixIndex(
          product,
          productMatrix
        );

        if (1 !== level) {
          productMatrix =
            productMatrix[currentLevelProductVariantIndex]?.elements;
        }

        this.variants.push(productMatrix);
      });
    }
    console.log('variants', this.variants);
  }

  getProductCategories(product: Product): void {
    this.variantCategories = this.extractVariantCategories(product);
  }

  private getProductVariantMatrixIndex(
    product: Product,
    matrix: VariantMatrixElement[]
  ): number {
    let productVariantMatrixIndex: number;

    matrix.forEach((variant: VariantMatrixElement, index: number) => {
      if (variant.variantOption?.code === product.code) {
        productVariantMatrixIndex = index;
      }
    });

    return productVariantMatrixIndex;
  }

  private extractAndAssignVariantValuesFromMatrix(product: Product): void {
    if (product.variantMatrix) {
      this.findAllVariantOptions(product?.variantMatrix);
    }
  }

  private findAllVariantOptions(
    variantMatrix: VariantMatrixElement[],
    variantTypes: VariantData[] = [],
    list: GridVariantOption[] = [],
    itteration: number = 0
  ): void {
    variantMatrix.forEach((variantMatrixElement: VariantMatrixElement) => {
      // Remove reference
      const elementVariantTypes = JSON.parse(JSON.stringify(variantTypes));

      // Remove unnecesary elements
      elementVariantTypes.splice(itteration, elementVariantTypes.length);

      // Check values and push new variant type to array
      if (
        variantMatrixElement.variantValueCategory?.name &&
        variantMatrixElement.parentVariantCategory?.name
      ) {
        elementVariantTypes.push({
          type: variantMatrixElement.parentVariantCategory.name,
          value: variantMatrixElement.variantValueCategory.name,
        } as VariantData);
      }

      // Verify if variant has more elements
      if (variantMatrixElement.elements?.length) {
        this.findAllVariantOptions(
          variantMatrixElement.elements,
          elementVariantTypes,
          list,
          itteration + 1
        );
        // Set new plain variant to reusable list
      } else {
        const variant = this.variantOptions.find(
          (variant: GridVariantOption) =>
            variant.code === variantMatrixElement.variantOption?.code
        );

        if (variant) {
          variant.variantData = elementVariantTypes;

          list.push(variant);
        }
      }
    });
  }

  private extractVariantCategories(product: Product): string[] {
    const variantCategories: string[] = [];

    if (product.variantMatrix) {
      this.handleVariantCategoryOptions(
        product.variantMatrix,
        variantCategories
      );
    }

    return variantCategories;
  }

  private handleVariantCategoryOptions(
    variantMatrix: VariantMatrixElement[],
    variantCategories: string[] | any
  ): void {
    variantMatrix?.forEach((variantMatrixElement: VariantMatrixElement) => {
      const categoryName = variantMatrixElement?.parentVariantCategory?.name;
      if (!variantCategories.includes(categoryName)) {
        variantCategories.push(categoryName);
      }

      if (variantMatrixElement.elements) {
        this.handleVariantCategoryOptions(
          variantMatrixElement.elements,
          variantCategories
        );
      }
    });
  }
}
