export declare const en: {
    accountSummary: {
        orgAccountSummary: {
            header: string;
            name: string;
            details: {
                header: string;
                uid: string;
                name: string;
                address: string;
                creditRep: string;
                creditLine: string;
                currentBalance: string;
                openBalance: string;
                pastDueBalance: string;
                dayRange: string;
                dayPlus: string;
                notApplicable: string;
            };
            document: {
                header: string;
                id: string;
                type: string;
                date: string;
                dueDate: string;
                originalAmount: string;
                openAmount: string;
                status: string;
                attachment: string;
                download: string;
                attachmentDescription: string;
                noneFound: string;
            };
            sorts: {
                byCreatedAtDateAsc: string;
                byCreatedAtDateDesc: string;
                byDueAtDateAsc: string;
                byDueAtDateDesc: string;
                byOriginalAmountAsc: string;
                byOriginalAmountDesc: string;
                byOpenAmountAsc: string;
                byOpenAmountDesc: string;
                byOrgDocumentTypeAsc: string;
                byOrgDocumentTypeDesc: string;
                byStatusAsc: string;
                byStatusDesc: string;
                byOrgDocumentIdAsc: string;
                byOrgDocumentIdDesc: string;
            };
            statuses: {
                open: string;
                closed: string;
                all: string;
            };
            filterByOptions: {
                orgDocumentId: string;
                orgDocumentIdRange: string;
                orgDocumentType: string;
                createdAtDateRange: string;
                dueAtDateRange: string;
                amountRange: string;
                openAmountRange: string;
            };
            sortBy: string;
            sortDocuments: string;
            filter: {
                status: string;
                filterBy: string;
                documentNumber: string;
                documentType: string;
                startRange: string;
                endRange: string;
                clear: string;
                search: string;
                errors: {
                    toDateMustComeAfterFrom: string;
                    toAmountMustBeLargeThanFrom: string;
                };
            };
            hint: string;
        };
        orgAccountSummaryList: {
            breadcrumbs: {
                list: string;
                details: string;
            };
        };
    };
};
