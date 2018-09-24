import { ClientGenerator } from '../../helpers/client-generator';
import { CommerceWebservicesV2, CommerceWebservicesV2Models } from 'occ-client';
import { CONTENT_PAGES } from '../../constants/content-pages';

export class ComponentGenerator extends ClientGenerator {
  async generateForSite(site: string) {
    return await this.fetchChildComponents(this.client, site);
  }

  async fetchComponentsWithChilds(client: CommerceWebservicesV2, site: string) {
    const promises = [];
    const componentList = [];

    for (const page in CONTENT_PAGES) {
      promises.push(
        new Promise((resolve, reject) => {
          client.getPageData(
            site,
            {
              pageLabelOrId: CONTENT_PAGES[page],
              pageType: CommerceWebservicesV2Models.PageType.ContentPage
            },
            (error, service, resource, response) => {
              if (!error) {
                const pageData = JSON.parse(response.bodyAsText);
                this.getChildComponents(pageData).forEach(uid => {
                  if (componentList.indexOf(uid) === -1) {
                    componentList.push(uid);
                  }
                });
                resolve();
              } else {
                console.log('error', error);
              }
            }
          );
        })
      );
    }

    return await Promise.all(promises).then(() => componentList);
  }

  async fetchChildComponents(client: CommerceWebservicesV2, site: string) {
    const uids = await this.fetchChildComponentIds2(this.client, site);

    return new Promise((resolve, reject) => {
      const components = [];
      client.getComponentByIdList(
        { idList: uids },
        site,
        (error, service, resource, response) => {
          if (!error) {
            const responseBody = JSON.parse(response.bodyAsText);
            components[`${site}-components`] = {
              component: responseBody.component
            };
            resolve(components);
          } else reject();
        }
      );
    });
  }

  async fetchChildComponentIds(
    client: CommerceWebservicesV2,
    site: string,
    page: string
  ) {
    // let promises = [];
    // let componentList = [];
    // for (let page in CONTENT_PAGES) {
    // promises.push(
    return new Promise((resolve, reject) => {
      client.getPageData(
        site,
        {
          pageLabelOrId: CONTENT_PAGES[page],
          pageType: CommerceWebservicesV2Models.PageType.ContentPage
        },
        (error, service, resource, response) => {
          if (!error) {
            const idList = JSON.parse(response.bodyAsText);

            // this.getChildComponents(pageData).forEach(uid => {
            //     if (componentList.indexOf(uid) === -1) {
            //         componentList.push(uid);
            //     }
            // });
            resolve(idList);
          } else {
            console.log('error', error);
          }
        }
      );
    });

    // }
    // return await Promise.all(promises).then(() => componentList);
  }
  async fetchChildComponentIds2(client: CommerceWebservicesV2, site: string) {
    let promises = [];
    let componentList = [];
    for (let page in CONTENT_PAGES) {
      promises.push(
        new Promise((resolve, reject) => {
          client.getPageData(
            site,
            {
              pageLabelOrId: CONTENT_PAGES[page],
              pageType: CommerceWebservicesV2Models.PageType.ContentPage
            },
            (error, service, resource, response) => {
              if (!error) {
                const pageData = JSON.parse(response.bodyAsText);
                this.getChildComponents(pageData).forEach(uid => {
                  if (componentList.indexOf(uid) === -1) {
                    componentList.push(uid);
                  }
                });
                resolve();
              } else {
                console.log('error', error);
              }
            }
          );
        })
      );
    }
    return await Promise.all(promises).then(() => componentList);
  }

  private getChildComponents(pageData) {
    const components = [];
    if (pageData.contentSlots && pageData.contentSlots.contentSlot.length > 0) {
      pageData.contentSlots.contentSlot.forEach(slot => {
        if (
          slot.components &&
          slot.components.component &&
          slot.components.component.length > 0
        )
          slot.components.component.forEach(component => {
            if (component && component.navigationNode) {
              if (component.navigationNode.children) {
                component.navigationNode.children.forEach(child => {
                  if (child.entries && child.entries.length > 0) {
                    child.entries.forEach(entry =>
                      components.push(entry.itemId)
                    );
                  }
                });
              } else if (component.navigationNode.uid) {
                components.push(component.navigationNode.uid);
              }
            }
          });
      });
    }
    return components;
  }
}
