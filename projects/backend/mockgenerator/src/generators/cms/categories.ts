import { ClientGenerator } from "../../helpers/client-generator";
import { ENDPOINTS } from "../../constants/endpoints";
import { flatObject } from "../../helpers/object";
import { CommerceWebservicesV2, CommerceWebservicesV2Models } from "hybris-occ-client";

export class CategoriesGenerator extends ClientGenerator {

  async generateForSite(site: string) {
    return await this.getCatalogsData(site);
  }

  getCatalogsData(site: string) {
    return new Promise((resolve) => {
      this.client.getCatalogs(site).then((response) => {
        response.catalogs.forEach(element => {
          resolve(this.fetchCategoryData(this.client, site, element.id));
        });
      });
    });
  }

  async fetchCategoryData(client: CommerceWebservicesV2, site: string, catalog: string) {
    let promises = [];
    let categories = [];

    await client.getCatalog(catalog, site).then((response) => {
      let catalogCategories = flatObject(response.catalogVersions[1].categories);

      Object.keys(catalogCategories).forEach(key => {
        if (key.search('id') !== -1) {
          promises.push(new Promise((resolve) => {
            client.getPageData(site, {
              pageType: CommerceWebservicesV2Models.PageType.CategoryPage,
              code: catalogCategories[key]
            }, (error, service, resource, response) => {
              let category;
              if (!error) {
                category = categories[`${site}-${ENDPOINTS.CATEGORY_SINGLE}-${catalogCategories[key]}`] = JSON.parse(response.bodyAsText);
              } resolve(category);
            })
          }));
        }
      });
    });

    return Promise.all(promises).then(() => categories);
  }
}
