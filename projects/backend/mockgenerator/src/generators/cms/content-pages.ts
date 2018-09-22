import { ClientGenerator } from '../../helpers/client-generator';
import { CONTENT_PAGES } from '../../constants/content-pages';
import { CommerceWebservicesV2, CommerceWebservicesV2Models } from 'occ-client';

export class ContentPageGenerator extends ClientGenerator {
  async generateForSite(site: string) {
    return await this.fetchContentPagesData(this.client, site);
  }

  fetchContentPagesData(client: CommerceWebservicesV2, site: string) {
    let promises = [];
    let pages = [];

    for (let page in CONTENT_PAGES) {
      promises.push(
        new Promise(function(resolve, reject) {
          client.getPageData(
            site,
            {
              pageLabelOrId: CONTENT_PAGES[page],
              pageType: CommerceWebservicesV2Models.PageType.ContentPage
            },
            (error, service, resource, response) => {
              if (!error) {
                resolve(
                  (pages[`${site}-${CONTENT_PAGES[page]}`] = JSON.parse(
                    response.bodyAsText
                  ))
                );
              } else reject();
            }
          );
        })
      );
    }

    return Promise.all(promises).then(() => pages);
  }
}
