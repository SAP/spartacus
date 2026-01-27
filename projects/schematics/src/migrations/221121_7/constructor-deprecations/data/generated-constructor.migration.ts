/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

//
// Generated file, don't update manually.
//
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const GENERATED_CONSTRUCTOR_MIGRATIONS: ConstructorDeprecation[] = 
[
	{
		class: 'OrderGuestRegisterFormComponent',
		importPath: '@spartacus/order/components',
		deprecatedParams: [
			{
				className: 'UserRegisterFacade',
				importPath: '@spartacus/user/profile/root'
			},
			{
				className: 'RoutingService',
				importPath: '@spartacus/core'
			},
			{
				className: 'AuthService',
				importPath: '@spartacus/core'
			},
			{
				className: 'UntypedFormBuilder',
				importPath: '@angular/forms'
			}
		],
		removeParams: [
			{
				className: 'UserRegisterFacade',
				importPath: '@spartacus/user/profile/root'
			},
			{
				className: 'RoutingService',
				importPath: '@spartacus/core'
			},
			{
				className: 'AuthService',
				importPath: '@spartacus/core'
			},
			{
				className: 'UntypedFormBuilder',
				importPath: '@angular/forms'
			}
		],
		addParams: [
			{
				className: 'UserRegisterFacade',
				importPath: '@spartacus/user/profile/root'
			},
			{
				className: 'RoutingService',
				importPath: '@spartacus/core'
			},
			{
				className: 'UntypedFormBuilder',
				importPath: '@angular/forms'
			}
		]
	}
];
