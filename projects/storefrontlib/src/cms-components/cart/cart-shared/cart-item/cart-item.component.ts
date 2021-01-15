import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  OrderEntry,
  Product,
  PromotionLocation,
  PromotionResult,
  VariantMatrixElement,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { PromotionService } from '../../../../shared/services/promotion/promotion.service';

/**
 * @deprecated since 3.0 - use `OrderEntry` instead
 */
export interface Item {
  entryNumber?: number;
  product?: any;
  quantity?: any;
  basePrice?: any;
  totalPrice?: any;
  updateable?: boolean;
}

export interface CartItemComponentOptions {
  isSaveForLater?: boolean;
  optionalBtn?: any;
}

@Component({
  selector: 'cx-cart-item',
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent implements OnInit {
  @Input() compact = false;
  @Input() item: OrderEntry;
  @Input() readonly = false;
  @Input() quantityControl: FormControl;

  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;

  // TODO: evaluate whether this is generic enough
  @Input() options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };

  appliedProductPromotions$: Observable<PromotionResult[]>;
  variants: any[] = [];

  // MOCK
  mockProduct = mockProduct;

  constructor(protected promotionService: PromotionService) {}

  ngOnInit() {
    this.appliedProductPromotions$ = this.promotionService.getProductPromotionForEntry(
      this.item,
      this.promotionLocation
    );

    // MOCK
    if (this.isMultiDVariantsProduct(mockProduct)) {
      // if (this.isMultiDVariantsProduct(this.item?.product)) {
      console.log('isMultiDVariantsProduct');

      this.setVariants();
    }
  }

  isProductOutOfStock(product: any) {
    // TODO Move stocklevelstatuses across the app to an enum
    return (
      product &&
      product.stock &&
      product.stock.stockLevelStatus === 'outOfStock'
    );
  }

  isMultiDVariantsProduct(product: any): boolean {
    return product?.multidimensional;
  }

  removeItem() {
    this.quantityControl.setValue(0);
    this.quantityControl.markAsDirty();
  }

  private setVariants(): void {
    this.variants = [];

    const levels = Array.from(
      // MOCK
      { length: mockProduct.categories.length },
      // { length: this.item?.product?.categories.length },
      (_, k) => k + 1
    );

    let productMatrix = JSON.parse(
      // MOCK
      JSON.stringify(mockProduct.variantMatrix)
      // JSON.stringify(this.item?.product?.variantMatrix)
    );

    levels.forEach((level) => {
      const currentLevelProductVariantIndex = this.getProductVariantMatrixIndex(
        productMatrix
      );

      if (1 !== level) {
        productMatrix = productMatrix[currentLevelProductVariantIndex].elements;
      }

      // Filter only product variants
      productMatrix = productMatrix.filter(
        (variant: VariantMatrixElement) =>
          // MOCK
          variant.variantOption.code === mockProduct.code
        // variant.variantOption.code === this.item?.product?.code
      );

      this.variants.push(productMatrix[0]);
    });
  }

  private getProductVariantMatrixIndex(matrix: VariantMatrixElement[]): number {
    let productVariantMatrixIndex: number;

    matrix.forEach((variant: VariantMatrixElement, index: number) => {
      // MOCK
      if (variant.variantOption.code === mockProduct.code) {
        // if (variant.variantOption.code === this.item?.product?.code) {
        productVariantMatrixIndex = index;
      }
    });

    return productVariantMatrixIndex;
  }
}

// MOCK
const mockProduct: Product = {
  baseProduct: 'baseProduct1',
  categories: [{ code: 'test1' }, { code: 'test2' }, { code: 'test3' }],
  code: 'code_1',
  multidimensional: true,
  name: 'Test1',
  purchasable: true,
  variantMatrix: [
    {
      elements: [
        {
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_1',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7',
              },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_2',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7.5',
              },
            },
          ],
          isLeaf: false,
          parentVariantCategory: {
            hasImage: false,
            name: 'Fit',
          },
          variantOption: {
            code: 'code_1',
            variantOptionQualifiers: [],
          },
          variantValueCategory: {
            name: 'M',
          },
        },
        {
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_3',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7',
              },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_4',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7.5',
              },
            },
          ],
          isLeaf: false,
          parentVariantCategory: {
            hasImage: false,
            name: 'Fit',
          },
          variantOption: {
            code: 'code_3',
            variantOptionQualifiers: [],
          },
          variantValueCategory: {
            name: 'W',
          },
        },
      ],
      isLeaf: false,
      parentVariantCategory: {
        hasImage: true,
        name: 'Color',
      },
      variantOption: {
        code: 'code_1',
        variantOptionQualifiers: [{ image: {} }],
      },
      variantValueCategory: {
        name: 'Black',
      },
    },
    {
      elements: [
        {
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_5',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7',
              },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_6',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7.5',
              },
            },
          ],
          isLeaf: false,
          parentVariantCategory: {
            hasImage: false,
            name: 'Fit',
          },
          variantOption: {
            code: 'code_5',
            variantOptionQualifiers: [],
          },
          variantValueCategory: {
            name: 'M',
          },
        },
        {
          elements: [
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_7',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7',
              },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_8',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '7.5',
              },
            },
            {
              elements: [],
              isLeaf: true,
              parentVariantCategory: {
                hasImage: false,
                name: 'Size',
              },
              variantOption: {
                code: 'code_9',
                variantOptionQualifiers: [],
              },
              variantValueCategory: {
                name: '12.5',
              },
            },
          ],
          isLeaf: false,
          parentVariantCategory: {
            hasImage: false,
            name: 'Fit',
          },
          variantOption: {
            code: 'code_7',
            variantOptionQualifiers: [],
          },
          variantValueCategory: {
            name: 'W',
          },
        },
      ],
      isLeaf: false,
      parentVariantCategory: {
        hasImage: false,
        name: 'Color',
      },
      variantOption: {
        code: 'code_5',
        variantOptionQualifiers: [],
      },
      variantValueCategory: {
        name: 'Brown',
      },
    },
  ],
};
