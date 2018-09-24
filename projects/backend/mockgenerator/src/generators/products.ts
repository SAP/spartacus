import { CommerceWebservicesV2Models } from 'occ-client';
import { Product } from 'occ-client/typings/lib/models';
import { ClientGenerator } from '../helpers/client-generator';
import * as faker from 'faker';
import { ENDPOINTS } from '../constants/endpoints';

const PRODUCT_PAGE_SIZE: number = 50;
const GET_FULL_CATALOG: boolean = true;

export class ProductsGenerator extends ClientGenerator {
  async generateForSite(site: string) {
    let {
      products,
      productPages,
      searchProducts
    } = await this.fetchProductsForSite(site);
    if (this.options && this.options.anonymize) {
      products = this.anonymize(products);
      searchProducts = this.anonymizeSearchProducts(searchProducts, products);
    }

    return {
      [`${site}-${ENDPOINTS.PRODUCTS}`]: products,
      [`${site}-${ENDPOINTS.SEARCH_PRODUCTS}`]: searchProducts,
      ...productPages
    };
  }

  async fetchProductsForSite(
    site: string
  ): Promise<{
    products: Product[];
    productPages: {};
    searchProducts: Product[];
  }> {
    const searchProducts = await this.getAllSearchProducts(site);

    // load all product
    const fields = 'DEFAULT,averageRating,images(FULL),classifications';
    const products = [];
    const productPages = {};

    for (const { code } of searchProducts) {
      console.log(`Product: ${code} (${site})`);
      const product = await this.client.getProductByCode(code, site, {
        fields
      } as any);
      products.push(product);

      productPages[
        `${site}-${ENDPOINTS.PRODUCT_SINGLE}-${code}`
      ] = await this.getProductPages(site, code);
    }
    console.log(`Total products loaded for ${site}: `, products.length);

    return { products, productPages, searchProducts };
  }

  async getAllSearchProducts(site: string) {
    const fields = 'products(code)';
    let totalPages = 1,
      allProducts = [];
    for (let i = 0; i < totalPages; i++) {
      const { products, pagination } = await this.client.searchProducts(site, {
        fields,
        pageSize: PRODUCT_PAGE_SIZE,
        currentPage: i
      });
      if (GET_FULL_CATALOG) {
        totalPages = pagination.totalPages;
      }
      allProducts = allProducts.concat(products);
    }
    return allProducts;
  }

  anonymize = (data: Product[]) =>
    data.map(product => ({
      ...product,
      name: faker.commerce.productName()
    }));

  anonymizeSearchProducts = (
    searchProducts: Product[],
    products: Product[]
  ) => {
    return searchProducts.map(product => {
      const anonymizedProduct = products.find(p => p.code === product.code);
      return {
        ...product,
        name: anonymizedProduct.name
      };
    });
  };

  getProductPages(site: string, code: string) {
    return new Promise(resolve => {
      this.client.getPageData(
        site,
        {
          code,
          pageType: CommerceWebservicesV2Models.PageType.ProductPage
        },
        (error, service, resource, response) =>
          error ? console.log(error) : resolve(JSON.parse(response.bodyAsText))
      );
    });
  }
}
