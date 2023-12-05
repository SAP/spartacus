interface Amount {
    currencyIso?: string;
    value?: number;
    formattedValue?: string;
}
export declare enum InvoicesFields {
    BASIC = "BASIC",
    DEFAULT = "DEFAULT",
    FULL = "FULL"
}
export interface OrderInvoice {
    invoiceId: string;
    externalSystemId?: string;
    createdAt: Date;
    netAmount: Amount;
    totalAmount: Amount;
}
export interface OrderInvoiceList {
    invoices?: OrderInvoice[];
    pagination?: Pagination;
    sorts?: Sort[];
}
export interface InvoiceQueryParams {
    currentPage?: number;
    pageSize?: number;
    sort?: string;
    fields?: InvoicesFields;
}
interface Sort {
    asc?: boolean;
    code?: string;
}
interface Pagination {
    count?: number;
    page?: number;
    totalCount?: number;
    totalPages?: number;
}
export {};
