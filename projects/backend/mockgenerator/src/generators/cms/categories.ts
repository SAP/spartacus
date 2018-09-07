import { ClientGenerator } from '../../helpers/client-generator';
import { ENDPOINTS } from '../../constants/endpoints';

import {
  CommerceWebservicesV2,
  CommerceWebservicesV2Models
} from 'hybris-occ-client';

export class CategoriesGenerator extends ClientGenerator {
  async generateForSite(site: string) {
    return await this.getCatalogsData(site);
  }

  private getCatalogsData(site: string) {
    return new Promise(resolve => {
      this.client.getCatalogs(site).then(response => {
        response.catalogs.forEach(element => {
          resolve(this.collectCategoryData(this.client, site, element.id));
        });
      });
    });
  }

  private async collectCategoryData(
    client: CommerceWebservicesV2,
    site: string,
    catalog: string
  ) {
    let promises = [];
    let categories = [];

    await client.getCatalog(catalog, site).then(response => {
      const categoryIds = this.getCategoryIds(
        response.catalogVersions[1].categories
      );
      for (const id of categoryIds) {
        promises.push(
          new Promise(resolve => {
            client.getPageData(
              site,
              {
                pageType: CommerceWebservicesV2Models.PageType.CategoryPage,
                code: id
              },
              (error, service, resource, response) => {
                if (!error) {
                  categories[
                    `${site}-${ENDPOINTS.CATEGORY_SINGLE}-${id}`
                  ] = JSON.parse(response.bodyAsText);
                } else {
                  console.error(`The category ${id} could not be fetched`);
                }
                resolve();
              }
            );
          })
        );
      }
    });

    return Promise.all(promises).then(() => categories);
  }

  private getCategoryIds(
    categoryData: CommerceWebservicesV2Models.CategoryHierarchy[]
  ): any[] {
    let ids = [];
    for (const category of categoryData) {
      ids.push(category.id);
      if (!!category.subcategories) {
        ids = ids.concat(this.getCategoryIds(category.subcategories));
      }
    }
    return ids;
  }
}
