import '@spartacus/storefront';
declare module '@spartacus/storefront' {
    const enum LAUNCH_CALLER {
        CONSIGNMENT_TRACKING = "CONSIGNMENT_TRACKING",
        REORDER = "REORDER",
        DOWNLOAD_ORDER_INVOICES = "DOWNLOAD_ORDER_INVOICES"
    }
}
