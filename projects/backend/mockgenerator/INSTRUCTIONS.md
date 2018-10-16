# How to mock

This is a short description of *how to add new endpoints' mocks*.

## Basics

- Mock server is providing data from `db.json` file or dynamically if `start:dynamic` was used.
- Hybris consist of many site types (electronics, apparel, etc), therefore `db.json` root data-objects have a prefix, eg. `electronics-products` for a product list from electronics site.

## Routing

In the root of this project, there is a file called `routes.json`. All you have to do, when adding a new endpoints, is to set the route you are currently mocking and provide object name from `db.json`.

### Example

If the route is `https://your-domain.com/rest/v2/electronics/languages`, and the object name from `db.json` is `electronics-languages`, then simply and the following code to the `routes.json` file:

`"/rest/v2/:baseSiteId/languages(\\?.+)?": "/:baseSiteId-languages"`

*NOTE: `:baseSiteId` in the above example is a variable, so you can use this route for multiple baseSiteIds*

## Generators

Mock server is using custom generators to generate the mocked data. The idea behind generators is to take the data from a real backend and save it to `db.json`, if it's needed, anonymize some fields before saving to file (eg. product name, product description, etc).

### Getting the data

`CommerceWebservicesV2` consists of many useful methods which can gather the data from the backend. Alternatively you can return an array or object with fake content as the data.

### Creating generator

Generator is simply a class with `generateForSite()` method. This method should get the data from backend (or get it any other way, eg. generating random array), and return an object which will be appended to `db.json` later.

```typescript
export class LanguagesGenerator extends ClientGenerator {

  async generateForSite(site: string) {
    const result = await this.client.getLanguages(site);
    return {
      [`${site}-${ENDPOINTS.LANGUAGES}`]: result
    }
  }

}
```

There might be more complex generators, which would modify the data in some way for example. The code above is a straightforward implementation of a very simple generator.

### Important

- Each time a generator is modified or created, you have to rerun `yarn generate` command, to make sure that `db.json` is up-to-date.
- Some of the `CommerceWebservicesV2`'s methods might not give you the data you want, further investigation on how to get the correct data is needed then.