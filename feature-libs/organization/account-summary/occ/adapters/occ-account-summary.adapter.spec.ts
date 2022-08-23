import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BaseOccUrlProperties, ConverterService, DynamicAttributes, OccEndpointsService } from '@spartacus/core';
import { AccountSummaryList, DocumentQueryParams, DocumentStatus, FilterByOptions } from '@spartacus/organization/account-summary/root';
import { OccAccountSummaryAdapter } from './occ-account-summary.adapter';


class MockOccEndpointsService {
    buildUrl(
        endpoint: string,
        _attributes?: DynamicAttributes,
        _propertiesToOmit?: BaseOccUrlProperties
    ) {
        return this.getEndpoint(endpoint);
    }
    getEndpoint(url: string) {
        return url;
    }
}

describe('OccAccountSummaryAdapter', () => {

    let occAccountSummaryAdapter: OccAccountSummaryAdapter;
    let httpMock: HttpTestingController;
    let converterService: ConverterService;
    let occEndpointService: OccEndpointsService;
    const userId = '123';
    const orgUnitId = 'testUnitCode';


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                OccAccountSummaryAdapter,
                { provide: OccEndpointsService, useClass: MockOccEndpointsService },
            ],
        });


        occAccountSummaryAdapter = TestBed.inject(OccAccountSummaryAdapter);
        httpMock = TestBed.inject(HttpTestingController);
        converterService = TestBed.inject(ConverterService);
        occEndpointService = TestBed.inject(OccEndpointsService);


        spyOn(converterService, 'pipeable').and.callThrough();
        spyOn(occEndpointService, 'buildUrl').and.callThrough();


    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('it should load account summary header data', () => {
        let headerData: Object;
        beforeEach(() => {
            headerData = {
                accountManagerEmail: "",
                accountManagerName: "Brandon Leclair",
                amountBalanceData: {
                    currentBalance: "$102,145,214.00",
                    dueBalance: [
                        {
                            key: {
                                maxBoundery: 30,
                                minBoundery: 1
                            },
                            value: "$0.00"
                        }
                    ],
                    openBalance: "$135,737,232.00",
                    pastDueBalance: "$33,592,018.00",
                },
                billingAddress: {
                    country: {
                        isocode: "US",
                        name: "United States"
                    },
                    id: "8796098986007",
                    lastName: "Torres",
                },
                formattedCreditLimit: "$15,000.00",
                orgUnit: {
                    active: true,
                    uid: '123uid',
                    name: 'John Doe'
                },
            };
        });

        it('it should load account summary header data for a given userId and unitId', () => {
            let result;
            occAccountSummaryAdapter.getAccountSummary(userId, orgUnitId).subscribe((res) => {
                result = res;
            });

            const mockReq = httpMock.expectOne((req) => {
                return req.method === 'GET' && req.url === 'accountSummary';
            });

            expect(mockReq.cancelled).toBeFalsy();
            expect(mockReq.request.responseType).toEqual('json');
            expect(occEndpointService.buildUrl).toHaveBeenCalledWith('accountSummary', {
                urlParams: { userId, orgUnitId }
            });

            mockReq.flush(headerData);

            expect(result).toEqual(headerData);
        });
    });

    describe('it should load account summary document data', () => {

        let documentData: AccountSummaryList;

        beforeEach(() => {
            documentData = {
                orgDocumentTypes: [
                    { code: 'Purchase Order', displayInAllList: true, includeInOpenBalance: true, name: 'Purchase Order' },
                    { code: 'Invoice', displayInAllList: true, includeInOpenBalance: true, name: 'Invoice' },
                    { code: 'Credit Note', displayInAllList: true, includeInOpenBalance: true, name: 'Credit Note' },
                    { code: 'Debit Note', displayInAllList: true, includeInOpenBalance: true, name: 'Debit Note' },
                    { code: 'Statement', displayInAllList: false, includeInOpenBalance: false, name: 'Statement' }
                ],
                orgDocuments: [
                    {
                        amount: 7851558,
                        currency: { active: true, isocode: 'USD', name: 'US Dollar', symbol: '$' },
                        createdAtDate: new Date("2014-06-10"),
                        id: "POCR-0000001",
                        orgDocumentType: { code: 'Purchase Order', name: 'Purchase Order' },
                        openAmount: 7851558,
                        status: DocumentStatus.OPEN
                    }
                ],
                pagination: {
                    currentPage: 0,
                    pageSize: 10,
                    sort: "byDocumentDateAsc",
                    totalPages: 6,
                    totalResults: 55
                },
                sorts: [
                    { code: 'byDocumentDateAsc', selected: true, name: 'Document Date Ascending' },
                    { code: 'byDocumentDateDesc', selected: false, name: 'Document Date Descending' },
                    { code: 'byDueDateAsc', selected: false, name: 'Due Date Ascending' },
                    { code: 'byDueDateDesc', selected: false, name: 'Due Date Descending' },
                    { code: 'byOriginalAmountAsc', selected: false, name: 'Original Amount Ascending' },
                    { code: 'byOriginalAmountDesc', selected: false, name: 'Original Amount Descending' },
                    { code: 'byOpenAmountAsc', selected: false, name: 'Open Amount Ascending' },
                    { code: 'byOpenAmountDesc', selected: false, name: 'Open Amount Descending' },
                    { code: 'byDocumentTypeAsc', selected: false, name: 'Document Type Ascending' },
                    { code: 'byDocumentTypeDesc', selected: false, name: 'Document Type Descending' },
                    { code: 'byDocumentStatusAsc', selected: false, name: 'Document Status Ascending' },
                    { code: 'byDocumentStatusDesc', selected: false, name: 'Document Status Descending' },
                    { code: 'byDocumentNumberAsc', selected: false, name: 'Document Number Ascending' },
                    { code: 'byDocumentNumberDesc', selected: false, name: 'Document Number Descending' }
                ]
            };
        });

        it('should load account summary document data for given userId and unitId', () => {

            let result;
            let queryParams: DocumentQueryParams = {
                status: DocumentStatus.ALL,
                filterByKey: FilterByOptions.DOCUMENT_NUMBER,
                page: 0,
                pageSize: 10,
                sort: 'byDocumentDateAsc',
            };

            occAccountSummaryAdapter.getDocumentList(userId, orgUnitId, queryParams).subscribe((res) => {
                result = res;
            });

            const mockReq = httpMock.expectOne((req) => {
                return req.method === 'GET' && req.url === 'accountSummaryDocument';
            });

            expect(mockReq.cancelled).toBeFalsy();
            expect(mockReq.request.responseType).toEqual('json');
            expect(occEndpointService.buildUrl).toHaveBeenCalledWith('accountSummaryDocument', {
                urlParams: { userId, orgUnitId },
                queryParams
            });

            mockReq.flush(documentData);
            expect(result).toEqual(documentData);
        });
    });
});
