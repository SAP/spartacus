import { Injectable } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  isNotNullable,
  Product,
  VariantMatrixElement,
  VariantOption,
  VariantOptionQualifier,
} from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, of, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  tap,
} from 'rxjs/operators';

export interface GridVariantOption extends VariantOption {
  variantData: VariantData[];
  images?: VariantOptionQualifier[] | undefined;
}
export interface VariantData {
  type: string;
  value: string;
}
@Injectable({
  providedIn: 'root',
})
export class VariantsMultiDimensionalService {
  entriesCleared$: Subject<void> = new Subject<void>();
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
    }),
    shareReplay(1)
  );

  protected variantCategories: string[] = [];
  protected variantOptions: GridVariantOption[] = [];
  protected variants: VariantMatrixElement[] = [];

  constructor(
    protected activeCartService: ActiveCartFacade,
    protected currentProductService: CurrentProductService
  ) {}

  variantHasImages(variants: VariantMatrixElement[]): boolean {
    return variants.some(
      (variant: VariantMatrixElement) => variant.parentVariantCategory?.hasImage
    );
  }

  getVariants(): VariantMatrixElement[] {
    return this.variants;
  }

  getVariantOptions(): Observable<GridVariantOption[]> {
    return of(this.variantOptions).pipe(
      map((variant) => variant.sort(sortVariants))
    );
  }

  getVariantCategories(): string[] {
    return this.variantCategories;
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
  }

  /**
   * Adding to cart all products from the list
   */
  addToCart(entries: any): void {
    this.activeCartService.addEntries(entries);
  }

  isCartStable(): Observable<boolean> {
    return this.activeCartService.isStable();
  }

  private getProductCategories(product: Product): void {
    this.variantCategories = this.extractVariantCategories(product);
  }

  private getProductVariantMatrixIndex(
    product: Product,
    matrix: VariantMatrixElement[]
  ): number {
    let productVariantMatrixIndex!: number;

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
      this.removeMissingVariantOptions();
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
          variant.images =
            variantMatrixElement.variantOption?.variantOptionQualifiers;
          list.push(variant);
        }
      }
    });
  }

  private removeMissingVariantOptions(): void {
    this.variantOptions = this.variantOptions.filter((variant) => {
      return variant.variantData?.length;
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

function sortVariants(a: GridVariantOption, b: GridVariantOption) {
  const variantTypesLength = a.variantData?.length;
  let i: number = 0;
  let result: number = 0;

  if (variantTypesLength) {
    while (i < variantTypesLength && result === 0) {
      let variantData1: any = a.variantData[i].value;
      let variantData2: any = b.variantData[i].value;

      if (isNaN(variantData1) && isNaN(variantData2)) {
        result =
          variantData1 < variantData2
            ? -1
            : variantData1 > variantData2
            ? 1
            : 0;
      } else {
        result = variantData1 - variantData2;
      }
      i++;
    }
  }
  return result;
}
