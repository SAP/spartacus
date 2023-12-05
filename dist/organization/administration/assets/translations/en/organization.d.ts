/**
 * The organization i18n labels provide generic labels for all organization sub features.
 * Once #7154 is in place, we can start adding specific i18n labels. The organization labels
 * will then serve as a backup.
 */
export declare const organization: {
    organization: {
        enabled: string;
        disabled: string;
        enable: string;
        disable: string;
        name: string;
        code: string;
        done: string;
        cancel: string;
        add: string;
        manageUsers: string;
        create: string;
        edit: string;
        save: string;
        delete: string;
        assign: string;
        active: string;
        status: string;
        details: string;
        messages: {
            emptyList: string;
        };
        userRoles: {
            b2bcustomergroup: string;
            b2bapprovergroup: string;
            b2bmanagergroup: string;
            b2badmingroup: string;
        };
        userRights: {
            unitorderviewergroup: string;
        };
        breadcrumb: string;
        notification: {
            noSufficientPermissions: string;
            notExist: string;
            disabled: string;
        };
        confirmation: {
            cancel: string;
            confirm: string;
            disable: string;
            delete: string;
        };
        httpHandlers: {
            conflict: {
                budget: string;
                costCenter: string;
                unit: string;
                user: string;
                userGroup: string;
                permission: string;
                unknown: string;
            };
        };
        information: string;
    };
    orgCostCenter: {
        header: string;
        code: string;
        active: string;
        name: string;
        currency: string;
        unit: string;
        actions: string;
        sortBy: string;
        sort: {
            byName: string;
            byUnitName: string;
            byCode: string;
        };
        hint: string;
        disable: {
            confirm: string;
        };
        messages: {
            deactivateTitle: string;
            deactivate: string;
            confirmEnabled: string;
            confirmDisabled: string;
            update: string;
            create: string;
        };
        info: {
            disabledEdit: string;
            disabledEnable: string;
        };
        details: {
            title: string;
            subtitle: string;
        };
        edit: {
            title: string;
            subtitle: string;
        };
        create: {
            title: string;
            subtitle: string;
        };
        budget: {
            link: string;
        };
        breadcrumbs: {
            list: string;
            details: string;
            budgets: string;
        };
    };
    orgCostCenterBudgets: {
        title: string;
        subtitle: string;
        assigned: string;
        unassigned: string;
    };
    orgCostCenterAssignedBudgets: {
        title: string;
        subtitle: string;
        assigned: string;
        unassigned: string;
    };
    orgBudget: {
        header: string;
        code: string;
        name: string;
        active: string;
        currency: string;
        amount: string;
        unit: string;
        businessUnits: string;
        dateRange: string;
        startDate: string;
        endDate: string;
        actions: string;
        sortBy: string;
        sort: {
            byName: string;
            byUnitName: string;
            byCode: string;
            byValue: string;
        };
        hint: string;
        details: {
            title: string;
            subtitle: string;
        };
        edit: {
            title: string;
            subtitle: string;
        };
        create: {
            title: string;
            subtitle: string;
        };
        messages: {
            deactivateTitle: string;
            deactivate: string;
            confirmEnabled: string;
            confirmDisabled: string;
            update: string;
            create: string;
        };
        info: {
            disabledEdit: string;
            disabledEnable: string;
        };
        links: {
            costCenters: string;
        };
        breadcrumbs: {
            list: string;
            details: string;
        };
    };
    orgBudgetAssignedCostCenters: {
        title: string;
        subtitle: string;
    };
    orgUnit: {
        header: string;
        unit: string;
        name: string;
        uid: string;
        approvalProcess: string;
        parentUnit: string;
        active: string;
        hint: string;
        details: {
            title: string;
            subtitle: string;
            hint: string;
        };
        edit: {
            title: string;
            subtitle: string;
        };
        create: {
            title: string;
            subtitle: string;
        };
        messages: {
            deactivateTitle: string;
            deactivate: string;
            confirmEnabled: string;
            confirmDisabled: string;
            update: string;
            create: string;
        };
        info: {
            disabledEdit: string;
            disabledEnable: string;
            disabledDisable: string;
        };
        links: {
            units: string;
            users: string;
            approvers: string;
            shippingAddresses: string;
            costCenters: string;
        };
        tree: {
            expandAll: string;
            collapseAll: string;
            expand: string;
            collapse: string;
        };
        children: {
            create: {
                title: string;
                subtitle: string;
            };
            messages: {
                create: string;
            };
        };
        costCenters: {
            create: {
                title: string;
                subtitle: string;
            };
        };
        form: {
            parentOrgUnit: string;
            create: string;
            parentOrgUnitNotes: string;
        };
        users: {
            header: string;
            changeUserRoles: string;
            newUser: string;
        };
        assignRoles: {
            header: string;
            instructions: {
                check: string;
                uncheck: string;
                changes: string;
            };
        };
        approvers: {
            header: string;
            assign: string;
            new: string;
        };
        assignApprovers: {
            header: string;
            instructions: {
                check: string;
                uncheck: string;
                changes: string;
            };
            hint: string;
        };
        breadcrumbs: {
            list: string;
            details: string;
            children: string;
            users: string;
            approvers: string;
            addresses: string;
            addressDetails: string;
            costCenters: string;
        };
    };
    orgUnitChildren: {
        title: string;
        subtitle: string;
        info: {
            disabledCreate: string;
        };
        hint: string;
    };
    orgUnitApprovers: {
        title: string;
        subtitle: string;
        assigned: string;
        unassigned: string;
    };
    orgUnitAssignedApprovers: {
        title: string;
        subtitle: string;
        assigned: string;
        unassigned: string;
        hint: string;
    };
    orgUnitAssignedRoles: {
        header: string;
        name: string;
        email: string;
        roles: string;
        roleCustomer: string;
        roleApprover: string;
        roleManager: string;
        roleAdministrator: string;
    };
    orgUnitUsers: {
        title: string;
        subtitle: string;
        info: {
            disabledCreate: string;
        };
        hint: string;
    };
    orgUnitUserRoles: {
        title: string;
        subtitle: string;
        messages: {
            rolesUpdated: string;
        };
    };
    orgUnitAssignedUsers: {
        title: string;
        subtitle: string;
    };
    orgUnitCostCenters: {
        title: string;
        subtitle: string;
        info: {
            disabledCreate: string;
        };
        hint: string;
    };
    orgUnitAddress: {
        title: string;
        subtitle: string;
        country: string;
        titles: string;
        firstName: string;
        lastName: string;
        formattedAddress: string;
        address1: string;
        address2: string;
        city: string;
        state: string;
        zipCode: string;
        phoneNumber: string;
        streetAddress: string;
        aptSuite: string;
        selectOne: string;
        hint: string;
        details: {
            title: string;
            subtitle: string;
        };
        edit: {
            title: string;
        };
        create: {
            title: string;
        };
        form: {
            subtitle: string;
        };
        messages: {
            create: string;
            update: string;
            delete: string;
            deleteTitle: string;
            deleted: string;
        };
    };
    orgUserGroup: {
        header: string;
        disabled: string;
        uid: string;
        name: string;
        unit: string;
        orgUnit: string;
        actions: string;
        sortBy: string;
        sort: {
            byName: string;
            byUnitName: string;
            byGroupID: string;
        };
        hint: string;
        details: {
            title: string;
            subtitle: string;
        };
        edit: {
            title: string;
            subtitle: string;
        };
        create: {
            title: string;
            subtitle: string;
        };
        links: {
            user: string;
            permission: string;
        };
        messages: {
            update: string; /**
             * The organization i18n labels provide generic labels for all organization sub features.
             * Once #7154 is in place, we can start adding specific i18n labels. The organization labels
             * will then serve as a backup.
             */
            create: string;
            deleteTitle: string;
            delete: string;
            deleted: string;
        };
        breadcrumbs: {
            list: string;
            details: string;
            users: string;
            permissions: string;
        };
    };
    orgUserGroupUsers: {
        title: string;
        subtitle: string;
        assigned: string;
        unassigned: string;
        unassignAll: string;
        unassignAllConfirmation: string;
    };
    orgUserGroupAssignedUsers: {
        title: string;
        subtitle: string;
        assigned: string;
        unassigned: string;
    };
    orgUserGroupPermissions: {
        title: string;
        subtitle: string;
        assigned: string;
        unassigned: string;
    };
    orgUserGroupAssignedPermissions: {
        title: string;
        subtitle: string;
        assigned: string;
        unassigned: string;
    };
    orgUser: {
        header: string;
        disabled: string;
        uid: string;
        active: string;
        name: string;
        firstName: string;
        lastName: string;
        email: string;
        orgUnit: string;
        unit: string;
        roles: string;
        rights: string;
        title: string;
        hint: string;
        unitApprover: string;
        assignApprover: string;
        actions: string;
        sortBy: string;
        sort: {
            byName: string;
            byUnit: string;
        };
        details: {
            title: string;
            subtitle: string;
        };
        edit: {
            title: string;
            subtitle: string;
        };
        create: {
            title: string;
            subtitle: string;
        };
        links: {
            password: string;
            approvers: string;
            userGroup: string;
            permission: string;
            rolesAndRights: string;
        };
        messages: {
            deactivateTitle: string;
            deactivate: string;
            confirmEnabled: string;
            confirmDisabled: string;
            update: string;
            create: string;
            updatePassword: string;
        };
        info: {
            disabledEdit: string;
            disabledEnable: string;
        };
        approver: {
            link: string;
            header: string;
            assign: string;
            assignHeader: string;
            back: string;
            new: string;
            instructions: {
                check: string;
                uncheck: string;
                changes: string;
            };
        };
        userGroup: {
            link: string;
            header: string;
            assign: string;
            assignHeader: string;
            back: string;
            instructions: {
                check: string;
                uncheck: string;
                changes: string;
            };
        };
        permission: {
            link: string;
            header: string;
            assign: string;
            assignHeader: string;
            back: string;
            instructions: {
                check: string;
                uncheck: string;
                changes: string;
            };
            per: {
                undefined: string;
                MONTH: string;
                YEAR: string;
                WEEK: string;
                QUARTER: string;
            };
        };
        password: {
            title: string;
            subtitle: string;
            newPassword: string;
            confirmPassword: string;
        };
        breadcrumbs: {
            list: string;
            details: string;
            userGroups: string;
            approvers: string;
            permissions: string;
        };
    };
    orgUserUserGroups: {
        title: string;
        subtitle: string;
        assigned: string;
        unassigned: string;
    };
    orgUserAssignedUserGroups: {
        title: string;
        subtitle: string;
        assigned: string;
        unassigned: string;
    };
    orgUserApprovers: {
        title: string;
        subtitle: string;
        assigned: string;
        unassigned: string;
    };
    orgUserAssignedApprovers: {
        title: string;
        subtitle: string;
        assigned: string;
        unassigned: string;
    };
    orgUserPermissions: {
        title: string;
        subtitle: string;
        assigned: string;
        unassigned: string;
    };
    orgUserAssignedPermissions: {
        title: string;
        subtitle: string;
        assigned: string;
        unassigned: string;
    };
    orgPurchaseLimit: {
        header: string;
        name: string;
        code: string;
        active: string;
        limit: string;
        orderApprovalPermissionType: string;
        threshold: string;
        periodRange: string;
        currency: string;
        orgUnit: string;
        unit: string;
        actions: string;
        hint: string;
        details: {
            title: string;
            subtitle: string;
        };
        edit: {
            title: string;
            subtitle: string;
        };
        create: {
            title: string;
            subtitle: string;
        };
        sortBy: string;
        sort: {
            byName: string;
            byUnitName: string;
        };
        messages: {
            deactivateTitle: string;
            deactivate: string;
            confirmEnabled: string;
            confirmDisabled: string;
            update: string;
            create: string;
        };
        info: {
            disabledEdit: string;
            disabledEnable: string;
        };
        per: {
            DAY: string;
            WEEK: string;
            MONTH: string;
            QUARTER: string;
            YEAR: string;
        };
        breadcrumbs: {
            list: string;
            details: string;
        };
    };
};
