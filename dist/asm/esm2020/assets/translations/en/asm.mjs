/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const asm = {
    asm: {
        mainLogoLabel: 'SAP',
        mainTitle: 'Assisted Service Mode',
        logout: 'Sign Out',
        hideUi: 'Close ASM',
        customers: 'Customers',
        asmCustomer360Button: '360 Customer View',
        createCustomerSuccessfullyAlert: 'The customer account has been created and the customer session has started.',
        saveInactiveCartAlertInfo: 'The identified cart is an inactive cart. To take further actions on this cart, save it first.',
        activeCartAlertInfo: 'The identified cart is an active cart.',
        startCustomerEmulationAlertInfo: 'Customer emulation has started. Any actions you do will reflect the effects on the customer account.',
        toggleUi: {
            collapse: 'Hide ASM',
            expand: 'Show ASM',
        },
        loginForm: {
            submit: 'Sign In',
            userId: {
                label: 'Agent ID',
                required: 'Agent ID is required',
            },
            password: {
                label: 'Password',
                required: 'Password is required',
            },
        },
        customerSearch: {
            searchTerm: {
                label: 'Customer Name/Email Address',
            },
            submit: 'Start Session',
            startEmulation: 'Start Emulation',
            noMatch: 'No customer found.',
            noMatchResult: 'This account cannot be found.',
            createCustomer: 'Create New Customer',
        },
        createCustomerForm: {
            title: 'Create New Customer',
            createAccount: 'Create',
            cancel: 'Cancel',
            firstName: {
                label: 'First Name',
                placeholder: 'First name',
            },
            lastName: {
                label: 'Last Name',
                placeholder: 'Last name',
            },
            emailAddress: {
                label: 'Email Address',
                placeholder: 'Email address',
            },
            createAccountAlert: 'The customer session starts once you create the customer account.',
            validationErrors: {
                firstName: 'Enter a valid first name.',
                lastName: 'Enter a valid last name.',
                emailAddress: 'Enter a valid email address.',
            },
            badRequestDuplicatedEmail: 'Enter a different email address as {{ emailAddress }} already exists.',
        },
        customerList: {
            title: 'Customer List',
            description: 'Select a customer from one of several provided lists.',
            createCustomer: 'Create New Customer',
            cancel: 'Cancel',
            tableHeader: {
                customer: 'Customer',
                customerName: 'Customer Name',
                name: 'Name',
                email: 'Email',
                emailId: 'Email/ID',
                phone: 'Phone',
                account: 'Account',
                cart: 'Cart',
                order: 'Order',
                view: '360 View',
            },
            tableSort: {
                sortBy: 'Sort by',
                byName: 'Name (Asc)',
                byNameAsc: 'Name (Asc)',
                byNameDesc: 'Name (Desc)',
                byDateAsc: 'Date (Asc)',
                byDateDesc: 'Date (Desc)',
                byOrderDateAsc: 'Order date (Asc)',
                byOrderDateDesc: 'Order date (Desc)',
                byUnit: 'Account (Asc)',
                byUnitDesc: 'Account (Desc)',
            },
            page: {
                page: 'Page {{count}}',
                previous: 'Previous',
                next: 'Next',
            },
            noOfCustomers: '{{count}} Customers',
            oneCustomer: '1 Customer',
            noCustomers: 'There are currently no customers in this customer list.',
            noLists: 'There are currently no customer lists available. Contact your system administrator.',
            listsError: 'The customer lists could not be retrieved. Please try again later.',
            searchBox: 'Search',
            enterSearchBox: 'Enter customer name or email',
        },
        switchCustomer: {
            dialog: {
                title: 'Warning',
                body: 'Clicking "Switch Customer" will end the emulation for "{{ customerA }}" and start for "{{ customerB }}". Any unsaved changes for "{{ customerA }}" will be lost.',
                actions: {
                    switch: 'Switch Customer',
                },
            },
        },
        saveCart: {
            saveCartBtn: 'Save for Later',
            dialog: {
                saveInfo: 'Save the cart before you can take further actions.',
                disableInfo: 'Cannot save the cart as it is empty.',
                title: 'Save Cart',
                row: {
                    id: 'ID',
                    qty: 'Qty',
                    total: 'Total',
                },
                actions: {
                    save: 'Save for Later',
                },
            },
        },
        bindCart: {
            cartNumber: 'Cart Number',
            bindCartToCustomer: 'Assign Cart to Customer',
            success: 'Cart has been successfully assigned',
            assignCartId: 'Assign a cart id to customer',
            enterCartId: 'Enter cart id',
            resetCartId: 'Reset',
            dialog: {
                title: 'Assign Anonymous Cart',
                body: 'Do you want to replace the current active cart with the anonymous cart? If you replace the current active cart, it is saved as a saved cart.',
                actions: {
                    replace: 'Replace Cart',
                },
            },
        },
        csagentTokenExpired: 'Your customer support agent session is expired.',
        endSession: 'End Session',
        endEmulation: 'End Emulation',
        agentSessionTimer: {
            label: 'Session Timeout',
            minutes: 'min',
            reset: 'Reset',
        },
        auth: {
            agentLoggedInError: 'Cannot login as user when there is an active CS agent session. Please either emulate user or logout CS agent.',
        },
        error: {
            noCustomerId: 'No customerId found for selected user. Session cannot be started.',
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9hc3NldHMvdHJhbnNsYXRpb25zL2VuL2FzbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHO0lBQ2pCLEdBQUcsRUFBRTtRQUNILGFBQWEsRUFBRSxLQUFLO1FBQ3BCLFNBQVMsRUFBRSx1QkFBdUI7UUFDbEMsTUFBTSxFQUFFLFVBQVU7UUFDbEIsTUFBTSxFQUFFLFdBQVc7UUFDbkIsU0FBUyxFQUFFLFdBQVc7UUFDdEIsb0JBQW9CLEVBQUUsbUJBQW1CO1FBQ3pDLCtCQUErQixFQUM3Qiw2RUFBNkU7UUFDL0UseUJBQXlCLEVBQ3ZCLCtGQUErRjtRQUNqRyxtQkFBbUIsRUFBRSx3Q0FBd0M7UUFDN0QsK0JBQStCLEVBQzdCLHNHQUFzRztRQUN4RyxRQUFRLEVBQUU7WUFDUixRQUFRLEVBQUUsVUFBVTtZQUNwQixNQUFNLEVBQUUsVUFBVTtTQUNuQjtRQUNELFNBQVMsRUFBRTtZQUNULE1BQU0sRUFBRSxTQUFTO1lBQ2pCLE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUUsVUFBVTtnQkFDakIsUUFBUSxFQUFFLHNCQUFzQjthQUNqQztZQUNELFFBQVEsRUFBRTtnQkFDUixLQUFLLEVBQUUsVUFBVTtnQkFDakIsUUFBUSxFQUFFLHNCQUFzQjthQUNqQztTQUNGO1FBQ0QsY0FBYyxFQUFFO1lBQ2QsVUFBVSxFQUFFO2dCQUNWLEtBQUssRUFBRSw2QkFBNkI7YUFDckM7WUFDRCxNQUFNLEVBQUUsZUFBZTtZQUN2QixjQUFjLEVBQUUsaUJBQWlCO1lBQ2pDLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsYUFBYSxFQUFFLCtCQUErQjtZQUM5QyxjQUFjLEVBQUUscUJBQXFCO1NBQ3RDO1FBQ0Qsa0JBQWtCLEVBQUU7WUFDbEIsS0FBSyxFQUFFLHFCQUFxQjtZQUM1Qixh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OUIsSUFBSSxFQUFFLDhJQUE4STtnQkFDcEosT0FBTyxFQUFFO29CQUNQLE9BQU8sRUFBRSxjQUFjO2lCQUN4QjthQUNGO1NBQ0Y7UUFDRCxtQkFBbUIsRUFBRSxpREFBaUQ7UUFDdEUsVUFBVSxFQUFFLGFBQWE7UUFDekIsWUFBWSxFQUFFLGVBQWU7UUFDN0IsaUJBQWlCLEVBQUU7WUFDakIsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxPQUFPO1NBQ2Y7UUFDRCxJQUFJLEVBQUU7WUFDSixrQkFBa0IsRUFDaEIsK0dBQStHO1NBQ2xIO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsWUFBWSxFQUNWLG1FQUFtRTtTQUN0RTtLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmV4cG9ydCBjb25zdCBhc20gPSB7XG4gIGFzbToge1xuICAgIG1haW5Mb2dvTGFiZWw6ICdTQVAnLFxuICAgIG1haW5UaXRsZTogJ0Fzc2lzdGVkIFNlcnZpY2UgTW9kZScsXG4gICAgbG9nb3V0OiAnU2lnbiBPdXQnLFxuICAgIGhpZGVVaTogJ0Nsb3NlIEFTTScsXG4gICAgY3VzdG9tZXJzOiAnQ3VzdG9tZXJzJyxcbiAgICBhc21DdXN0b21lcjM2MEJ1dHRvbjogJzM2MCBDdXN0b21lciBWaWV3JyxcbiAgICBjcmVhdGVDdXN0b21lclN1Y2Nlc3NmdWxseUFsZXJ0OlxuICAgICAgJ1RoZSBjdXN0b21lciBhY2NvdW50IGhhcyBiZWVuIGNyZWF0ZWQgYW5kIHRoZSBjdXN0b21lciBzZXNzaW9uIGhhcyBzdGFydGVkLicsXG4gICAgc2F2ZUluYWN0aXZlQ2FydEFsZXJ0SW5mbzpcbiAgICAgICdUaGUgaWRlbnRpZmllZCBjYXJ0IGlzIGFuIGluYWN0aXZlIGNhcnQuIFRvIHRha2UgZnVydGhlciBhY3Rpb25zIG9uIHRoaXMgY2FydCwgc2F2ZSBpdCBmaXJzdC4nLFxuICAgIGFjdGl2ZUNhcnRBbGVydEluZm86ICdUaGUgaWRlbnRpZmllZCBjYXJ0IGlzIGFuIGFjdGl2ZSBjYXJ0LicsXG4gICAgc3RhcnRDdXN0b21lckVtdWxhdGlvbkFsZXJ0SW5mbzpcbiAgICAgICdDdXN0b21lciBlbXVsYXRpb24gaGFzIHN0YXJ0ZWQuIEFueSBhY3Rpb25zIHlvdSBkbyB3aWxsIHJlZmxlY3QgdGhlIGVmZmVjdHMgb24gdGhlIGN1c3RvbWVyIGFjY291bnQuJyxcbiAgICB0b2dnbGVVaToge1xuICAgICAgY29sbGFwc2U6ICdIaWRlIEFTTScsXG4gICAgICBleHBhbmQ6ICdTaG93IEFTTScsXG4gICAgfSxcbiAgICBsb2dpbkZvcm06IHtcbiAgICAgIHN1Ym1pdDogJ1NpZ24gSW4nLFxuICAgICAgdXNlcklkOiB7XG4gICAgICAgIGxhYmVsOiAnQWdlbnQgSUQnLFxuICAgICAgICByZXF1aXJlZDogJ0FnZW50IElEIGlzIHJlcXVpcmVkJyxcbiAgICAgIH0sXG4gICAgICBwYXNzd29yZDoge1xuICAgICAgICBsYWJlbDogJ1Bhc3N3b3JkJyxcbiAgICAgICAgcmVxdWlyZWQ6ICdQYXNzd29yZCBpcyByZXF1aXJlZCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY3VzdG9tZXJTZWFyY2g6IHtcbiAgICAgIHNlYXJjaFRlcm06IHtcbiAgICAgICAgbGFiZWw6ICdDdXN0b21lciBOYW1lL0VtYWlsIEFkZHJlc3MnLFxuICAgICAgfSxcbiAgICAgIHN1Ym1pdDogJ1N0YXJ0IFNlc3Npb24nLFxuICAgICAgc3RhcnRFbXVsYXRpb246ICdTdGFydCBFbXVsYXRpb24nLFxuICAgICAgbm9NYXRjaDogJ05vIGN1c3RvbWVyIGZvdW5kLicsXG4gICAgICBub01hdGNoUmVzdWx0OiAnVGhpcyBhY2NvdW50IGNhbm5vdCBiZSBmb3VuZC4nLFxuICAgICAgY3JlYXRlQ3VzdG9tZXI6ICdDcmVhdGUgTmV3IEN1c3RvbWVyJyxcbiAgICB9LFxuICAgIGNyZWF0ZUN1c3RvbWVyRm9ybToge1xuICAgICAgdGl0bGU6ICdDcmVhdGUgTmV3IEN1c3RvbWVyJyxcbiAgICAgIGNyZWF0ZUFjY291bnQ6ICdDcmVhdGUnLFxuICAgICAgY2FuY2VsOiAnQ2FuY2VsJyxcbiAgICAgIGZpcnN0TmFtZToge1xuICAgICAgICBsYWJlbDogJ0ZpcnN0IE5hbWUnLFxuICAgICAgICBwbGFjZWhvbGRlcjogJ0ZpcnN0IG5hbWUnLFxuICAgICAgfSxcbiAgICAgIGxhc3ROYW1lOiB7XG4gICAgICAgIGxhYmVsOiAnTGFzdCBOYW1lJyxcbiAgICAgICAgcGxhY2Vob2xkZXI6ICdMYXN0IG5hbWUnLFxuICAgICAgfSxcbiAgICAgIGVtYWlsQWRkcmVzczoge1xuICAgICAgICBsYWJlbDogJ0VtYWlsIEFkZHJlc3MnLFxuICAgICAgICBwbGFjZWhvbGRlcjogJ0VtYWlsIGFkZHJlc3MnLFxuICAgICAgfSxcbiAgICAgIGNyZWF0ZUFjY291bnRBbGVydDpcbiAgICAgICAgJ1RoZSBjdXN0b21lciBzZXNzaW9uIHN0YXJ0cyBvbmNlIHlvdSBjcmVhdGUgdGhlIGN1c3RvbWVyIGFjY291bnQuJyxcbiAgICAgIHZhbGlkYXRpb25FcnJvcnM6IHtcbiAgICAgICAgZmlyc3ROYW1lOiAnRW50ZXIgYSB2YWxpZCBmaXJzdCBuYW1lLicsXG4gICAgICAgIGxhc3ROYW1lOiAnRW50ZXIgYSB2YWxpZCBsYXN0IG5hbWUuJyxcbiAgICAgICAgZW1haWxBZGRyZXNzOiAnRW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzLicsXG4gICAgICB9LFxuICAgICAgYmFkUmVxdWVzdER1cGxpY2F0ZWRFbWFpbDpcbiAgICAgICAgJ0VudGVyIGEgZGlmZmVyZW50IGVtYWlsIGFkZHJlc3MgYXMge3sgZW1haWxBZGRyZXNzIH19IGFscmVhZHkgZXhpc3RzLicsXG4gICAgfSxcbiAgICBjdXN0b21lckxpc3Q6IHtcbiAgICAgIHRpdGxlOiAnQ3VzdG9tZXIgTGlzdCcsXG4gICAgICBkZXNjcmlwdGlvbjogJ1NlbGVjdCBhIGN1c3RvbWVyIGZyb20gb25lIG9mIHNldmVyYWwgcHJvdmlkZWQgbGlzdHMuJyxcbiAgICAgIGNyZWF0ZUN1c3RvbWVyOiAnQ3JlYXRlIE5ldyBDdXN0b21lcicsXG4gICAgICBjYW5jZWw6ICdDYW5jZWwnLFxuICAgICAgdGFibGVIZWFkZXI6IHtcbiAgICAgICAgY3VzdG9tZXI6ICdDdXN0b21lcicsXG4gICAgICAgIGN1c3RvbWVyTmFtZTogJ0N1c3RvbWVyIE5hbWUnLFxuICAgICAgICBuYW1lOiAnTmFtZScsXG4gICAgICAgIGVtYWlsOiAnRW1haWwnLFxuICAgICAgICBlbWFpbElkOiAnRW1haWwvSUQnLFxuICAgICAgICBwaG9uZTogJ1Bob25lJyxcbiAgICAgICAgYWNjb3VudDogJ0FjY291bnQnLFxuICAgICAgICBjYXJ0OiAnQ2FydCcsXG4gICAgICAgIG9yZGVyOiAnT3JkZXInLFxuICAgICAgICB2aWV3OiAnMzYwIFZpZXcnLFxuICAgICAgfSxcbiAgICAgIHRhYmxlU29ydDoge1xuICAgICAgICBzb3J0Qnk6ICdTb3J0IGJ5JyxcbiAgICAgICAgYnlOYW1lOiAnTmFtZSAoQXNjKScsXG4gICAgICAgIGJ5TmFtZUFzYzogJ05hbWUgKEFzYyknLFxuICAgICAgICBieU5hbWVEZXNjOiAnTmFtZSAoRGVzYyknLFxuICAgICAgICBieURhdGVBc2M6ICdEYXRlIChBc2MpJyxcbiAgICAgICAgYnlEYXRlRGVzYzogJ0RhdGUgKERlc2MpJyxcbiAgICAgICAgYnlPcmRlckRhdGVBc2M6ICdPcmRlciBkYXRlIChBc2MpJyxcbiAgICAgICAgYnlPcmRlckRhdGVEZXNjOiAnT3JkZXIgZGF0ZSAoRGVzYyknLFxuICAgICAgICBieVVuaXQ6ICdBY2NvdW50IChBc2MpJyxcbiAgICAgICAgYnlVbml0RGVzYzogJ0FjY291bnQgKERlc2MpJyxcbiAgICAgIH0sXG4gICAgICBwYWdlOiB7XG4gICAgICAgIHBhZ2U6ICdQYWdlIHt7Y291bnR9fScsXG4gICAgICAgIHByZXZpb3VzOiAnUHJldmlvdXMnLFxuICAgICAgICBuZXh0OiAnTmV4dCcsXG4gICAgICB9LFxuICAgICAgbm9PZkN1c3RvbWVyczogJ3t7Y291bnR9fSBDdXN0b21lcnMnLFxuICAgICAgb25lQ3VzdG9tZXI6ICcxIEN1c3RvbWVyJyxcbiAgICAgIG5vQ3VzdG9tZXJzOiAnVGhlcmUgYXJlIGN1cnJlbnRseSBubyBjdXN0b21lcnMgaW4gdGhpcyBjdXN0b21lciBsaXN0LicsXG4gICAgICBub0xpc3RzOlxuICAgICAgICAnVGhlcmUgYXJlIGN1cnJlbnRseSBubyBjdXN0b21lciBsaXN0cyBhdmFpbGFibGUuIENvbnRhY3QgeW91ciBzeXN0ZW0gYWRtaW5pc3RyYXRvci4nLFxuICAgICAgbGlzdHNFcnJvcjpcbiAgICAgICAgJ1RoZSBjdXN0b21lciBsaXN0cyBjb3VsZCBub3QgYmUgcmV0cmlldmVkLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicsXG4gICAgICBzZWFyY2hCb3g6ICdTZWFyY2gnLFxuICAgICAgZW50ZXJTZWFyY2hCb3g6ICdFbnRlciBjdXN0b21lciBuYW1lIG9yIGVtYWlsJyxcbiAgICB9LFxuICAgIHN3aXRjaEN1c3RvbWVyOiB7XG4gICAgICBkaWFsb2c6IHtcbiAgICAgICAgdGl0bGU6ICdXYXJuaW5nJyxcbiAgICAgICAgYm9keTogJ0NsaWNraW5nIFwiU3dpdGNoIEN1c3RvbWVyXCIgd2lsbCBlbmQgdGhlIGVtdWxhdGlvbiBmb3IgXCJ7eyBjdXN0b21lckEgfX1cIiBhbmQgc3RhcnQgZm9yIFwie3sgY3VzdG9tZXJCIH19XCIuIEFueSB1bnNhdmVkIGNoYW5nZXMgZm9yIFwie3sgY3VzdG9tZXJBIH19XCIgd2lsbCBiZSBsb3N0LicsXG4gICAgICAgIGFjdGlvbnM6IHtcbiAgICAgICAgICBzd2l0Y2g6ICdTd2l0Y2ggQ3VzdG9tZXInLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNhdmVDYXJ0OiB7XG4gICAgICBzYXZlQ2FydEJ0bjogJ1NhdmUgZm9yIExhdGVyJyxcbiAgICAgIGRpYWxvZzoge1xuICAgICAgICBzYXZlSW5mbzogJ1NhdmUgdGhlIGNhcnQgYmVmb3JlIHlvdSBjYW4gdGFrZSBmdXJ0aGVyIGFjdGlvbnMuJyxcbiAgICAgICAgZGlzYWJsZUluZm86ICdDYW5ub3Qgc2F2ZSB0aGUgY2FydCBhcyBpdCBpcyBlbXB0eS4nLFxuICAgICAgICB0aXRsZTogJ1NhdmUgQ2FydCcsXG4gICAgICAgIHJvdzoge1xuICAgICAgICAgIGlkOiAnSUQnLFxuICAgICAgICAgIHF0eTogJ1F0eScsXG4gICAgICAgICAgdG90YWw6ICdUb3RhbCcsXG4gICAgICAgIH0sXG4gICAgICAgIGFjdGlvbnM6IHtcbiAgICAgICAgICBzYXZlOiAnU2F2ZSBmb3IgTGF0ZXInLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGJpbmRDYXJ0OiB7XG4gICAgICBjYXJ0TnVtYmVyOiAnQ2FydCBOdW1iZXInLFxuICAgICAgYmluZENhcnRUb0N1c3RvbWVyOiAnQXNzaWduIENhcnQgdG8gQ3VzdG9tZXInLFxuICAgICAgc3VjY2VzczogJ0NhcnQgaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IGFzc2lnbmVkJyxcbiAgICAgIGFzc2lnbkNhcnRJZDogJ0Fzc2lnbiBhIGNhcnQgaWQgdG8gY3VzdG9tZXInLFxuICAgICAgZW50ZXJDYXJ0SWQ6ICdFbnRlciBjYXJ0IGlkJyxcbiAgICAgIHJlc2V0Q2FydElkOiAnUmVzZXQnLFxuICAgICAgZGlhbG9nOiB7XG4gICAgICAgIHRpdGxlOiAnQXNzaWduIEFub255bW91cyBDYXJ0JyxcbiAgICAgICAgYm9keTogJ0RvIHlvdSB3YW50IHRvIHJlcGxhY2UgdGhlIGN1cnJlbnQgYWN0aXZlIGNhcnQgd2l0aCB0aGUgYW5vbnltb3VzIGNhcnQ/IElmIHlvdSByZXBsYWNlIHRoZSBjdXJyZW50IGFjdGl2ZSBjYXJ0LCBpdCBpcyBzYXZlZCBhcyBhIHNhdmVkIGNhcnQuJyxcbiAgICAgICAgYWN0aW9uczoge1xuICAgICAgICAgIHJlcGxhY2U6ICdSZXBsYWNlIENhcnQnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNzYWdlbnRUb2tlbkV4cGlyZWQ6ICdZb3VyIGN1c3RvbWVyIHN1cHBvcnQgYWdlbnQgc2Vzc2lvbiBpcyBleHBpcmVkLicsXG4gICAgZW5kU2Vzc2lvbjogJ0VuZCBTZXNzaW9uJyxcbiAgICBlbmRFbXVsYXRpb246ICdFbmQgRW11bGF0aW9uJyxcbiAgICBhZ2VudFNlc3Npb25UaW1lcjoge1xuICAgICAgbGFiZWw6ICdTZXNzaW9uIFRpbWVvdXQnLFxuICAgICAgbWludXRlczogJ21pbicsXG4gICAgICByZXNldDogJ1Jlc2V0JyxcbiAgICB9LFxuICAgIGF1dGg6IHtcbiAgICAgIGFnZW50TG9nZ2VkSW5FcnJvcjpcbiAgICAgICAgJ0Nhbm5vdCBsb2dpbiBhcyB1c2VyIHdoZW4gdGhlcmUgaXMgYW4gYWN0aXZlIENTIGFnZW50IHNlc3Npb24uIFBsZWFzZSBlaXRoZXIgZW11bGF0ZSB1c2VyIG9yIGxvZ291dCBDUyBhZ2VudC4nLFxuICAgIH0sXG4gICAgZXJyb3I6IHtcbiAgICAgIG5vQ3VzdG9tZXJJZDpcbiAgICAgICAgJ05vIGN1c3RvbWVySWQgZm91bmQgZm9yIHNlbGVjdGVkIHVzZXIuIFNlc3Npb24gY2Fubm90IGJlIHN0YXJ0ZWQuJyxcbiAgICB9LFxuICB9LFxufTtcbiJdfQ==