import * as msRest from "ms-rest-js";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import { CommerceWebservicesV2Context } from "./commerceWebservicesV2Context";
declare class CommerceWebservicesV2 extends CommerceWebservicesV2Context {
    serializer: msRest.Serializer;
    /**
     * @class
     * Initializes a new instance of the CommerceWebservicesV2 class.
     * @constructor
     *
     * @param {string} [baseUri] - The base URI of the service.
     *
     * @param {object} [options] - The parameter options
     *
     * @param {Array} [options.filters] - Filters to be added to the request pipeline
     *
     * @param {object} [options.requestOptions] - The request options. Detailed info can be found at
     * {@link https://github.github.io/fetch/#Request Options doc}
     *
     * @param {boolean} [options.noRetryPolicy] - If set to true, turn off default retry policy
     *
     */
    constructor(baseUri?: string, options?: msRest.ServiceClientOptions);
    /**
     * @summary Get a list of supported payment card types.
     *
     * Lists supported payment card types.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetCardTypesOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCardTypesWithHttpOperationResponse(baseSiteId: string, options?: Models.CommerceWebservicesV2GetCardTypesOptionalParams): Promise<msRest.HttpOperationResponse<Models.CardTypeList>>;
    /**
     * @summary Get a list of catalogs
     *
     * Returns all catalogs with versions defined for the base store.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetCatalogsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCatalogsWithHttpOperationResponse(baseSiteId: string, options?: Models.CommerceWebservicesV2GetCatalogsOptionalParams): Promise<msRest.HttpOperationResponse<Models.CatalogList>>;
    /**
     * @summary Get a catalog
     *
     * Returns information about a catalog based on its ID, along with the versions defined for the
     * current base store.
     *
     * @param {string} catalogId Catalog identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetCatalogOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCatalogWithHttpOperationResponse(catalogId: string, baseSiteId: string, options?: Models.CommerceWebservicesV2GetCatalogOptionalParams): Promise<msRest.HttpOperationResponse<Models.Catalog>>;
    /**
     * @summary Get information about catalog version
     *
     * Returns information about the catalog version that exists for the current base store.
     *
     * @param {string} catalogId Catalog identifier
     *
     * @param {string} catalogVersionId Catalog version identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetCatalogVersionOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCatalogVersionWithHttpOperationResponse(catalogId: string, catalogVersionId: string, baseSiteId: string, options?: Models.CommerceWebservicesV2GetCatalogVersionOptionalParams): Promise<msRest.HttpOperationResponse<Models.CatalogVersion>>;
    /**
     * @summary Get information about catagory in a catalog version
     *
     * Returns information about a specified category that exists in a catalog version available for
     * the current base store.
     *
     * @param {string} catalogId Catalog identifier
     *
     * @param {string} catalogVersionId Catalog version identifier
     *
     * @param {string} categoryId Category identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetCategoriesOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCategoriesWithHttpOperationResponse(catalogId: string, catalogVersionId: string, categoryId: string, baseSiteId: string, options?: Models.CommerceWebservicesV2GetCategoriesOptionalParams): Promise<msRest.HttpOperationResponse<Models.CategoryHierarchy>>;
    /**
     * @summary Get components' data by id given in body
     *
     * Given a list of component identifiers in body, return cms component data.
     *
     * @param {ComponentIDList} componentIdList List of Component identifiers
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetComponentByIdListOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getComponentByIdListWithHttpOperationResponse(componentIdList: Models.ComponentIDList, baseSiteId: string, options?: Models.CommerceWebservicesV2GetComponentByIdListOptionalParams): Promise<msRest.HttpOperationResponse<Models.ListAdaptedComponents>>;
    /**
     * @summary Get component data
     *
     * Given a component identifier, return cms component data.
     *
     * @param {string} componentId Component identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetComponentByIdOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getComponentByIdWithHttpOperationResponse(componentId: string, baseSiteId: string, options?: Models.CommerceWebservicesV2GetComponentByIdOptionalParams): Promise<msRest.HttpOperationResponse<any>>;
    /**
     * @summary Get page data with list of cms content slots
     *
     * Given a page identifier, return the page data with a list of cms content slots, each of which
     * contains a list of cms component data.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetPageDataOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPageDataWithHttpOperationResponse(baseSiteId: string, options?: Models.CommerceWebservicesV2GetPageDataOptionalParams): Promise<msRest.HttpOperationResponse<Models.CMSPage>>;
    /**
     * @summary Get a list of available currencies.
     *
     * Lists all available currencies (all usable currencies for the current store). If the list of
     * currencies for a base store is empty, a list of all currencies available in the system is
     * returned.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetCurrenciesOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCurrenciesWithHttpOperationResponse(baseSiteId: string, options?: Models.CommerceWebservicesV2GetCurrenciesOptionalParams): Promise<msRest.HttpOperationResponse<Models.CurrencyList>>;
    /**
     * @summary Get all subgroups of a customergroup.
     *
     * Returns all customer groups that are direct subgroups of a customergroup.
     *
     * To try out the methods of the Customer Groups controller, you must authorize a user who belongs
     * to the “customermanagergroup”.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetAllCustomerGroupsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getAllCustomerGroupsWithHttpOperationResponse(baseSiteId: string, options?: Models.CommerceWebservicesV2GetAllCustomerGroupsOptionalParams): Promise<msRest.HttpOperationResponse<Models.UserGroupList>>;
    /**
     * @summary Creates a new customer group.
     *
     * Creates a new customer group that is a direct subgroup of a customergroup.
     *
     * To try out the methods of the Customer Groups controller, you must authorize a user who belongs
     * to the “customermanagergroup”.
     *
     * @param {UserGroup} userGroup User group object with id and name.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createNewCustomerGroupPrimWithHttpOperationResponse(userGroup: Models.UserGroup, baseSiteId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get a specific customer group.
     *
     * Returns a customer group with a specific groupId.
     *
     * To try out the methods of the Customer Groups controller, you must authorize a user who belongs
     * to the “customermanagergroup”.
     *
     * @param {string} groupId Group identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetCustomerGroupOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCustomerGroupWithHttpOperationResponse(groupId: string, baseSiteId: string, options?: Models.CommerceWebservicesV2GetCustomerGroupOptionalParams): Promise<msRest.HttpOperationResponse<Models.UserGroup>>;
    /**
     * @summary Sets members for a user group.
     *
     * Sets members for a user group. The list of existing members is overwritten with a new one.
     *
     * To try out the methods of the Customer Groups controller, you must authorize a user who belongs
     * to the “customermanagergroup”.
     *
     * @param {string} groupId Group identifier.
     *
     * @param {MemberList} members List of users to set for customer group.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    setUserListForCustomerGroupPrimWithHttpOperationResponse(groupId: string, members: Models.MemberList, baseSiteId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Assigns user(s) to a customer group.
     *
     * Assigns user(s) to a customer group.
     *
     * To try out the methods of the Customer Groups controller, you must authorize a user who belongs
     * to the “customermanagergroup”.
     *
     * @param {string} groupId Group identifier.
     *
     * @param {MemberList} members List of users to assign to customer group.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    assignUserToCustomerGroupPrimWithHttpOperationResponse(groupId: string, members: Models.MemberList, baseSiteId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Delete a user from a customer group.
     *
     * Removes user from a customer group.
     *
     * To try out the methods of the Customer Groups controller, you must authorize a user who belongs
     * to the “customermanagergroup”.
     *
     * @param {string} groupId Group identifier.
     *
     * @param {string} userId User identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    removeUsersFromCustomerGroupWithHttpOperationResponse(groupId: string, userId: string, baseSiteId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get a list of supported countries.
     *
     * Lists all supported delivery countries for the current store. The list is sorted alphabetically.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetDeliveryCountriesOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getDeliveryCountriesWithHttpOperationResponse(baseSiteId: string, options?: Models.CommerceWebservicesV2GetDeliveryCountriesOptionalParams): Promise<msRest.HttpOperationResponse<Models.CountryList>>;
    /**
     * @summary Get a list of product exports.
     *
     * Used for product export. Depending on the timestamp parameter, it can return all products or
     * only products modified after the given time.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2ExportProductsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    exportProductsWithHttpOperationResponse(baseSiteId: string, options?: Models.CommerceWebservicesV2ExportProductsOptionalParams): Promise<msRest.HttpOperationResponse<Models.ProductList>>;
    /**
     * @summary Get a list of orders with status updates
     *
     * Returns the orders that have changed status. Returns only the elements from the current baseSite
     * that have been updated after the provided timestamp.
     *
     * @param {string} timestamp Only items newer than the given parameter are retrieved. This
     * parameter should be in ISO-8601 format (for example, 2018-01-09T16:28:45+0000).
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2OrderStatusFeedOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    orderStatusFeedWithHttpOperationResponse(timestamp: string, baseSiteId: string, options?: Models.CommerceWebservicesV2OrderStatusFeedOptionalParams): Promise<msRest.HttpOperationResponse<Models.OrderStatusUpdateElementList>>;
    /**
     * @summary Generates a token to restore a customer's forgotten password.
     *
     * Generates a token to restore a customer's forgotten password.
     *
     * @param {string} userId Customer's user id. Customer user id is case insensitive.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    restorePasswordWithHttpOperationResponse(userId: string, baseSiteId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get a list of available languages.
     *
     * Lists all available languages (all languages used for a particular store). If the list of
     * languages for a base store is empty, a list of all languages available in the system will be
     * returned.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetLanguagesOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getLanguagesWithHttpOperationResponse(baseSiteId: string, options?: Models.CommerceWebservicesV2GetLanguagesOptionalParams): Promise<msRest.HttpOperationResponse<Models.LanguageList>>;
    /**
     * @summary Get a order
     *
     * Returns details of a specific order based on the order GUID (Globally Unique Identifier) or the
     * order CODE. The response contains detailed order information.
     *
     * @param {string} code Order GUID (Globally Unique Identifier) or order CODE
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetOrderOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getOrderWithHttpOperationResponse(code: string, baseSiteId: string, options?: Models.CommerceWebservicesV2GetOrderOptionalParams): Promise<msRest.HttpOperationResponse<Models.Order>>;
    /**
     * @summary Get products added to the express update feed
     *
     * Returns products added to the express update feed. Returns only elements updated after the
     * provided timestamp. The queue is cleared using a defined cronjob.
     *
     * @param {string} timestamp Only items newer than the given parameter are retrieved from the
     * queue. This parameter should be in ISO-8601 format.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2ExpressUpdateOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    expressUpdateWithHttpOperationResponse(timestamp: string, baseSiteId: string, options?: Models.CommerceWebservicesV2ExpressUpdateOptionalParams): Promise<msRest.HttpOperationResponse<Models.ProductExpressUpdateElementList>>;
    /**
     * @summary Get a list of products and additional data
     *
     * Returns a list of products and additional data, such as available facets, available sorting, and
     * pagination options. It can also include spelling suggestions. To make spelling suggestions work,
     * you need to make sure that "enableSpellCheck" on the SearchQuery is set to "true" (by default,
     * it should already be set to "true"). You also need to have indexed properties configured to be
     * used for spellchecking.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2SearchProductsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    searchProductsWithHttpOperationResponse(baseSiteId: string, options?: Models.CommerceWebservicesV2SearchProductsOptionalParams): Promise<msRest.HttpOperationResponse<Models.ProductSearchPage>>;
    /**
     * @summary Get a header with total number of products
     *
     * In the response header, the "x-total-count" indicates the total number of products satisfying a
     * query.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2CountSearchProductsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    countSearchProductsWithHttpOperationResponse(baseSiteId: string, options?: Models.CommerceWebservicesV2CountSearchProductsOptionalParams): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get a list of available suggestions
     *
     * Returns a list of all available suggestions related to a given term and limits the results to a
     * specific value of the max parameter.
     *
     * @param {string} term Specified term
     *
     * @param {number} max Specifies the limit of results.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetSuggestionsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getSuggestionsWithHttpOperationResponse(term: string, max: number, baseSiteId: string, options?: Models.CommerceWebservicesV2GetSuggestionsOptionalParams): Promise<msRest.HttpOperationResponse<Models.SuggestionList>>;
    /**
     * @summary Get product details
     *
     * Returns details of a single product according to a product code.
     *
     * @param {string} productCode Product identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetProductByCodeOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getProductByCodeWithHttpOperationResponse(productCode: string, baseSiteId: string, options?: Models.CommerceWebservicesV2GetProductByCodeOptionalParams): Promise<msRest.HttpOperationResponse<Models.Product>>;
    /**
     * @summary Get a product reference
     *
     * Returns references for a product with a given product code. Reference type specifies which
     * references to return.
     *
     * @param {string} productCode Product identifier
     *
     * @param {string} referenceType Reference type according to enum ProductReferenceTypeEnum
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2ExportProductReferencesOptionalParams} [options] Optional
     * Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    exportProductReferencesWithHttpOperationResponse(productCode: string, referenceType: string, baseSiteId: string, options?: Models.CommerceWebservicesV2ExportProductReferencesOptionalParams): Promise<msRest.HttpOperationResponse<Models.ProductReferenceList>>;
    /**
     * @summary Get reviews for a product
     *
     * Returns the reviews for a product with a given product code.
     *
     * @param {string} productCode Product identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetProductReviewsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getProductReviewsWithHttpOperationResponse(productCode: string, baseSiteId: string, options?: Models.CommerceWebservicesV2GetProductReviewsOptionalParams): Promise<msRest.HttpOperationResponse<Models.ReviewList>>;
    /**
     * @summary Creates a new customer review as an anonymous user
     *
     * Creates a new customer review as an anonymous user.
     *
     * @param {string} productCode Product identifier
     *
     * @param {Review} review Object contains review details like : rating, alias, headline, comment
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2CreateReviewPrimOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createReviewPrimWithHttpOperationResponse(productCode: string, review: Models.Review, baseSiteId: string, options?: Models.CommerceWebservicesV2CreateReviewPrimOptionalParams): Promise<msRest.HttpOperationResponse<Models.Review>>;
    /**
     * @summary Get a product's stock level
     *
     * Returns a product's stock levels sorted by distance from the specified location, which is
     * provided using the free-text "location" parameter, or by using the longitude and latitude
     * parameters. The following two sets of parameters are available: location (required), currentPage
     * (optional), pageSize (optional); or longitude (required), latitude (required), currentPage
     * (optional), pageSize(optional).
     *
     * @param {string} productCode Product identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2SearchProductStockByLocationOptionalParams} [options] Optional
     * Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    searchProductStockByLocationWithHttpOperationResponse(productCode: string, baseSiteId: string, options?: Models.CommerceWebservicesV2SearchProductStockByLocationOptionalParams): Promise<msRest.HttpOperationResponse<Models.StoreFinderStockSearchPage>>;
    /**
     * @summary Get header with a total number of product's stock levels
     *
     * In the response header, the "x-total-count" indicates the total number of a product's stock
     * levels. The following two sets of parameters are available: location (required); or longitude
     * (required), and latitude (required).
     *
     * @param {string} productCode Product identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2CountSearchProductStockByLocationOptionalParams} [options] Optional
     * Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    countSearchProductStockByLocationWithHttpOperationResponse(productCode: string, baseSiteId: string, options?: Models.CommerceWebservicesV2CountSearchProductStockByLocationOptionalParams): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get a product's stock level for a store
     *
     * Returns a product's stock level for a particular store (in other words, for a particular point
     * of sale).
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} productCode Product identifier
     *
     * @param {string} storeName Store identifier
     *
     * @param {CommerceWebservicesV2GetStockDataOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getStockDataWithHttpOperationResponse(baseSiteId: string, productCode: string, storeName: string, options?: Models.CommerceWebservicesV2GetStockDataOptionalParams): Promise<msRest.HttpOperationResponse<Models.Stock>>;
    /**
     * @summary Get a list of promotions
     *
     * Returns promotions defined for a current base site. Requests pertaining to promotions have been
     * developed for the previous version of promotions and vouchers and therefore some of them are
     * currently not compatible with the new promotion engine.
     *
     * @param {Type} type Defines what type of promotions should be returned. Values supported for that
     * parameter are: <ul><li>all: All available promotions are returned</li><li>product: Only product
     * promotions are returned</li><li>order: Only order promotions are returned</li></ul>. Possible
     * values include: 'all', 'product', 'order'
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetPromotionsPrimOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPromotionsPrimWithHttpOperationResponse(type: Models.Type, baseSiteId: string, options?: Models.CommerceWebservicesV2GetPromotionsPrimOptionalParams): Promise<msRest.HttpOperationResponse<Models.PromotionList>>;
    /**
     * @summary Get a promotion based on code
     *
     * Returns details of a single promotion specified by a promotion code. Requests pertaining to
     * promotions have been developed for the previous version of promotions and vouchers and therefore
     * some of them are currently not compatible with the new promotion engine.
     *
     * @param {string} code Promotion identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetPromotionByCodeOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPromotionByCodeWithHttpOperationResponse(code: string, baseSiteId: string, options?: Models.CommerceWebservicesV2GetPromotionByCodeOptionalParams): Promise<msRest.HttpOperationResponse<Models.Promotion>>;
    /**
     * @summary Get a list of store locations
     *
     * Lists all store locations that are near the location specified in a query or based on latitude
     * and longitude.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2LocationSearchOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    locationSearchWithHttpOperationResponse(baseSiteId: string, options?: Models.CommerceWebservicesV2LocationSearchOptionalParams): Promise<msRest.HttpOperationResponse<Models.StoreFinderSearchPage>>;
    /**
     * @summary Get a header with the number of store locations
     *
     * In the response header, the "x-total-count" indicates the number of all store locations that are
     * near the location specified in a query, or based on latitude and longitude.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2CountLocationSearchOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    countLocationSearchWithHttpOperationResponse(baseSiteId: string, options?: Models.CommerceWebservicesV2CountLocationSearchOptionalParams): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get a store location
     *
     * Returns store location based on its unique name.
     *
     * @param {string} storeId Store identifier (currently store name)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2LocationDetailsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    locationDetailsWithHttpOperationResponse(storeId: string, baseSiteId: string, options?: Models.CommerceWebservicesV2LocationDetailsOptionalParams): Promise<msRest.HttpOperationResponse<Models.PointOfService>>;
    /**
     * @summary Get a list of all localized titles.
     *
     * Lists all localized titles.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetTitlesOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getTitlesWithHttpOperationResponse(baseSiteId: string, options?: Models.CommerceWebservicesV2GetTitlesOptionalParams): Promise<msRest.HttpOperationResponse<Models.TitleList>>;
    /**
     * @summary  Registers a customer
     *
     * Registers a customer. There are two options for registering a customer. The first option
     * requires the following parameters: login, password, firstName, lastName, titleCode. The second
     * option converts a guest to a customer. In this case, the required parameters are: guid,
     * password.
     *
     * @param {UserSignUp} user User's object.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2RegisterUserPrimOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    registerUserPrimWithHttpOperationResponse(user: Models.UserSignUp, baseSiteId: string, options?: Models.CommerceWebservicesV2RegisterUserPrimOptionalParams): Promise<msRest.HttpOperationResponse<Models.User>>;
    /**
     * @summary Get customer profile
     *
     * Returns customer profile.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetUserOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getUserWithHttpOperationResponse(baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2GetUserOptionalParams): Promise<msRest.HttpOperationResponse<Models.User>>;
    /**
     * @summary Updates customer profile
     *
     * Updates customer profile. Attributes not provided in the request body will be defined again (set
     * to null or default).
     *
     * @param {User} user User's object
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    putUserPrimWithHttpOperationResponse(user: Models.User, baseSiteId: string, userId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Delete customer profile
     *
     * Removes customer profile.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deactivateUserWithHttpOperationResponse(baseSiteId: string, userId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Updates customer profile
     *
     * Updates customer profile. Only attributes provided in the request body will be changed.
     *
     * @param {User} user User's object.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateUserPrimWithHttpOperationResponse(user: Models.User, baseSiteId: string, userId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get customer's addresses
     *
     * Returns customer's addresses.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetAddressesOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getAddressesWithHttpOperationResponse(baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2GetAddressesOptionalParams): Promise<msRest.HttpOperationResponse<Models.AddressList>>;
    /**
     * @summary Creates a new address.
     *
     * Creates a new address.
     *
     * @param {Address} address Address object.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2CreateAddressPrimOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createAddressPrimWithHttpOperationResponse(address: Models.Address, baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2CreateAddressPrimOptionalParams): Promise<msRest.HttpOperationResponse<Models.Address>>;
    /**
     * @summary Verifies address
     *
     * Verifies address.
     *
     * @param {Address} address Address object.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2VerifyAddressPrimOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    verifyAddressPrimWithHttpOperationResponse(address: Models.Address, baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2VerifyAddressPrimOptionalParams): Promise<msRest.HttpOperationResponse<Models.AddressValidation>>;
    /**
     * @summary Get info about address
     *
     * Returns detailed information about address with a given id.
     *
     * @param {string} addressId Address identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetAddressOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getAddressWithHttpOperationResponse(addressId: string, baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2GetAddressOptionalParams): Promise<msRest.HttpOperationResponse<Models.Address>>;
    /**
     * @summary Updates the address
     *
     * Updates the address. Attributes not provided in the request will be defined again (set to null
     * or default).
     *
     * @param {string} addressId Address identifier.
     *
     * @param {Address} address Address object.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    putAddressPrimWithHttpOperationResponse(addressId: string, address: Models.Address, baseSiteId: string, userId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Delete customer's address
     *
     * Removes customer's address.
     *
     * @param {string} addressId Address identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteAddressWithHttpOperationResponse(addressId: string, baseSiteId: string, userId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Updates the address
     *
     * Updates the address. Only attributes provided in the request body will be changed.
     *
     * @param {string} addressId Address identifier.
     *
     * @param {Address} address Address object
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    patchAddressPrimWithHttpOperationResponse(addressId: string, address: Models.Address, baseSiteId: string, userId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get all customer carts.
     *
     * Lists all customer carts.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetCartsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCartsWithHttpOperationResponse(baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2GetCartsOptionalParams): Promise<msRest.HttpOperationResponse<Models.CartList>>;
    /**
     * @summary Creates or restore a cart for a user.
     *
     * Creates a new cart or restores an anonymous cart as a user's cart (if an old Cart Id is given in
     * the request).
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2CreateCartOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createCartWithHttpOperationResponse(baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2CreateCartOptionalParams): Promise<msRest.HttpOperationResponse<Models.Cart>>;
    /**
     * @summary Get a cart with a given identifier.
     *
     * Returns the cart with a given identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetCartOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCartWithHttpOperationResponse(baseSiteId: string, userId: string, cartId: string, options?: Models.CommerceWebservicesV2GetCartOptionalParams): Promise<msRest.HttpOperationResponse<Models.Cart>>;
    /**
     * @summary Deletes a cart with a given cart id.
     *
     * Deletes a cart with a given cart id.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteCartWithHttpOperationResponse(baseSiteId: string, userId: string, cartId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Creates a delivery address for the cart.
     *
     * Creates an address and assigns it to the cart as the delivery address.
     *
     * @param {Address} address Request body parameter that contains details such as the customer's
     * first name (firstName), the customer's last name (lastName), the customer's title (titleCode),
     * the country (country.isocode), the first part of the address (line1), the second part of the
     * address (line2), the town (town), the postal code (postalCode), and the region (region.isocode).
     *
     * The DTO is in XML or .json format.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2CreateAndSetAddressPrimOptionalParams} [options] Optional
     * Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createAndSetAddressPrimWithHttpOperationResponse(address: Models.Address, baseSiteId: string, userId: string, cartId: string, options?: Models.CommerceWebservicesV2CreateAndSetAddressPrimOptionalParams): Promise<msRest.HttpOperationResponse<Models.Address>>;
    /**
     * @summary Sets a delivery address for the cart.
     *
     * Sets a delivery address for the cart. The address country must be placed among the delivery
     * countries of the current base store.
     *
     * @param {string} addressId Address identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    setCartDeliveryAddressWithHttpOperationResponse(addressId: string, baseSiteId: string, userId: string, cartId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Delete the delivery address from the cart.
     *
     * Removes the delivery address from the cart.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    removeCartDeliveryAddressWithHttpOperationResponse(baseSiteId: string, userId: string, cartId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Explicitly clones a cart.
     *
     * Explicitly clones a cart.
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2CloneSaveCartOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    cloneSaveCartWithHttpOperationResponse(cartId: string, baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2CloneSaveCartOptionalParams): Promise<msRest.HttpOperationResponse<Models.SaveCartResult>>;
    /**
     * @summary Get the delivery mode selected for the cart.
     *
     * Returns the delivery mode selected for the cart.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetCartDeliveryModeOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCartDeliveryModeWithHttpOperationResponse(baseSiteId: string, userId: string, cartId: string, options?: Models.CommerceWebservicesV2GetCartDeliveryModeOptionalParams): Promise<msRest.HttpOperationResponse<Models.DeliveryMode>>;
    /**
     * @summary Sets the delivery mode for a cart.
     *
     * Sets the delivery mode with a given identifier for the cart.
     *
     * @param {string} deliveryModeId Delivery mode identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    setCartDeliveryModeWithHttpOperationResponse(deliveryModeId: string, baseSiteId: string, userId: string, cartId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Delete the delivery mode from the cart.
     *
     * Removes the delivery mode from the cart.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    removeDeliveryModeWithHttpOperationResponse(baseSiteId: string, userId: string, cartId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get all delivery modes for the current store and delivery address.
     *
     * Returns all delivery modes supported for the current base store and cart delivery address. A
     * delivery address must be set for the cart, otherwise an empty list will be returned.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetSupportedDeliveryModesOptionalParams} [options] Optional
     * Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getSupportedDeliveryModesWithHttpOperationResponse(baseSiteId: string, userId: string, cartId: string, options?: Models.CommerceWebservicesV2GetSupportedDeliveryModesOptionalParams): Promise<msRest.HttpOperationResponse<Models.DeliveryModeList>>;
    /**
     * @summary Assigns an email to the cart.
     *
     * Assigns an email to the cart. This step is required to make a guest checkout.
     *
     * @param {string} email Email of the guest user. It will be used during the checkout process.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    guestLoginWithHttpOperationResponse(email: string, baseSiteId: string, userId: string, cartId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get cart entries.
     *
     * Returns cart entries.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetCartEntriesOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCartEntriesWithHttpOperationResponse(baseSiteId: string, userId: string, cartId: string, options?: Models.CommerceWebservicesV2GetCartEntriesOptionalParams): Promise<msRest.HttpOperationResponse<Models.OrderEntryList>>;
    /**
     * @summary Adds a product to the cart.
     *
     * Adds a product to the cart.
     *
     * @param {OrderEntry} entry Request body parameter that contains details such as the product code
     * (product.code), the quantity of product (quantity), and the pickup store name
     * (deliveryPointOfService.name).
     *
     * The DTO is in XML or .json format.
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2AddCartEntryPrimOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addCartEntryPrimWithHttpOperationResponse(entry: Models.OrderEntry, userId: string, cartId: string, baseSiteId: string, options?: Models.CommerceWebservicesV2AddCartEntryPrimOptionalParams): Promise<msRest.HttpOperationResponse<Models.CartModification>>;
    /**
     * @summary Get the details of the cart entries.
     *
     * Returns the details of the cart entries.
     *
     * @param {number} entryNumber The entry number. Each entry in a cart has an entry number. Cart
     * entries are numbered in ascending order, starting with zero (0).
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetCartEntryOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCartEntryWithHttpOperationResponse(entryNumber: number, baseSiteId: string, userId: string, cartId: string, options?: Models.CommerceWebservicesV2GetCartEntryOptionalParams): Promise<msRest.HttpOperationResponse<Models.OrderEntry>>;
    /**
     * @summary Set quantity and store details of a cart entry.
     *
     * Updates the quantity of a single cart entry and the details of the store where the cart entry
     * will be picked up. Attributes not provided in request will be defined again (set to null or
     * default)
     *
     * @param {number} entryNumber The entry number. Each entry in a cart has an entry number. Cart
     * entries are numbered in ascending order, starting with zero (0).
     *
     * @param {OrderEntry} entry Request body parameter that contains details such as the quantity of
     * product (quantity), and the pickup store name (deliveryPointOfService.name)
     *
     * The DTO is in XML or .json format.
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2SetCartEntryPrimOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    setCartEntryPrimWithHttpOperationResponse(entryNumber: number, entry: Models.OrderEntry, userId: string, cartId: string, baseSiteId: string, options?: Models.CommerceWebservicesV2SetCartEntryPrimOptionalParams): Promise<msRest.HttpOperationResponse<Models.CartModification>>;
    /**
     * @summary Deletes cart entry.
     *
     * Deletes cart entry.
     *
     * @param {number} entryNumber The entry number. Each entry in a cart has an entry number. Cart
     * entries are numbered in ascending order, starting with zero (0).
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    removeCartEntryWithHttpOperationResponse(entryNumber: number, baseSiteId: string, userId: string, cartId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Update quantity and store details of a cart entry.
     *
     * Updates the quantity of a single cart entry and the details of the store where the cart entry
     * will be picked up.
     *
     * @param {number} entryNumber The entry number. Each entry in a cart has an entry number. Cart
     * entries are numbered in ascending order, starting with zero (0).
     *
     * @param {OrderEntry} entry Request body parameter that contains details such as the quantity of
     * product (quantity), and the pickup store name (deliveryPointOfService.name)
     *
     * The DTO is in XML or .json format.
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2UpdateCartEntryPrimOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updateCartEntryPrimWithHttpOperationResponse(entryNumber: number, entry: Models.OrderEntry, userId: string, cartId: string, baseSiteId: string, options?: Models.CommerceWebservicesV2UpdateCartEntryPrimOptionalParams): Promise<msRest.HttpOperationResponse<Models.CartModification>>;
    /**
     * @summary Flag a cart for deletion.
     *
     * Flags a cart for deletion (the cart doesn't have corresponding save cart attributes anymore).
     * The cart is not actually deleted from the database. But with the removal of the saved cart
     * attributes, this cart will be taken care of by the cart removal job just like any other cart.
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2FlagForDeletionOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    flagForDeletionWithHttpOperationResponse(cartId: string, baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2FlagForDeletionOptionalParams): Promise<msRest.HttpOperationResponse<Models.SaveCartResult>>;
    /**
     * @summary Defines and assigns details of a new credit card payment to the cart.
     *
     * Defines the details of a new credit card, and assigns this payment option to the cart.
     *
     * @param {PaymentDetails} paymentDetails Request body parameter that contains details such as the
     * name on the card (accountHolderName), the card number (cardNumber), the card type
     * (cardType.code), the month of the expiry date (expiryMonth), the year of the expiry date
     * (expiryYear), whether the payment details should be saved (saved), whether the payment details
     * should be set as default (defaultPaymentInfo), and the billing address
     * (billingAddress.firstName, billingAddress.lastName, billingAddress.titleCode,
     * billingAddress.country.isocode, billingAddress.line1, billingAddress.line2, billingAddress.town,
     * billingAddress.postalCode, billingAddress.region.isocode)
     *
     * The DTO is in XML or .json format.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2AddPaymentDetailsPrimOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    addPaymentDetailsPrimWithHttpOperationResponse(paymentDetails: Models.PaymentDetails, baseSiteId: string, userId: string, cartId: string, options?: Models.CommerceWebservicesV2AddPaymentDetailsPrimOptionalParams): Promise<msRest.HttpOperationResponse<Models.PaymentDetails>>;
    /**
     * @summary Sets credit card payment details for the cart.
     *
     * Sets credit card payment details for the cart.
     *
     * @param {string} paymentDetailsId Payment details identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    setPaymentDetailsWithHttpOperationResponse(paymentDetailsId: string, baseSiteId: string, userId: string, cartId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get information about promotions applied on cart.
     *
     * Returns information about the promotions applied on the cart. Requests pertaining to promotions
     * have been developed for the previous version of promotions and vouchers, and as a result, some
     * of them are currently not compatible with the new promotions engine.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetPromotionsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPromotionsWithHttpOperationResponse(baseSiteId: string, userId: string, cartId: string, options?: Models.CommerceWebservicesV2GetPromotionsOptionalParams): Promise<msRest.HttpOperationResponse<Models.PromotionResultList>>;
    /**
     * @summary Enables promotions based on the promotionsId of the cart.
     *
     * Enables a promotion for the order based on the promotionId defined for the cart. Requests
     * pertaining to promotions have been developed for the previous version of promotions and
     * vouchers, and as a result, some of them are currently not compatible with the new promotions
     * engine.
     *
     * @param {string} promotionId Promotion identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    applyPromotionWithHttpOperationResponse(promotionId: string, baseSiteId: string, userId: string, cartId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get information about promotions applied on cart.
     *
     * Returns information about a promotion (with a specific promotionId), that has been applied on
     * the cart. Requests pertaining to promotions have been developed for the previous version of
     * promotions and vouchers, and as a result, some of them are currently not compatible with the new
     * promotions engine.
     *
     * @param {string} promotionId Promotion identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetPromotionOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPromotionWithHttpOperationResponse(promotionId: string, baseSiteId: string, userId: string, cartId: string, options?: Models.CommerceWebservicesV2GetPromotionOptionalParams): Promise<msRest.HttpOperationResponse<Models.PromotionResultList>>;
    /**
     * @summary Disables the promotion based on the promotionsId of the cart.
     *
     * Disables the promotion for the order based on the promotionId defined for the cart. Requests
     * pertaining to promotions have been developed for the previous version of promotions and
     * vouchers, and as a result, some of them are currently not compatible with the new promotions
     * engine.
     *
     * @param {string} promotionId Promotion identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    removePromotionWithHttpOperationResponse(promotionId: string, baseSiteId: string, userId: string, cartId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Restore a saved cart.
     *
     * Restore a saved cart.
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2RestoreSavedCartOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    restoreSavedCartWithHttpOperationResponse(cartId: string, baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2RestoreSavedCartOptionalParams): Promise<msRest.HttpOperationResponse<Models.SaveCartResult>>;
    /**
     * @summary Explicitly saves a cart.
     *
     * Explicitly saves a cart.
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2SaveCartOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    saveCartWithHttpOperationResponse(cartId: string, baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2SaveCartOptionalParams): Promise<msRest.HttpOperationResponse<Models.SaveCartResult>>;
    /**
     * @summary Get a saved cart.
     *
     * Returns a saved cart for an authenticated user. The cart is identified using the "cartId"
     * parameter.
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetSavedCartOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getSavedCartWithHttpOperationResponse(cartId: string, baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2GetSavedCartOptionalParams): Promise<msRest.HttpOperationResponse<Models.SaveCartResult>>;
    /**
     * @summary Get a list of vouchers applied to the cart.
     *
     * Returns a list of vouchers applied to the cart.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetVouchersOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getVouchersWithHttpOperationResponse(baseSiteId: string, userId: string, cartId: string, options?: Models.CommerceWebservicesV2GetVouchersOptionalParams): Promise<msRest.HttpOperationResponse<Models.VoucherList>>;
    /**
     * @summary Applies a voucher based on the voucherId defined for the cart.
     *
     * Applies a voucher based on the voucherId defined for the cart.
     *
     * @param {string} voucherId Voucher identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    applyVoucherForCartWithHttpOperationResponse(voucherId: string, baseSiteId: string, userId: string, cartId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Delete a voucher defined for the current cart.
     *
     * Removes a voucher based on the voucherId defined for the current cart.
     *
     * @param {string} voucherId Voucher identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    releaseVoucherFromCartWithHttpOperationResponse(voucherId: string, baseSiteId: string, userId: string, cartId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get all customer groups of a customer.
     *
     * Returns all customer groups of a customer.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetAllCustomerGroupsForCustomerOptionalParams} [options] Optional
     * Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getAllCustomerGroupsForCustomerWithHttpOperationResponse(baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2GetAllCustomerGroupsForCustomerOptionalParams): Promise<msRest.HttpOperationResponse<Models.UserGroupList>>;
    /**
     * @summary Changes customer's login name.
     *
     * Changes a customer's login name. Requires the customer's current password.
     *
     * @param {string} newLogin Customer's new login name. Customer login is case insensitive.
     *
     * @param {string} password Customer's current password.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    changeLoginWithHttpOperationResponse(newLogin: string, password: string, baseSiteId: string, userId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get order history for user
     *
     * Returns order history data for all orders placed by a specified user for a specified base store.
     * The response can display the results across multiple pages, if required.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetOrdersForUserOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getOrdersForUserWithHttpOperationResponse(baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2GetOrdersForUserOptionalParams): Promise<msRest.HttpOperationResponse<Models.OrderHistoryList>>;
    /**
     * @summary Get total number of orders
     *
     * In the response header, the "x-total-count" indicates the total number of orders placed by a
     * specified user for a specified base store.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetCountOrdersForUserOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getCountOrdersForUserWithHttpOperationResponse(baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2GetCountOrdersForUserOptionalParams): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Post a order
     *
     * Authorizes the cart and places the order. The response contains the new order data.
     *
     * @param {string} cartId Cart code for logged in user, cart GUID for guest checkout
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2PlaceOrderOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    placeOrderWithHttpOperationResponse(cartId: string, baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2PlaceOrderOptionalParams): Promise<msRest.HttpOperationResponse<Models.Order>>;
    /**
     * @summary Get a order
     *
     * Returns specific order details based on a specific order code. The response contains detailed
     * order information.
     *
     * @param {string} code Order GUID (Globally Unique Identifier) or order CODE
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetOrderForUserByCodeOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getOrderForUserByCodeWithHttpOperationResponse(code: string, baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2GetOrderForUserByCodeOptionalParams): Promise<msRest.HttpOperationResponse<Models.Order>>;
    /**
     * @summary Changes customer's password
     *
     * Changes customer's password.
     *
     * @param {string} newParameter New password.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2ChangePasswordOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    changePasswordWithHttpOperationResponse(newParameter: string, baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2ChangePasswordOptionalParams): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get customer's credit card payment details list.
     *
     * Return customer's credit card payment details list.
     *
     * @param {boolean} saved Type of payment details.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetPaymentInfosOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPaymentInfosWithHttpOperationResponse(saved: boolean, baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2GetPaymentInfosOptionalParams): Promise<msRest.HttpOperationResponse<Models.PaymentDetailsList>>;
    /**
     * @summary Get customer's credit card payment details.
     *
     * Returns a customer's credit card payment details for the specified paymentDetailsId.
     *
     * @param {string} paymentDetailsId Payment details identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetPaymentDetailsOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getPaymentDetailsWithHttpOperationResponse(paymentDetailsId: string, baseSiteId: string, userId: string, options?: Models.CommerceWebservicesV2GetPaymentDetailsOptionalParams): Promise<msRest.HttpOperationResponse<Models.PaymentDetails>>;
    /**
     * @summary Updates existing customer's credit card payment info.
     *
     * Updates existing customer's credit card payment info based on the payment info ID. Attributes
     * not given in request will be defined again (set to null or default).
     *
     * @param {string} paymentDetailsId Payment details identifier.
     *
     * @param {PaymentDetails} paymentDetails Payment details object.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    putPaymentInfoPrimWithHttpOperationResponse(paymentDetailsId: string, paymentDetails: Models.PaymentDetails, baseSiteId: string, userId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Delete customer's credit card payment details.
     *
     * Removes a customer's credit card payment details based on a specified paymentDetailsId.
     *
     * @param {string} paymentDetailsId Payment details identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deletePaymentInfoWithHttpOperationResponse(paymentDetailsId: string, baseSiteId: string, userId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Updates existing customer's credit card payment details.
     *
     * Updates an existing customer's credit card payment details based on the specified
     * paymentDetailsId. Only those attributes provided in the request will be updated.
     *
     * @param {string} paymentDetailsId Payment details identifier.
     *
     * @param {PaymentDetails} paymentDetails Payment details object
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    updatePaymentInfoPrimWithHttpOperationResponse(paymentDetailsId: string, paymentDetails: Models.PaymentDetails, baseSiteId: string, userId: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>>;
    /**
     * @summary Get a voucher based on code
     *
     * Returns details of a single voucher that is specified by its voucher identification code.
     *
     * @param {string} code Voucher identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetVoucherByCodeOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getVoucherByCodeWithHttpOperationResponse(code: string, baseSiteId: string, options?: Models.CommerceWebservicesV2GetVoucherByCodeOptionalParams): Promise<msRest.HttpOperationResponse<Models.Voucher>>;
    /**
     * @summary Get a list of supported payment card types.
     *
     * Lists supported payment card types.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetCardTypesOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.CardTypeList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.CardTypeList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCardTypes(baseSiteId: string): Promise<Models.CardTypeList>;
    getCardTypes(baseSiteId: string, options: Models.CommerceWebservicesV2GetCardTypesOptionalParams): Promise<Models.CardTypeList>;
    getCardTypes(baseSiteId: string, callback: msRest.ServiceCallback<Models.CardTypeList>): void;
    getCardTypes(baseSiteId: string, options: Models.CommerceWebservicesV2GetCardTypesOptionalParams, callback: msRest.ServiceCallback<Models.CardTypeList>): void;
    /**
     * @summary Get a list of catalogs
     *
     * Returns all catalogs with versions defined for the base store.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetCatalogsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.CatalogList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.CatalogList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCatalogs(baseSiteId: string): Promise<Models.CatalogList>;
    getCatalogs(baseSiteId: string, options: Models.CommerceWebservicesV2GetCatalogsOptionalParams): Promise<Models.CatalogList>;
    getCatalogs(baseSiteId: string, callback: msRest.ServiceCallback<Models.CatalogList>): void;
    getCatalogs(baseSiteId: string, options: Models.CommerceWebservicesV2GetCatalogsOptionalParams, callback: msRest.ServiceCallback<Models.CatalogList>): void;
    /**
     * @summary Get a catalog
     *
     * Returns information about a catalog based on its ID, along with the versions defined for the
     * current base store.
     *
     * @param {string} catalogId Catalog identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetCatalogOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.Catalog} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.Catalog} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCatalog(catalogId: string, baseSiteId: string): Promise<Models.Catalog>;
    getCatalog(catalogId: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetCatalogOptionalParams): Promise<Models.Catalog>;
    getCatalog(catalogId: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.Catalog>): void;
    getCatalog(catalogId: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetCatalogOptionalParams, callback: msRest.ServiceCallback<Models.Catalog>): void;
    /**
     * @summary Get information about catalog version
     *
     * Returns information about the catalog version that exists for the current base store.
     *
     * @param {string} catalogId Catalog identifier
     *
     * @param {string} catalogVersionId Catalog version identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetCatalogVersionOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.CatalogVersion} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.CatalogVersion} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCatalogVersion(catalogId: string, catalogVersionId: string, baseSiteId: string): Promise<Models.CatalogVersion>;
    getCatalogVersion(catalogId: string, catalogVersionId: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetCatalogVersionOptionalParams): Promise<Models.CatalogVersion>;
    getCatalogVersion(catalogId: string, catalogVersionId: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.CatalogVersion>): void;
    getCatalogVersion(catalogId: string, catalogVersionId: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetCatalogVersionOptionalParams, callback: msRest.ServiceCallback<Models.CatalogVersion>): void;
    /**
     * @summary Get information about catagory in a catalog version
     *
     * Returns information about a specified category that exists in a catalog version available for
     * the current base store.
     *
     * @param {string} catalogId Catalog identifier
     *
     * @param {string} catalogVersionId Catalog version identifier
     *
     * @param {string} categoryId Category identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetCategoriesOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.CategoryHierarchy} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.CategoryHierarchy} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCategories(catalogId: string, catalogVersionId: string, categoryId: string, baseSiteId: string): Promise<Models.CategoryHierarchy>;
    getCategories(catalogId: string, catalogVersionId: string, categoryId: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetCategoriesOptionalParams): Promise<Models.CategoryHierarchy>;
    getCategories(catalogId: string, catalogVersionId: string, categoryId: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.CategoryHierarchy>): void;
    getCategories(catalogId: string, catalogVersionId: string, categoryId: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetCategoriesOptionalParams, callback: msRest.ServiceCallback<Models.CategoryHierarchy>): void;
    /**
     * @summary Get components' data by id given in body
     *
     * Given a list of component identifiers in body, return cms component data.
     *
     * @param {ComponentIDList} componentIdList List of Component identifiers
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetComponentByIdListOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.ListAdaptedComponents} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.ListAdaptedComponents} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getComponentByIdList(componentIdList: Models.ComponentIDList, baseSiteId: string): Promise<Models.ListAdaptedComponents>;
    getComponentByIdList(componentIdList: Models.ComponentIDList, baseSiteId: string, options: Models.CommerceWebservicesV2GetComponentByIdListOptionalParams): Promise<Models.ListAdaptedComponents>;
    getComponentByIdList(componentIdList: Models.ComponentIDList, baseSiteId: string, callback: msRest.ServiceCallback<Models.ListAdaptedComponents>): void;
    getComponentByIdList(componentIdList: Models.ComponentIDList, baseSiteId: string, options: Models.CommerceWebservicesV2GetComponentByIdListOptionalParams, callback: msRest.ServiceCallback<Models.ListAdaptedComponents>): void;
    /**
     * @summary Get component data
     *
     * Given a component identifier, return cms component data.
     *
     * @param {string} componentId Component identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetComponentByIdOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {any} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getComponentById(componentId: string, baseSiteId: string): Promise<any>;
    getComponentById(componentId: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetComponentByIdOptionalParams): Promise<any>;
    getComponentById(componentId: string, baseSiteId: string, callback: msRest.ServiceCallback<any>): void;
    getComponentById(componentId: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetComponentByIdOptionalParams, callback: msRest.ServiceCallback<any>): void;
    /**
     * @summary Get page data with list of cms content slots
     *
     * Given a page identifier, return the page data with a list of cms content slots, each of which
     * contains a list of cms component data.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetPageDataOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.CMSPage} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.CMSPage} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPageData(baseSiteId: string): Promise<Models.CMSPage>;
    getPageData(baseSiteId: string, options: Models.CommerceWebservicesV2GetPageDataOptionalParams): Promise<Models.CMSPage>;
    getPageData(baseSiteId: string, callback: msRest.ServiceCallback<Models.CMSPage>): void;
    getPageData(baseSiteId: string, options: Models.CommerceWebservicesV2GetPageDataOptionalParams, callback: msRest.ServiceCallback<Models.CMSPage>): void;
    /**
     * @summary Get a list of available currencies.
     *
     * Lists all available currencies (all usable currencies for the current store). If the list of
     * currencies for a base store is empty, a list of all currencies available in the system is
     * returned.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetCurrenciesOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.CurrencyList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.CurrencyList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCurrencies(baseSiteId: string): Promise<Models.CurrencyList>;
    getCurrencies(baseSiteId: string, options: Models.CommerceWebservicesV2GetCurrenciesOptionalParams): Promise<Models.CurrencyList>;
    getCurrencies(baseSiteId: string, callback: msRest.ServiceCallback<Models.CurrencyList>): void;
    getCurrencies(baseSiteId: string, options: Models.CommerceWebservicesV2GetCurrenciesOptionalParams, callback: msRest.ServiceCallback<Models.CurrencyList>): void;
    /**
     * @summary Get all subgroups of a customergroup.
     *
     * Returns all customer groups that are direct subgroups of a customergroup.
     *
     * To try out the methods of the Customer Groups controller, you must authorize a user who belongs
     * to the “customermanagergroup”.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetAllCustomerGroupsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.UserGroupList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.UserGroupList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getAllCustomerGroups(baseSiteId: string): Promise<Models.UserGroupList>;
    getAllCustomerGroups(baseSiteId: string, options: Models.CommerceWebservicesV2GetAllCustomerGroupsOptionalParams): Promise<Models.UserGroupList>;
    getAllCustomerGroups(baseSiteId: string, callback: msRest.ServiceCallback<Models.UserGroupList>): void;
    getAllCustomerGroups(baseSiteId: string, options: Models.CommerceWebservicesV2GetAllCustomerGroupsOptionalParams, callback: msRest.ServiceCallback<Models.UserGroupList>): void;
    /**
     * @summary Creates a new customer group.
     *
     * Creates a new customer group that is a direct subgroup of a customergroup.
     *
     * To try out the methods of the Customer Groups controller, you must authorize a user who belongs
     * to the “customermanagergroup”.
     *
     * @param {UserGroup} userGroup User group object with id and name.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    createNewCustomerGroupPrim(userGroup: Models.UserGroup, baseSiteId: string): Promise<void>;
    createNewCustomerGroupPrim(userGroup: Models.UserGroup, baseSiteId: string, options: msRest.RequestOptionsBase): Promise<void>;
    createNewCustomerGroupPrim(userGroup: Models.UserGroup, baseSiteId: string, callback: msRest.ServiceCallback<void>): void;
    createNewCustomerGroupPrim(userGroup: Models.UserGroup, baseSiteId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get a specific customer group.
     *
     * Returns a customer group with a specific groupId.
     *
     * To try out the methods of the Customer Groups controller, you must authorize a user who belongs
     * to the “customermanagergroup”.
     *
     * @param {string} groupId Group identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetCustomerGroupOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.UserGroup} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.UserGroup} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCustomerGroup(groupId: string, baseSiteId: string): Promise<Models.UserGroup>;
    getCustomerGroup(groupId: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetCustomerGroupOptionalParams): Promise<Models.UserGroup>;
    getCustomerGroup(groupId: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.UserGroup>): void;
    getCustomerGroup(groupId: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetCustomerGroupOptionalParams, callback: msRest.ServiceCallback<Models.UserGroup>): void;
    /**
     * @summary Sets members for a user group.
     *
     * Sets members for a user group. The list of existing members is overwritten with a new one.
     *
     * To try out the methods of the Customer Groups controller, you must authorize a user who belongs
     * to the “customermanagergroup”.
     *
     * @param {string} groupId Group identifier.
     *
     * @param {MemberList} members List of users to set for customer group.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    setUserListForCustomerGroupPrim(groupId: string, members: Models.MemberList, baseSiteId: string): Promise<void>;
    setUserListForCustomerGroupPrim(groupId: string, members: Models.MemberList, baseSiteId: string, options: msRest.RequestOptionsBase): Promise<void>;
    setUserListForCustomerGroupPrim(groupId: string, members: Models.MemberList, baseSiteId: string, callback: msRest.ServiceCallback<void>): void;
    setUserListForCustomerGroupPrim(groupId: string, members: Models.MemberList, baseSiteId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Assigns user(s) to a customer group.
     *
     * Assigns user(s) to a customer group.
     *
     * To try out the methods of the Customer Groups controller, you must authorize a user who belongs
     * to the “customermanagergroup”.
     *
     * @param {string} groupId Group identifier.
     *
     * @param {MemberList} members List of users to assign to customer group.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    assignUserToCustomerGroupPrim(groupId: string, members: Models.MemberList, baseSiteId: string): Promise<void>;
    assignUserToCustomerGroupPrim(groupId: string, members: Models.MemberList, baseSiteId: string, options: msRest.RequestOptionsBase): Promise<void>;
    assignUserToCustomerGroupPrim(groupId: string, members: Models.MemberList, baseSiteId: string, callback: msRest.ServiceCallback<void>): void;
    assignUserToCustomerGroupPrim(groupId: string, members: Models.MemberList, baseSiteId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Delete a user from a customer group.
     *
     * Removes user from a customer group.
     *
     * To try out the methods of the Customer Groups controller, you must authorize a user who belongs
     * to the “customermanagergroup”.
     *
     * @param {string} groupId Group identifier.
     *
     * @param {string} userId User identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    removeUsersFromCustomerGroup(groupId: string, userId: string, baseSiteId: string): Promise<void>;
    removeUsersFromCustomerGroup(groupId: string, userId: string, baseSiteId: string, options: msRest.RequestOptionsBase): Promise<void>;
    removeUsersFromCustomerGroup(groupId: string, userId: string, baseSiteId: string, callback: msRest.ServiceCallback<void>): void;
    removeUsersFromCustomerGroup(groupId: string, userId: string, baseSiteId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get a list of supported countries.
     *
     * Lists all supported delivery countries for the current store. The list is sorted alphabetically.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetDeliveryCountriesOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.CountryList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.CountryList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getDeliveryCountries(baseSiteId: string): Promise<Models.CountryList>;
    getDeliveryCountries(baseSiteId: string, options: Models.CommerceWebservicesV2GetDeliveryCountriesOptionalParams): Promise<Models.CountryList>;
    getDeliveryCountries(baseSiteId: string, callback: msRest.ServiceCallback<Models.CountryList>): void;
    getDeliveryCountries(baseSiteId: string, options: Models.CommerceWebservicesV2GetDeliveryCountriesOptionalParams, callback: msRest.ServiceCallback<Models.CountryList>): void;
    /**
     * @summary Get a list of product exports.
     *
     * Used for product export. Depending on the timestamp parameter, it can return all products or
     * only products modified after the given time.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2ExportProductsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.ProductList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.ProductList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    exportProducts(baseSiteId: string): Promise<Models.ProductList>;
    exportProducts(baseSiteId: string, options: Models.CommerceWebservicesV2ExportProductsOptionalParams): Promise<Models.ProductList>;
    exportProducts(baseSiteId: string, callback: msRest.ServiceCallback<Models.ProductList>): void;
    exportProducts(baseSiteId: string, options: Models.CommerceWebservicesV2ExportProductsOptionalParams, callback: msRest.ServiceCallback<Models.ProductList>): void;
    /**
     * @summary Get a list of orders with status updates
     *
     * Returns the orders that have changed status. Returns only the elements from the current baseSite
     * that have been updated after the provided timestamp.
     *
     * @param {string} timestamp Only items newer than the given parameter are retrieved. This
     * parameter should be in ISO-8601 format (for example, 2018-01-09T16:28:45+0000).
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2OrderStatusFeedOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.OrderStatusUpdateElementList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.OrderStatusUpdateElementList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    orderStatusFeed(timestamp: string, baseSiteId: string): Promise<Models.OrderStatusUpdateElementList>;
    orderStatusFeed(timestamp: string, baseSiteId: string, options: Models.CommerceWebservicesV2OrderStatusFeedOptionalParams): Promise<Models.OrderStatusUpdateElementList>;
    orderStatusFeed(timestamp: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.OrderStatusUpdateElementList>): void;
    orderStatusFeed(timestamp: string, baseSiteId: string, options: Models.CommerceWebservicesV2OrderStatusFeedOptionalParams, callback: msRest.ServiceCallback<Models.OrderStatusUpdateElementList>): void;
    /**
     * @summary Generates a token to restore a customer's forgotten password.
     *
     * Generates a token to restore a customer's forgotten password.
     *
     * @param {string} userId Customer's user id. Customer user id is case insensitive.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    restorePassword(userId: string, baseSiteId: string): Promise<void>;
    restorePassword(userId: string, baseSiteId: string, options: msRest.RequestOptionsBase): Promise<void>;
    restorePassword(userId: string, baseSiteId: string, callback: msRest.ServiceCallback<void>): void;
    restorePassword(userId: string, baseSiteId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get a list of available languages.
     *
     * Lists all available languages (all languages used for a particular store). If the list of
     * languages for a base store is empty, a list of all languages available in the system will be
     * returned.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetLanguagesOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.LanguageList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.LanguageList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getLanguages(baseSiteId: string): Promise<Models.LanguageList>;
    getLanguages(baseSiteId: string, options: Models.CommerceWebservicesV2GetLanguagesOptionalParams): Promise<Models.LanguageList>;
    getLanguages(baseSiteId: string, callback: msRest.ServiceCallback<Models.LanguageList>): void;
    getLanguages(baseSiteId: string, options: Models.CommerceWebservicesV2GetLanguagesOptionalParams, callback: msRest.ServiceCallback<Models.LanguageList>): void;
    /**
     * @summary Get a order
     *
     * Returns details of a specific order based on the order GUID (Globally Unique Identifier) or the
     * order CODE. The response contains detailed order information.
     *
     * @param {string} code Order GUID (Globally Unique Identifier) or order CODE
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetOrderOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.Order} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.Order} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getOrder(code: string, baseSiteId: string): Promise<Models.Order>;
    getOrder(code: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetOrderOptionalParams): Promise<Models.Order>;
    getOrder(code: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.Order>): void;
    getOrder(code: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetOrderOptionalParams, callback: msRest.ServiceCallback<Models.Order>): void;
    /**
     * @summary Get products added to the express update feed
     *
     * Returns products added to the express update feed. Returns only elements updated after the
     * provided timestamp. The queue is cleared using a defined cronjob.
     *
     * @param {string} timestamp Only items newer than the given parameter are retrieved from the
     * queue. This parameter should be in ISO-8601 format.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2ExpressUpdateOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.ProductExpressUpdateElementList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.ProductExpressUpdateElementList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    expressUpdate(timestamp: string, baseSiteId: string): Promise<Models.ProductExpressUpdateElementList>;
    expressUpdate(timestamp: string, baseSiteId: string, options: Models.CommerceWebservicesV2ExpressUpdateOptionalParams): Promise<Models.ProductExpressUpdateElementList>;
    expressUpdate(timestamp: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.ProductExpressUpdateElementList>): void;
    expressUpdate(timestamp: string, baseSiteId: string, options: Models.CommerceWebservicesV2ExpressUpdateOptionalParams, callback: msRest.ServiceCallback<Models.ProductExpressUpdateElementList>): void;
    /**
     * @summary Get a list of products and additional data
     *
     * Returns a list of products and additional data, such as available facets, available sorting, and
     * pagination options. It can also include spelling suggestions. To make spelling suggestions work,
     * you need to make sure that "enableSpellCheck" on the SearchQuery is set to "true" (by default,
     * it should already be set to "true"). You also need to have indexed properties configured to be
     * used for spellchecking.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2SearchProductsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.ProductSearchPage} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.ProductSearchPage} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    searchProducts(baseSiteId: string): Promise<Models.ProductSearchPage>;
    searchProducts(baseSiteId: string, options: Models.CommerceWebservicesV2SearchProductsOptionalParams): Promise<Models.ProductSearchPage>;
    searchProducts(baseSiteId: string, callback: msRest.ServiceCallback<Models.ProductSearchPage>): void;
    searchProducts(baseSiteId: string, options: Models.CommerceWebservicesV2SearchProductsOptionalParams, callback: msRest.ServiceCallback<Models.ProductSearchPage>): void;
    /**
     * @summary Get a header with total number of products
     *
     * In the response header, the "x-total-count" indicates the total number of products satisfying a
     * query.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2CountSearchProductsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    countSearchProducts(baseSiteId: string): Promise<void>;
    countSearchProducts(baseSiteId: string, options: Models.CommerceWebservicesV2CountSearchProductsOptionalParams): Promise<void>;
    countSearchProducts(baseSiteId: string, callback: msRest.ServiceCallback<void>): void;
    countSearchProducts(baseSiteId: string, options: Models.CommerceWebservicesV2CountSearchProductsOptionalParams, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get a list of available suggestions
     *
     * Returns a list of all available suggestions related to a given term and limits the results to a
     * specific value of the max parameter.
     *
     * @param {string} term Specified term
     *
     * @param {number} max Specifies the limit of results.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetSuggestionsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.SuggestionList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.SuggestionList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getSuggestions(term: string, max: number, baseSiteId: string): Promise<Models.SuggestionList>;
    getSuggestions(term: string, max: number, baseSiteId: string, options: Models.CommerceWebservicesV2GetSuggestionsOptionalParams): Promise<Models.SuggestionList>;
    getSuggestions(term: string, max: number, baseSiteId: string, callback: msRest.ServiceCallback<Models.SuggestionList>): void;
    getSuggestions(term: string, max: number, baseSiteId: string, options: Models.CommerceWebservicesV2GetSuggestionsOptionalParams, callback: msRest.ServiceCallback<Models.SuggestionList>): void;
    /**
     * @summary Get product details
     *
     * Returns details of a single product according to a product code.
     *
     * @param {string} productCode Product identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetProductByCodeOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.Product} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.Product} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getProductByCode(productCode: string, baseSiteId: string): Promise<Models.Product>;
    getProductByCode(productCode: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetProductByCodeOptionalParams): Promise<Models.Product>;
    getProductByCode(productCode: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.Product>): void;
    getProductByCode(productCode: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetProductByCodeOptionalParams, callback: msRest.ServiceCallback<Models.Product>): void;
    /**
     * @summary Get a product reference
     *
     * Returns references for a product with a given product code. Reference type specifies which
     * references to return.
     *
     * @param {string} productCode Product identifier
     *
     * @param {string} referenceType Reference type according to enum ProductReferenceTypeEnum
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2ExportProductReferencesOptionalParams} [options] Optional
     * Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.ProductReferenceList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.ProductReferenceList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    exportProductReferences(productCode: string, referenceType: string, baseSiteId: string): Promise<Models.ProductReferenceList>;
    exportProductReferences(productCode: string, referenceType: string, baseSiteId: string, options: Models.CommerceWebservicesV2ExportProductReferencesOptionalParams): Promise<Models.ProductReferenceList>;
    exportProductReferences(productCode: string, referenceType: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.ProductReferenceList>): void;
    exportProductReferences(productCode: string, referenceType: string, baseSiteId: string, options: Models.CommerceWebservicesV2ExportProductReferencesOptionalParams, callback: msRest.ServiceCallback<Models.ProductReferenceList>): void;
    /**
     * @summary Get reviews for a product
     *
     * Returns the reviews for a product with a given product code.
     *
     * @param {string} productCode Product identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetProductReviewsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.ReviewList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.ReviewList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getProductReviews(productCode: string, baseSiteId: string): Promise<Models.ReviewList>;
    getProductReviews(productCode: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetProductReviewsOptionalParams): Promise<Models.ReviewList>;
    getProductReviews(productCode: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.ReviewList>): void;
    getProductReviews(productCode: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetProductReviewsOptionalParams, callback: msRest.ServiceCallback<Models.ReviewList>): void;
    /**
     * @summary Creates a new customer review as an anonymous user
     *
     * Creates a new customer review as an anonymous user.
     *
     * @param {string} productCode Product identifier
     *
     * @param {Review} review Object contains review details like : rating, alias, headline, comment
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2CreateReviewPrimOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.Review} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.Review} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    createReviewPrim(productCode: string, review: Models.Review, baseSiteId: string): Promise<Models.Review>;
    createReviewPrim(productCode: string, review: Models.Review, baseSiteId: string, options: Models.CommerceWebservicesV2CreateReviewPrimOptionalParams): Promise<Models.Review>;
    createReviewPrim(productCode: string, review: Models.Review, baseSiteId: string, callback: msRest.ServiceCallback<Models.Review>): void;
    createReviewPrim(productCode: string, review: Models.Review, baseSiteId: string, options: Models.CommerceWebservicesV2CreateReviewPrimOptionalParams, callback: msRest.ServiceCallback<Models.Review>): void;
    /**
     * @summary Get a product's stock level
     *
     * Returns a product's stock levels sorted by distance from the specified location, which is
     * provided using the free-text "location" parameter, or by using the longitude and latitude
     * parameters. The following two sets of parameters are available: location (required), currentPage
     * (optional), pageSize (optional); or longitude (required), latitude (required), currentPage
     * (optional), pageSize(optional).
     *
     * @param {string} productCode Product identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2SearchProductStockByLocationOptionalParams} [options] Optional
     * Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.StoreFinderStockSearchPage} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.StoreFinderStockSearchPage} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    searchProductStockByLocation(productCode: string, baseSiteId: string): Promise<Models.StoreFinderStockSearchPage>;
    searchProductStockByLocation(productCode: string, baseSiteId: string, options: Models.CommerceWebservicesV2SearchProductStockByLocationOptionalParams): Promise<Models.StoreFinderStockSearchPage>;
    searchProductStockByLocation(productCode: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.StoreFinderStockSearchPage>): void;
    searchProductStockByLocation(productCode: string, baseSiteId: string, options: Models.CommerceWebservicesV2SearchProductStockByLocationOptionalParams, callback: msRest.ServiceCallback<Models.StoreFinderStockSearchPage>): void;
    /**
     * @summary Get header with a total number of product's stock levels
     *
     * In the response header, the "x-total-count" indicates the total number of a product's stock
     * levels. The following two sets of parameters are available: location (required); or longitude
     * (required), and latitude (required).
     *
     * @param {string} productCode Product identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2CountSearchProductStockByLocationOptionalParams} [options] Optional
     * Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    countSearchProductStockByLocation(productCode: string, baseSiteId: string): Promise<void>;
    countSearchProductStockByLocation(productCode: string, baseSiteId: string, options: Models.CommerceWebservicesV2CountSearchProductStockByLocationOptionalParams): Promise<void>;
    countSearchProductStockByLocation(productCode: string, baseSiteId: string, callback: msRest.ServiceCallback<void>): void;
    countSearchProductStockByLocation(productCode: string, baseSiteId: string, options: Models.CommerceWebservicesV2CountSearchProductStockByLocationOptionalParams, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get a product's stock level for a store
     *
     * Returns a product's stock level for a particular store (in other words, for a particular point
     * of sale).
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} productCode Product identifier
     *
     * @param {string} storeName Store identifier
     *
     * @param {CommerceWebservicesV2GetStockDataOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.Stock} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.Stock} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getStockData(baseSiteId: string, productCode: string, storeName: string): Promise<Models.Stock>;
    getStockData(baseSiteId: string, productCode: string, storeName: string, options: Models.CommerceWebservicesV2GetStockDataOptionalParams): Promise<Models.Stock>;
    getStockData(baseSiteId: string, productCode: string, storeName: string, callback: msRest.ServiceCallback<Models.Stock>): void;
    getStockData(baseSiteId: string, productCode: string, storeName: string, options: Models.CommerceWebservicesV2GetStockDataOptionalParams, callback: msRest.ServiceCallback<Models.Stock>): void;
    /**
     * @summary Get a list of promotions
     *
     * Returns promotions defined for a current base site. Requests pertaining to promotions have been
     * developed for the previous version of promotions and vouchers and therefore some of them are
     * currently not compatible with the new promotion engine.
     *
     * @param {Type} type Defines what type of promotions should be returned. Values supported for that
     * parameter are: <ul><li>all: All available promotions are returned</li><li>product: Only product
     * promotions are returned</li><li>order: Only order promotions are returned</li></ul>. Possible
     * values include: 'all', 'product', 'order'
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetPromotionsPrimOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PromotionList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.PromotionList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPromotionsPrim(type: Models.Type, baseSiteId: string): Promise<Models.PromotionList>;
    getPromotionsPrim(type: Models.Type, baseSiteId: string, options: Models.CommerceWebservicesV2GetPromotionsPrimOptionalParams): Promise<Models.PromotionList>;
    getPromotionsPrim(type: Models.Type, baseSiteId: string, callback: msRest.ServiceCallback<Models.PromotionList>): void;
    getPromotionsPrim(type: Models.Type, baseSiteId: string, options: Models.CommerceWebservicesV2GetPromotionsPrimOptionalParams, callback: msRest.ServiceCallback<Models.PromotionList>): void;
    /**
     * @summary Get a promotion based on code
     *
     * Returns details of a single promotion specified by a promotion code. Requests pertaining to
     * promotions have been developed for the previous version of promotions and vouchers and therefore
     * some of them are currently not compatible with the new promotion engine.
     *
     * @param {string} code Promotion identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetPromotionByCodeOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.Promotion} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.Promotion} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPromotionByCode(code: string, baseSiteId: string): Promise<Models.Promotion>;
    getPromotionByCode(code: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetPromotionByCodeOptionalParams): Promise<Models.Promotion>;
    getPromotionByCode(code: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.Promotion>): void;
    getPromotionByCode(code: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetPromotionByCodeOptionalParams, callback: msRest.ServiceCallback<Models.Promotion>): void;
    /**
     * @summary Get a list of store locations
     *
     * Lists all store locations that are near the location specified in a query or based on latitude
     * and longitude.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2LocationSearchOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.StoreFinderSearchPage} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.StoreFinderSearchPage} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    locationSearch(baseSiteId: string): Promise<Models.StoreFinderSearchPage>;
    locationSearch(baseSiteId: string, options: Models.CommerceWebservicesV2LocationSearchOptionalParams): Promise<Models.StoreFinderSearchPage>;
    locationSearch(baseSiteId: string, callback: msRest.ServiceCallback<Models.StoreFinderSearchPage>): void;
    locationSearch(baseSiteId: string, options: Models.CommerceWebservicesV2LocationSearchOptionalParams, callback: msRest.ServiceCallback<Models.StoreFinderSearchPage>): void;
    /**
     * @summary Get a header with the number of store locations
     *
     * In the response header, the "x-total-count" indicates the number of all store locations that are
     * near the location specified in a query, or based on latitude and longitude.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2CountLocationSearchOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    countLocationSearch(baseSiteId: string): Promise<void>;
    countLocationSearch(baseSiteId: string, options: Models.CommerceWebservicesV2CountLocationSearchOptionalParams): Promise<void>;
    countLocationSearch(baseSiteId: string, callback: msRest.ServiceCallback<void>): void;
    countLocationSearch(baseSiteId: string, options: Models.CommerceWebservicesV2CountLocationSearchOptionalParams, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get a store location
     *
     * Returns store location based on its unique name.
     *
     * @param {string} storeId Store identifier (currently store name)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2LocationDetailsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PointOfService} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.PointOfService} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    locationDetails(storeId: string, baseSiteId: string): Promise<Models.PointOfService>;
    locationDetails(storeId: string, baseSiteId: string, options: Models.CommerceWebservicesV2LocationDetailsOptionalParams): Promise<Models.PointOfService>;
    locationDetails(storeId: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.PointOfService>): void;
    locationDetails(storeId: string, baseSiteId: string, options: Models.CommerceWebservicesV2LocationDetailsOptionalParams, callback: msRest.ServiceCallback<Models.PointOfService>): void;
    /**
     * @summary Get a list of all localized titles.
     *
     * Lists all localized titles.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetTitlesOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.TitleList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.TitleList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getTitles(baseSiteId: string): Promise<Models.TitleList>;
    getTitles(baseSiteId: string, options: Models.CommerceWebservicesV2GetTitlesOptionalParams): Promise<Models.TitleList>;
    getTitles(baseSiteId: string, callback: msRest.ServiceCallback<Models.TitleList>): void;
    getTitles(baseSiteId: string, options: Models.CommerceWebservicesV2GetTitlesOptionalParams, callback: msRest.ServiceCallback<Models.TitleList>): void;
    /**
     * @summary  Registers a customer
     *
     * Registers a customer. There are two options for registering a customer. The first option
     * requires the following parameters: login, password, firstName, lastName, titleCode. The second
     * option converts a guest to a customer. In this case, the required parameters are: guid,
     * password.
     *
     * @param {UserSignUp} user User's object.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2RegisterUserPrimOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.User} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.User} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    registerUserPrim(user: Models.UserSignUp, baseSiteId: string): Promise<Models.User>;
    registerUserPrim(user: Models.UserSignUp, baseSiteId: string, options: Models.CommerceWebservicesV2RegisterUserPrimOptionalParams): Promise<Models.User>;
    registerUserPrim(user: Models.UserSignUp, baseSiteId: string, callback: msRest.ServiceCallback<Models.User>): void;
    registerUserPrim(user: Models.UserSignUp, baseSiteId: string, options: Models.CommerceWebservicesV2RegisterUserPrimOptionalParams, callback: msRest.ServiceCallback<Models.User>): void;
    /**
     * @summary Get customer profile
     *
     * Returns customer profile.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetUserOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.User} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.User} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getUser(baseSiteId: string, userId: string): Promise<Models.User>;
    getUser(baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetUserOptionalParams): Promise<Models.User>;
    getUser(baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.User>): void;
    getUser(baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetUserOptionalParams, callback: msRest.ServiceCallback<Models.User>): void;
    /**
     * @summary Updates customer profile
     *
     * Updates customer profile. Attributes not provided in the request body will be defined again (set
     * to null or default).
     *
     * @param {User} user User's object
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    putUserPrim(user: Models.User, baseSiteId: string, userId: string): Promise<void>;
    putUserPrim(user: Models.User, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase): Promise<void>;
    putUserPrim(user: Models.User, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<void>): void;
    putUserPrim(user: Models.User, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Delete customer profile
     *
     * Removes customer profile.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    deactivateUser(baseSiteId: string, userId: string): Promise<void>;
    deactivateUser(baseSiteId: string, userId: string, options: msRest.RequestOptionsBase): Promise<void>;
    deactivateUser(baseSiteId: string, userId: string, callback: msRest.ServiceCallback<void>): void;
    deactivateUser(baseSiteId: string, userId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Updates customer profile
     *
     * Updates customer profile. Only attributes provided in the request body will be changed.
     *
     * @param {User} user User's object.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    updateUserPrim(user: Models.User, baseSiteId: string, userId: string): Promise<void>;
    updateUserPrim(user: Models.User, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase): Promise<void>;
    updateUserPrim(user: Models.User, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<void>): void;
    updateUserPrim(user: Models.User, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get customer's addresses
     *
     * Returns customer's addresses.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetAddressesOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.AddressList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.AddressList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getAddresses(baseSiteId: string, userId: string): Promise<Models.AddressList>;
    getAddresses(baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetAddressesOptionalParams): Promise<Models.AddressList>;
    getAddresses(baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.AddressList>): void;
    getAddresses(baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetAddressesOptionalParams, callback: msRest.ServiceCallback<Models.AddressList>): void;
    /**
     * @summary Creates a new address.
     *
     * Creates a new address.
     *
     * @param {Address} address Address object.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2CreateAddressPrimOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.Address} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.Address} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    createAddressPrim(address: Models.Address, baseSiteId: string, userId: string): Promise<Models.Address>;
    createAddressPrim(address: Models.Address, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2CreateAddressPrimOptionalParams): Promise<Models.Address>;
    createAddressPrim(address: Models.Address, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.Address>): void;
    createAddressPrim(address: Models.Address, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2CreateAddressPrimOptionalParams, callback: msRest.ServiceCallback<Models.Address>): void;
    /**
     * @summary Verifies address
     *
     * Verifies address.
     *
     * @param {Address} address Address object.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2VerifyAddressPrimOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.AddressValidation} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.AddressValidation} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    verifyAddressPrim(address: Models.Address, baseSiteId: string, userId: string): Promise<Models.AddressValidation>;
    verifyAddressPrim(address: Models.Address, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2VerifyAddressPrimOptionalParams): Promise<Models.AddressValidation>;
    verifyAddressPrim(address: Models.Address, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.AddressValidation>): void;
    verifyAddressPrim(address: Models.Address, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2VerifyAddressPrimOptionalParams, callback: msRest.ServiceCallback<Models.AddressValidation>): void;
    /**
     * @summary Get info about address
     *
     * Returns detailed information about address with a given id.
     *
     * @param {string} addressId Address identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetAddressOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.Address} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.Address} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getAddress(addressId: string, baseSiteId: string, userId: string): Promise<Models.Address>;
    getAddress(addressId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetAddressOptionalParams): Promise<Models.Address>;
    getAddress(addressId: string, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.Address>): void;
    getAddress(addressId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetAddressOptionalParams, callback: msRest.ServiceCallback<Models.Address>): void;
    /**
     * @summary Updates the address
     *
     * Updates the address. Attributes not provided in the request will be defined again (set to null
     * or default).
     *
     * @param {string} addressId Address identifier.
     *
     * @param {Address} address Address object.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    putAddressPrim(addressId: string, address: Models.Address, baseSiteId: string, userId: string): Promise<void>;
    putAddressPrim(addressId: string, address: Models.Address, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase): Promise<void>;
    putAddressPrim(addressId: string, address: Models.Address, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<void>): void;
    putAddressPrim(addressId: string, address: Models.Address, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Delete customer's address
     *
     * Removes customer's address.
     *
     * @param {string} addressId Address identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    deleteAddress(addressId: string, baseSiteId: string, userId: string): Promise<void>;
    deleteAddress(addressId: string, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase): Promise<void>;
    deleteAddress(addressId: string, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<void>): void;
    deleteAddress(addressId: string, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Updates the address
     *
     * Updates the address. Only attributes provided in the request body will be changed.
     *
     * @param {string} addressId Address identifier.
     *
     * @param {Address} address Address object
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    patchAddressPrim(addressId: string, address: Models.Address, baseSiteId: string, userId: string): Promise<void>;
    patchAddressPrim(addressId: string, address: Models.Address, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase): Promise<void>;
    patchAddressPrim(addressId: string, address: Models.Address, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<void>): void;
    patchAddressPrim(addressId: string, address: Models.Address, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get all customer carts.
     *
     * Lists all customer carts.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetCartsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.CartList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.CartList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCarts(baseSiteId: string, userId: string): Promise<Models.CartList>;
    getCarts(baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetCartsOptionalParams): Promise<Models.CartList>;
    getCarts(baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.CartList>): void;
    getCarts(baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetCartsOptionalParams, callback: msRest.ServiceCallback<Models.CartList>): void;
    /**
     * @summary Creates or restore a cart for a user.
     *
     * Creates a new cart or restores an anonymous cart as a user's cart (if an old Cart Id is given in
     * the request).
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2CreateCartOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.Cart} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.Cart} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    createCart(baseSiteId: string, userId: string): Promise<Models.Cart>;
    createCart(baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2CreateCartOptionalParams): Promise<Models.Cart>;
    createCart(baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.Cart>): void;
    createCart(baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2CreateCartOptionalParams, callback: msRest.ServiceCallback<Models.Cart>): void;
    /**
     * @summary Get a cart with a given identifier.
     *
     * Returns the cart with a given identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetCartOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.Cart} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.Cart} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCart(baseSiteId: string, userId: string, cartId: string): Promise<Models.Cart>;
    getCart(baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetCartOptionalParams): Promise<Models.Cart>;
    getCart(baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<Models.Cart>): void;
    getCart(baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetCartOptionalParams, callback: msRest.ServiceCallback<Models.Cart>): void;
    /**
     * @summary Deletes a cart with a given cart id.
     *
     * Deletes a cart with a given cart id.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    deleteCart(baseSiteId: string, userId: string, cartId: string): Promise<void>;
    deleteCart(baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase): Promise<void>;
    deleteCart(baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<void>): void;
    deleteCart(baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Creates a delivery address for the cart.
     *
     * Creates an address and assigns it to the cart as the delivery address.
     *
     * @param {Address} address Request body parameter that contains details such as the customer's
     * first name (firstName), the customer's last name (lastName), the customer's title (titleCode),
     * the country (country.isocode), the first part of the address (line1), the second part of the
     * address (line2), the town (town), the postal code (postalCode), and the region (region.isocode).
     *
     * The DTO is in XML or .json format.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2CreateAndSetAddressPrimOptionalParams} [options] Optional
     * Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.Address} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.Address} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    createAndSetAddressPrim(address: Models.Address, baseSiteId: string, userId: string, cartId: string): Promise<Models.Address>;
    createAndSetAddressPrim(address: Models.Address, baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2CreateAndSetAddressPrimOptionalParams): Promise<Models.Address>;
    createAndSetAddressPrim(address: Models.Address, baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<Models.Address>): void;
    createAndSetAddressPrim(address: Models.Address, baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2CreateAndSetAddressPrimOptionalParams, callback: msRest.ServiceCallback<Models.Address>): void;
    /**
     * @summary Sets a delivery address for the cart.
     *
     * Sets a delivery address for the cart. The address country must be placed among the delivery
     * countries of the current base store.
     *
     * @param {string} addressId Address identifier
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    setCartDeliveryAddress(addressId: string, baseSiteId: string, userId: string, cartId: string): Promise<void>;
    setCartDeliveryAddress(addressId: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase): Promise<void>;
    setCartDeliveryAddress(addressId: string, baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<void>): void;
    setCartDeliveryAddress(addressId: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Delete the delivery address from the cart.
     *
     * Removes the delivery address from the cart.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    removeCartDeliveryAddress(baseSiteId: string, userId: string, cartId: string): Promise<void>;
    removeCartDeliveryAddress(baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase): Promise<void>;
    removeCartDeliveryAddress(baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<void>): void;
    removeCartDeliveryAddress(baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Explicitly clones a cart.
     *
     * Explicitly clones a cart.
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2CloneSaveCartOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.SaveCartResult} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.SaveCartResult} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    cloneSaveCart(cartId: string, baseSiteId: string, userId: string): Promise<Models.SaveCartResult>;
    cloneSaveCart(cartId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2CloneSaveCartOptionalParams): Promise<Models.SaveCartResult>;
    cloneSaveCart(cartId: string, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.SaveCartResult>): void;
    cloneSaveCart(cartId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2CloneSaveCartOptionalParams, callback: msRest.ServiceCallback<Models.SaveCartResult>): void;
    /**
     * @summary Get the delivery mode selected for the cart.
     *
     * Returns the delivery mode selected for the cart.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetCartDeliveryModeOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.DeliveryMode} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.DeliveryMode} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCartDeliveryMode(baseSiteId: string, userId: string, cartId: string): Promise<Models.DeliveryMode>;
    getCartDeliveryMode(baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetCartDeliveryModeOptionalParams): Promise<Models.DeliveryMode>;
    getCartDeliveryMode(baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<Models.DeliveryMode>): void;
    getCartDeliveryMode(baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetCartDeliveryModeOptionalParams, callback: msRest.ServiceCallback<Models.DeliveryMode>): void;
    /**
     * @summary Sets the delivery mode for a cart.
     *
     * Sets the delivery mode with a given identifier for the cart.
     *
     * @param {string} deliveryModeId Delivery mode identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    setCartDeliveryMode(deliveryModeId: string, baseSiteId: string, userId: string, cartId: string): Promise<void>;
    setCartDeliveryMode(deliveryModeId: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase): Promise<void>;
    setCartDeliveryMode(deliveryModeId: string, baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<void>): void;
    setCartDeliveryMode(deliveryModeId: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Delete the delivery mode from the cart.
     *
     * Removes the delivery mode from the cart.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    removeDeliveryMode(baseSiteId: string, userId: string, cartId: string): Promise<void>;
    removeDeliveryMode(baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase): Promise<void>;
    removeDeliveryMode(baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<void>): void;
    removeDeliveryMode(baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get all delivery modes for the current store and delivery address.
     *
     * Returns all delivery modes supported for the current base store and cart delivery address. A
     * delivery address must be set for the cart, otherwise an empty list will be returned.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetSupportedDeliveryModesOptionalParams} [options] Optional
     * Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.DeliveryModeList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.DeliveryModeList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getSupportedDeliveryModes(baseSiteId: string, userId: string, cartId: string): Promise<Models.DeliveryModeList>;
    getSupportedDeliveryModes(baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetSupportedDeliveryModesOptionalParams): Promise<Models.DeliveryModeList>;
    getSupportedDeliveryModes(baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<Models.DeliveryModeList>): void;
    getSupportedDeliveryModes(baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetSupportedDeliveryModesOptionalParams, callback: msRest.ServiceCallback<Models.DeliveryModeList>): void;
    /**
     * @summary Assigns an email to the cart.
     *
     * Assigns an email to the cart. This step is required to make a guest checkout.
     *
     * @param {string} email Email of the guest user. It will be used during the checkout process.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    guestLogin(email: string, baseSiteId: string, userId: string, cartId: string): Promise<void>;
    guestLogin(email: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase): Promise<void>;
    guestLogin(email: string, baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<void>): void;
    guestLogin(email: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get cart entries.
     *
     * Returns cart entries.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetCartEntriesOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.OrderEntryList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.OrderEntryList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCartEntries(baseSiteId: string, userId: string, cartId: string): Promise<Models.OrderEntryList>;
    getCartEntries(baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetCartEntriesOptionalParams): Promise<Models.OrderEntryList>;
    getCartEntries(baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<Models.OrderEntryList>): void;
    getCartEntries(baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetCartEntriesOptionalParams, callback: msRest.ServiceCallback<Models.OrderEntryList>): void;
    /**
     * @summary Adds a product to the cart.
     *
     * Adds a product to the cart.
     *
     * @param {OrderEntry} entry Request body parameter that contains details such as the product code
     * (product.code), the quantity of product (quantity), and the pickup store name
     * (deliveryPointOfService.name).
     *
     * The DTO is in XML or .json format.
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2AddCartEntryPrimOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.CartModification} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.CartModification} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    addCartEntryPrim(entry: Models.OrderEntry, userId: string, cartId: string, baseSiteId: string): Promise<Models.CartModification>;
    addCartEntryPrim(entry: Models.OrderEntry, userId: string, cartId: string, baseSiteId: string, options: Models.CommerceWebservicesV2AddCartEntryPrimOptionalParams): Promise<Models.CartModification>;
    addCartEntryPrim(entry: Models.OrderEntry, userId: string, cartId: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.CartModification>): void;
    addCartEntryPrim(entry: Models.OrderEntry, userId: string, cartId: string, baseSiteId: string, options: Models.CommerceWebservicesV2AddCartEntryPrimOptionalParams, callback: msRest.ServiceCallback<Models.CartModification>): void;
    /**
     * @summary Get the details of the cart entries.
     *
     * Returns the details of the cart entries.
     *
     * @param {number} entryNumber The entry number. Each entry in a cart has an entry number. Cart
     * entries are numbered in ascending order, starting with zero (0).
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetCartEntryOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.OrderEntry} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.OrderEntry} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCartEntry(entryNumber: number, baseSiteId: string, userId: string, cartId: string): Promise<Models.OrderEntry>;
    getCartEntry(entryNumber: number, baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetCartEntryOptionalParams): Promise<Models.OrderEntry>;
    getCartEntry(entryNumber: number, baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<Models.OrderEntry>): void;
    getCartEntry(entryNumber: number, baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetCartEntryOptionalParams, callback: msRest.ServiceCallback<Models.OrderEntry>): void;
    /**
     * @summary Set quantity and store details of a cart entry.
     *
     * Updates the quantity of a single cart entry and the details of the store where the cart entry
     * will be picked up. Attributes not provided in request will be defined again (set to null or
     * default)
     *
     * @param {number} entryNumber The entry number. Each entry in a cart has an entry number. Cart
     * entries are numbered in ascending order, starting with zero (0).
     *
     * @param {OrderEntry} entry Request body parameter that contains details such as the quantity of
     * product (quantity), and the pickup store name (deliveryPointOfService.name)
     *
     * The DTO is in XML or .json format.
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2SetCartEntryPrimOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.CartModification} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.CartModification} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    setCartEntryPrim(entryNumber: number, entry: Models.OrderEntry, userId: string, cartId: string, baseSiteId: string): Promise<Models.CartModification>;
    setCartEntryPrim(entryNumber: number, entry: Models.OrderEntry, userId: string, cartId: string, baseSiteId: string, options: Models.CommerceWebservicesV2SetCartEntryPrimOptionalParams): Promise<Models.CartModification>;
    setCartEntryPrim(entryNumber: number, entry: Models.OrderEntry, userId: string, cartId: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.CartModification>): void;
    setCartEntryPrim(entryNumber: number, entry: Models.OrderEntry, userId: string, cartId: string, baseSiteId: string, options: Models.CommerceWebservicesV2SetCartEntryPrimOptionalParams, callback: msRest.ServiceCallback<Models.CartModification>): void;
    /**
     * @summary Deletes cart entry.
     *
     * Deletes cart entry.
     *
     * @param {number} entryNumber The entry number. Each entry in a cart has an entry number. Cart
     * entries are numbered in ascending order, starting with zero (0).
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    removeCartEntry(entryNumber: number, baseSiteId: string, userId: string, cartId: string): Promise<void>;
    removeCartEntry(entryNumber: number, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase): Promise<void>;
    removeCartEntry(entryNumber: number, baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<void>): void;
    removeCartEntry(entryNumber: number, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Update quantity and store details of a cart entry.
     *
     * Updates the quantity of a single cart entry and the details of the store where the cart entry
     * will be picked up.
     *
     * @param {number} entryNumber The entry number. Each entry in a cart has an entry number. Cart
     * entries are numbered in ascending order, starting with zero (0).
     *
     * @param {OrderEntry} entry Request body parameter that contains details such as the quantity of
     * product (quantity), and the pickup store name (deliveryPointOfService.name)
     *
     * The DTO is in XML or .json format.
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2UpdateCartEntryPrimOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.CartModification} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.CartModification} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    updateCartEntryPrim(entryNumber: number, entry: Models.OrderEntry, userId: string, cartId: string, baseSiteId: string): Promise<Models.CartModification>;
    updateCartEntryPrim(entryNumber: number, entry: Models.OrderEntry, userId: string, cartId: string, baseSiteId: string, options: Models.CommerceWebservicesV2UpdateCartEntryPrimOptionalParams): Promise<Models.CartModification>;
    updateCartEntryPrim(entryNumber: number, entry: Models.OrderEntry, userId: string, cartId: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.CartModification>): void;
    updateCartEntryPrim(entryNumber: number, entry: Models.OrderEntry, userId: string, cartId: string, baseSiteId: string, options: Models.CommerceWebservicesV2UpdateCartEntryPrimOptionalParams, callback: msRest.ServiceCallback<Models.CartModification>): void;
    /**
     * @summary Flag a cart for deletion.
     *
     * Flags a cart for deletion (the cart doesn't have corresponding save cart attributes anymore).
     * The cart is not actually deleted from the database. But with the removal of the saved cart
     * attributes, this cart will be taken care of by the cart removal job just like any other cart.
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2FlagForDeletionOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.SaveCartResult} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.SaveCartResult} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    flagForDeletion(cartId: string, baseSiteId: string, userId: string): Promise<Models.SaveCartResult>;
    flagForDeletion(cartId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2FlagForDeletionOptionalParams): Promise<Models.SaveCartResult>;
    flagForDeletion(cartId: string, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.SaveCartResult>): void;
    flagForDeletion(cartId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2FlagForDeletionOptionalParams, callback: msRest.ServiceCallback<Models.SaveCartResult>): void;
    /**
     * @summary Defines and assigns details of a new credit card payment to the cart.
     *
     * Defines the details of a new credit card, and assigns this payment option to the cart.
     *
     * @param {PaymentDetails} paymentDetails Request body parameter that contains details such as the
     * name on the card (accountHolderName), the card number (cardNumber), the card type
     * (cardType.code), the month of the expiry date (expiryMonth), the year of the expiry date
     * (expiryYear), whether the payment details should be saved (saved), whether the payment details
     * should be set as default (defaultPaymentInfo), and the billing address
     * (billingAddress.firstName, billingAddress.lastName, billingAddress.titleCode,
     * billingAddress.country.isocode, billingAddress.line1, billingAddress.line2, billingAddress.town,
     * billingAddress.postalCode, billingAddress.region.isocode)
     *
     * The DTO is in XML or .json format.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2AddPaymentDetailsPrimOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PaymentDetails} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.PaymentDetails} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    addPaymentDetailsPrim(paymentDetails: Models.PaymentDetails, baseSiteId: string, userId: string, cartId: string): Promise<Models.PaymentDetails>;
    addPaymentDetailsPrim(paymentDetails: Models.PaymentDetails, baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2AddPaymentDetailsPrimOptionalParams): Promise<Models.PaymentDetails>;
    addPaymentDetailsPrim(paymentDetails: Models.PaymentDetails, baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<Models.PaymentDetails>): void;
    addPaymentDetailsPrim(paymentDetails: Models.PaymentDetails, baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2AddPaymentDetailsPrimOptionalParams, callback: msRest.ServiceCallback<Models.PaymentDetails>): void;
    /**
     * @summary Sets credit card payment details for the cart.
     *
     * Sets credit card payment details for the cart.
     *
     * @param {string} paymentDetailsId Payment details identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    setPaymentDetails(paymentDetailsId: string, baseSiteId: string, userId: string, cartId: string): Promise<void>;
    setPaymentDetails(paymentDetailsId: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase): Promise<void>;
    setPaymentDetails(paymentDetailsId: string, baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<void>): void;
    setPaymentDetails(paymentDetailsId: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get information about promotions applied on cart.
     *
     * Returns information about the promotions applied on the cart. Requests pertaining to promotions
     * have been developed for the previous version of promotions and vouchers, and as a result, some
     * of them are currently not compatible with the new promotions engine.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetPromotionsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PromotionResultList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.PromotionResultList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPromotions(baseSiteId: string, userId: string, cartId: string): Promise<Models.PromotionResultList>;
    getPromotions(baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetPromotionsOptionalParams): Promise<Models.PromotionResultList>;
    getPromotions(baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<Models.PromotionResultList>): void;
    getPromotions(baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetPromotionsOptionalParams, callback: msRest.ServiceCallback<Models.PromotionResultList>): void;
    /**
     * @summary Enables promotions based on the promotionsId of the cart.
     *
     * Enables a promotion for the order based on the promotionId defined for the cart. Requests
     * pertaining to promotions have been developed for the previous version of promotions and
     * vouchers, and as a result, some of them are currently not compatible with the new promotions
     * engine.
     *
     * @param {string} promotionId Promotion identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    applyPromotion(promotionId: string, baseSiteId: string, userId: string, cartId: string): Promise<void>;
    applyPromotion(promotionId: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase): Promise<void>;
    applyPromotion(promotionId: string, baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<void>): void;
    applyPromotion(promotionId: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get information about promotions applied on cart.
     *
     * Returns information about a promotion (with a specific promotionId), that has been applied on
     * the cart. Requests pertaining to promotions have been developed for the previous version of
     * promotions and vouchers, and as a result, some of them are currently not compatible with the new
     * promotions engine.
     *
     * @param {string} promotionId Promotion identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetPromotionOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PromotionResultList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.PromotionResultList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPromotion(promotionId: string, baseSiteId: string, userId: string, cartId: string): Promise<Models.PromotionResultList>;
    getPromotion(promotionId: string, baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetPromotionOptionalParams): Promise<Models.PromotionResultList>;
    getPromotion(promotionId: string, baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<Models.PromotionResultList>): void;
    getPromotion(promotionId: string, baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetPromotionOptionalParams, callback: msRest.ServiceCallback<Models.PromotionResultList>): void;
    /**
     * @summary Disables the promotion based on the promotionsId of the cart.
     *
     * Disables the promotion for the order based on the promotionId defined for the cart. Requests
     * pertaining to promotions have been developed for the previous version of promotions and
     * vouchers, and as a result, some of them are currently not compatible with the new promotions
     * engine.
     *
     * @param {string} promotionId Promotion identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    removePromotion(promotionId: string, baseSiteId: string, userId: string, cartId: string): Promise<void>;
    removePromotion(promotionId: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase): Promise<void>;
    removePromotion(promotionId: string, baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<void>): void;
    removePromotion(promotionId: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Restore a saved cart.
     *
     * Restore a saved cart.
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2RestoreSavedCartOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.SaveCartResult} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.SaveCartResult} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    restoreSavedCart(cartId: string, baseSiteId: string, userId: string): Promise<Models.SaveCartResult>;
    restoreSavedCart(cartId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2RestoreSavedCartOptionalParams): Promise<Models.SaveCartResult>;
    restoreSavedCart(cartId: string, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.SaveCartResult>): void;
    restoreSavedCart(cartId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2RestoreSavedCartOptionalParams, callback: msRest.ServiceCallback<Models.SaveCartResult>): void;
    /**
     * @summary Explicitly saves a cart.
     *
     * Explicitly saves a cart.
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2SaveCartOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.SaveCartResult} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.SaveCartResult} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    saveCart(cartId: string, baseSiteId: string, userId: string): Promise<Models.SaveCartResult>;
    saveCart(cartId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2SaveCartOptionalParams): Promise<Models.SaveCartResult>;
    saveCart(cartId: string, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.SaveCartResult>): void;
    saveCart(cartId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2SaveCartOptionalParams, callback: msRest.ServiceCallback<Models.SaveCartResult>): void;
    /**
     * @summary Get a saved cart.
     *
     * Returns a saved cart for an authenticated user. The cart is identified using the "cartId"
     * parameter.
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetSavedCartOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.SaveCartResult} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.SaveCartResult} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getSavedCart(cartId: string, baseSiteId: string, userId: string): Promise<Models.SaveCartResult>;
    getSavedCart(cartId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetSavedCartOptionalParams): Promise<Models.SaveCartResult>;
    getSavedCart(cartId: string, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.SaveCartResult>): void;
    getSavedCart(cartId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetSavedCartOptionalParams, callback: msRest.ServiceCallback<Models.SaveCartResult>): void;
    /**
     * @summary Get a list of vouchers applied to the cart.
     *
     * Returns a list of vouchers applied to the cart.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {CommerceWebservicesV2GetVouchersOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.VoucherList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.VoucherList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getVouchers(baseSiteId: string, userId: string, cartId: string): Promise<Models.VoucherList>;
    getVouchers(baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetVouchersOptionalParams): Promise<Models.VoucherList>;
    getVouchers(baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<Models.VoucherList>): void;
    getVouchers(baseSiteId: string, userId: string, cartId: string, options: Models.CommerceWebservicesV2GetVouchersOptionalParams, callback: msRest.ServiceCallback<Models.VoucherList>): void;
    /**
     * @summary Applies a voucher based on the voucherId defined for the cart.
     *
     * Applies a voucher based on the voucherId defined for the cart.
     *
     * @param {string} voucherId Voucher identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    applyVoucherForCart(voucherId: string, baseSiteId: string, userId: string, cartId: string): Promise<void>;
    applyVoucherForCart(voucherId: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase): Promise<void>;
    applyVoucherForCart(voucherId: string, baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<void>): void;
    applyVoucherForCart(voucherId: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Delete a voucher defined for the current cart.
     *
     * Removes a voucher based on the voucherId defined for the current cart.
     *
     * @param {string} voucherId Voucher identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {string} cartId Cart identifier: cart code for logged in user, cart guid for anonymous
     * user, 'current' for the last modified cart
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    releaseVoucherFromCart(voucherId: string, baseSiteId: string, userId: string, cartId: string): Promise<void>;
    releaseVoucherFromCart(voucherId: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase): Promise<void>;
    releaseVoucherFromCart(voucherId: string, baseSiteId: string, userId: string, cartId: string, callback: msRest.ServiceCallback<void>): void;
    releaseVoucherFromCart(voucherId: string, baseSiteId: string, userId: string, cartId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get all customer groups of a customer.
     *
     * Returns all customer groups of a customer.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetAllCustomerGroupsForCustomerOptionalParams} [options] Optional
     * Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.UserGroupList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.UserGroupList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getAllCustomerGroupsForCustomer(baseSiteId: string, userId: string): Promise<Models.UserGroupList>;
    getAllCustomerGroupsForCustomer(baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetAllCustomerGroupsForCustomerOptionalParams): Promise<Models.UserGroupList>;
    getAllCustomerGroupsForCustomer(baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.UserGroupList>): void;
    getAllCustomerGroupsForCustomer(baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetAllCustomerGroupsForCustomerOptionalParams, callback: msRest.ServiceCallback<Models.UserGroupList>): void;
    /**
     * @summary Changes customer's login name.
     *
     * Changes a customer's login name. Requires the customer's current password.
     *
     * @param {string} newLogin Customer's new login name. Customer login is case insensitive.
     *
     * @param {string} password Customer's current password.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    changeLogin(newLogin: string, password: string, baseSiteId: string, userId: string): Promise<void>;
    changeLogin(newLogin: string, password: string, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase): Promise<void>;
    changeLogin(newLogin: string, password: string, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<void>): void;
    changeLogin(newLogin: string, password: string, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get order history for user
     *
     * Returns order history data for all orders placed by a specified user for a specified base store.
     * The response can display the results across multiple pages, if required.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetOrdersForUserOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.OrderHistoryList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.OrderHistoryList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getOrdersForUser(baseSiteId: string, userId: string): Promise<Models.OrderHistoryList>;
    getOrdersForUser(baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetOrdersForUserOptionalParams): Promise<Models.OrderHistoryList>;
    getOrdersForUser(baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.OrderHistoryList>): void;
    getOrdersForUser(baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetOrdersForUserOptionalParams, callback: msRest.ServiceCallback<Models.OrderHistoryList>): void;
    /**
     * @summary Get total number of orders
     *
     * In the response header, the "x-total-count" indicates the total number of orders placed by a
     * specified user for a specified base store.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetCountOrdersForUserOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getCountOrdersForUser(baseSiteId: string, userId: string): Promise<void>;
    getCountOrdersForUser(baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetCountOrdersForUserOptionalParams): Promise<void>;
    getCountOrdersForUser(baseSiteId: string, userId: string, callback: msRest.ServiceCallback<void>): void;
    getCountOrdersForUser(baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetCountOrdersForUserOptionalParams, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Post a order
     *
     * Authorizes the cart and places the order. The response contains the new order data.
     *
     * @param {string} cartId Cart code for logged in user, cart GUID for guest checkout
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2PlaceOrderOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.Order} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.Order} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    placeOrder(cartId: string, baseSiteId: string, userId: string): Promise<Models.Order>;
    placeOrder(cartId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2PlaceOrderOptionalParams): Promise<Models.Order>;
    placeOrder(cartId: string, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.Order>): void;
    placeOrder(cartId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2PlaceOrderOptionalParams, callback: msRest.ServiceCallback<Models.Order>): void;
    /**
     * @summary Get a order
     *
     * Returns specific order details based on a specific order code. The response contains detailed
     * order information.
     *
     * @param {string} code Order GUID (Globally Unique Identifier) or order CODE
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetOrderForUserByCodeOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.Order} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.Order} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getOrderForUserByCode(code: string, baseSiteId: string, userId: string): Promise<Models.Order>;
    getOrderForUserByCode(code: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetOrderForUserByCodeOptionalParams): Promise<Models.Order>;
    getOrderForUserByCode(code: string, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.Order>): void;
    getOrderForUserByCode(code: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetOrderForUserByCodeOptionalParams, callback: msRest.ServiceCallback<Models.Order>): void;
    /**
     * @summary Changes customer's password
     *
     * Changes customer's password.
     *
     * @param {string} newParameter New password.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2ChangePasswordOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    changePassword(newParameter: string, baseSiteId: string, userId: string): Promise<void>;
    changePassword(newParameter: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2ChangePasswordOptionalParams): Promise<void>;
    changePassword(newParameter: string, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<void>): void;
    changePassword(newParameter: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2ChangePasswordOptionalParams, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get customer's credit card payment details list.
     *
     * Return customer's credit card payment details list.
     *
     * @param {boolean} saved Type of payment details.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetPaymentInfosOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PaymentDetailsList} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.PaymentDetailsList} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPaymentInfos(saved: boolean, baseSiteId: string, userId: string): Promise<Models.PaymentDetailsList>;
    getPaymentInfos(saved: boolean, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetPaymentInfosOptionalParams): Promise<Models.PaymentDetailsList>;
    getPaymentInfos(saved: boolean, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.PaymentDetailsList>): void;
    getPaymentInfos(saved: boolean, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetPaymentInfosOptionalParams, callback: msRest.ServiceCallback<Models.PaymentDetailsList>): void;
    /**
     * @summary Get customer's credit card payment details.
     *
     * Returns a customer's credit card payment details for the specified paymentDetailsId.
     *
     * @param {string} paymentDetailsId Payment details identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {CommerceWebservicesV2GetPaymentDetailsOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.PaymentDetails} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.PaymentDetails} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getPaymentDetails(paymentDetailsId: string, baseSiteId: string, userId: string): Promise<Models.PaymentDetails>;
    getPaymentDetails(paymentDetailsId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetPaymentDetailsOptionalParams): Promise<Models.PaymentDetails>;
    getPaymentDetails(paymentDetailsId: string, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<Models.PaymentDetails>): void;
    getPaymentDetails(paymentDetailsId: string, baseSiteId: string, userId: string, options: Models.CommerceWebservicesV2GetPaymentDetailsOptionalParams, callback: msRest.ServiceCallback<Models.PaymentDetails>): void;
    /**
     * @summary Updates existing customer's credit card payment info.
     *
     * Updates existing customer's credit card payment info based on the payment info ID. Attributes
     * not given in request will be defined again (set to null or default).
     *
     * @param {string} paymentDetailsId Payment details identifier.
     *
     * @param {PaymentDetails} paymentDetails Payment details object.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    putPaymentInfoPrim(paymentDetailsId: string, paymentDetails: Models.PaymentDetails, baseSiteId: string, userId: string): Promise<void>;
    putPaymentInfoPrim(paymentDetailsId: string, paymentDetails: Models.PaymentDetails, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase): Promise<void>;
    putPaymentInfoPrim(paymentDetailsId: string, paymentDetails: Models.PaymentDetails, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<void>): void;
    putPaymentInfoPrim(paymentDetailsId: string, paymentDetails: Models.PaymentDetails, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Delete customer's credit card payment details.
     *
     * Removes a customer's credit card payment details based on a specified paymentDetailsId.
     *
     * @param {string} paymentDetailsId Payment details identifier.
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    deletePaymentInfo(paymentDetailsId: string, baseSiteId: string, userId: string): Promise<void>;
    deletePaymentInfo(paymentDetailsId: string, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase): Promise<void>;
    deletePaymentInfo(paymentDetailsId: string, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<void>): void;
    deletePaymentInfo(paymentDetailsId: string, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Updates existing customer's credit card payment details.
     *
     * Updates an existing customer's credit card payment details based on the specified
     * paymentDetailsId. Only those attributes provided in the request will be updated.
     *
     * @param {string} paymentDetailsId Payment details identifier.
     *
     * @param {PaymentDetails} paymentDetails Payment details object
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {string} userId User identifier or one of the literals : 'current' for currently
     * authenticated user, 'anonymous' for anonymous user
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {void} [result]   - The deserialized result object if an error did not occur.
     *
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    updatePaymentInfoPrim(paymentDetailsId: string, paymentDetails: Models.PaymentDetails, baseSiteId: string, userId: string): Promise<void>;
    updatePaymentInfoPrim(paymentDetailsId: string, paymentDetails: Models.PaymentDetails, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase): Promise<void>;
    updatePaymentInfoPrim(paymentDetailsId: string, paymentDetails: Models.PaymentDetails, baseSiteId: string, userId: string, callback: msRest.ServiceCallback<void>): void;
    updatePaymentInfoPrim(paymentDetailsId: string, paymentDetails: Models.PaymentDetails, baseSiteId: string, userId: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * @summary Get a voucher based on code
     *
     * Returns details of a single voucher that is specified by its voucher identification code.
     *
     * @param {string} code Voucher identifier (code)
     *
     * @param {string} baseSiteId Base site identifier
     *
     * @param {CommerceWebservicesV2GetVoucherByCodeOptionalParams} [options] Optional Parameters.
     *
     * @param {ServiceCallback} callback The callback.
     *
     * @returns {ServiceCallback} callback(err, result, request, operationRes)
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *                      {Models.Voucher} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Models.Voucher} for more information.
     *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
     *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
     */
    getVoucherByCode(code: string, baseSiteId: string): Promise<Models.Voucher>;
    getVoucherByCode(code: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetVoucherByCodeOptionalParams): Promise<Models.Voucher>;
    getVoucherByCode(code: string, baseSiteId: string, callback: msRest.ServiceCallback<Models.Voucher>): void;
    getVoucherByCode(code: string, baseSiteId: string, options: Models.CommerceWebservicesV2GetVoucherByCodeOptionalParams, callback: msRest.ServiceCallback<Models.Voucher>): void;
}
export { CommerceWebservicesV2, Models as CommerceWebservicesV2Models, Mappers as CommerceWebservicesV2Mappers };
