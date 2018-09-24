import { CommerceWebservicesV2, CommerceWebservicesV2Models } from 'occ-client';
import { ClientGenerator } from '../../helpers/client-generator';
import { ENDPOINTS } from '../../constants/endpoints';

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
    let categoryPages = [];

    await client.getCatalog(catalog, site).then(response => {
      // TODO: filter the active catalog version(s). Multiple active
      // content catalog version can be used in a multi-catalog setup
      // The current backend doesn't provide this information.
      // Actually, the backend should not even expose non-active versions...
      let categories = [];
      response.catalogVersions
        .filter(cat => !!cat.categories)
        .forEach(cat => (categories = categories.concat(cat.categories)));

      const categoryIds = this.getCategoryIds(categories);
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
                  categoryPages[
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

    return Promise.all(promises).then(() => categoryPages);
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
