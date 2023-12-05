export declare const order: {
    orderDetails: {
        orderId: string;
        orderNumber: string;
        replenishmentId: string;
        purchaseOrderId: string;
        purchaseOrderNumber: string;
        emptyPurchaseOrderId: string;
        none: string;
        placed: string;
        placedBy: string;
        unit: string;
        costCenter: string;
        costCenterAndUnit: string;
        costCenterAndUnitValue: string;
        methodOfPayment: string;
        payByAccount: string;
        paidByCreditCard: string;
        status: string;
        active: string;
        shippedOn: string;
        shippingMethod: string;
        placedOn: string;
        startOn: string;
        nextOrderDate: string;
        frequency: string;
        cancelled: string;
        deliveryStatus_IN_TRANSIT: string;
        deliveryStatus_READY_FOR_PICKUP: string;
        deliveryStatus_READY_FOR_SHIPPING: string;
        deliveryStatus_WAITING: string;
        deliveryStatus_DELIVERING: string;
        deliveryStatus_PICKPACK: string;
        deliveryStatus_PICKUP_COMPLETE: string;
        deliveryStatus_DELIVERY_COMPLETED: string;
        deliveryStatus_PAYMENT_NOT_CAPTURED: string;
        deliveryStatus_IN_PROCESS: string;
        deliveryStatus_READY: string;
        deliveryStatus_DELIVERY_REJECTED: string;
        deliveryStatus_SHIPPED: string;
        deliveryStatus_TAX_NOT_COMMITTED: string;
        deliveryStatus_CANCELLED: string;
        statusDisplay_cancelled: string;
        statusDisplay_cancelling: string;
        statusDisplay_completed: string;
        statusDisplay_created: string;
        statusDisplay_error: string;
        statusDisplay_Error: string;
        statusDisplay_processing: string;
        statusDisplay_open: string;
        statusDisplay_pending: {
            approval: string;
            merchant: {
                approval: string;
            };
        };
        statusDisplay_approved: string;
        statusDisplay_rejected: string;
        statusDisplay_merchant: {
            approved: string;
            rejected: string;
        };
        statusDisplay_assigned: {
            admin: string;
        };
        consignmentTracking: {
            action: string;
            dialog: {
                header: string;
                shipped: string;
                estimate: string;
                carrier: string;
                trackingId: string;
                noTracking: string;
                loadingHeader: string;
            };
        };
        cancellationAndReturn: {
            returnAction: string;
            cancelAction: string;
            item: string;
            itemPrice: string;
            quantity: string;
            returnQty: string;
            cancelQty: string;
            setAll: string;
            totalPrice: string;
            submit: string;
            submitDescription: string;
            returnSuccess: string;
            cancelSuccess: string;
        };
        cancelReplenishment: {
            title: string;
            description: string;
            accept: string;
            reject: string;
            cancelSuccess: string;
        };
        caption: string;
    };
    orderHistory: {
        orderHistory: string;
        orderId: string;
        emptyPurchaseOrderId: string;
        date: string;
        status: string;
        PONumber: string;
        total: string;
        noOrders: string;
        noReplenishmentOrders: string;
        startShopping: string;
        sortBy: string;
        sortOrders: string;
        replenishmentOrderHistory: string;
        replenishmentOrderId: string;
        purchaseOrderNumber: string;
        costCenter: string;
        startOn: string;
        frequency: string;
        nextOrderDate: string;
        cancel: string;
        cancelled: string;
        replenishmentHistory: string;
        notFound: string;
        actions: string;
    };
    AccountOrderHistoryTabContainer: {
        tabs: {
            AccountOrderHistoryComponent: string;
            OrderReturnRequestListComponent: string;
        };
        tabPanelContainerRegion: string;
    };
    returnRequestList: {
        returnRequestId: string;
        orderId: string;
        date: string;
        status: string;
        sortBy: string;
        sortReturns: string;
        statusDisplay_APPROVAL_PENDING: string;
        statusDisplay_CANCELED: string;
        statusDisplay_CANCELLING: string;
        statusDisplay_WAIT: string;
        statusDisplay_RECEIVED: string;
        statusDisplay_RECEIVING: string;
        statusDisplay_APPROVING: string;
        statusDisplay_REVERSING_PAYMENT: string;
        statusDisplay_PAYMENT_REVERSED: string;
        statusDisplay_PAYMENT_REVERSAL_FAILED: string;
        statusDisplay_REVERSING_TAX: string;
        statusDisplay_TAX_REVERSED: string;
        statusDisplay_TAX_REVERSAL_FAILED: string;
        statusDisplay_COMPLETED: string;
    };
    returnRequest: {
        returnRequestId: string;
        orderCode: string;
        status: string;
        cancel: string;
        item: string;
        itemPrice: string;
        returnQty: string;
        total: string;
        summary: string;
        subtotal: string;
        deliveryCode: string;
        estimatedRefund: string;
        note: string;
        cancelSuccess: string;
        caption: string;
    };
    reorder: {
        button: string;
        dialog: {
            reorderProducts: string;
            messages: {
                reviewConfiguration: string;
                lowStock: string;
                noStock: string;
                pricingError: string;
                unresolvableIssues: string;
                success: string;
            };
            areYouSureToReplaceCart: string;
            cancel: string;
            continue: string;
        };
    };
};
export declare const MyAccountV2Order: {
    myAccountV2OrderHistory: {
        heading: string;
        item: string;
        items: string;
        totalPrice: string;
        consignmentCode: string;
        statusDate: string;
        returnProcessed: string;
        deliveryPointOfServiceDetails: {
            itemsToBePickUp: string;
        };
        checkoutMode: {
            deliveryEntries: string;
        };
        checkoutPickupInStore: {
            heading: string;
        };
        orderListResults: string;
        orderListPagination: string;
        totalPriceLabel: string;
        orderPlaced: string;
        orderCodeLabel: string;
        consignmentDetailLabel: string;
        consignmentNumberLabel: string;
        consignmentStatusLabel: string;
        consignmentStatusDateLabel: string;
        estimateDeliveryLabel: string;
    };
    myAccountV2OrderDetails: {
        returnItems: string;
        cancelItems: string;
        downloadInvoices: string;
        viewAllOrders: string;
        noInvoices: string;
    };
};
