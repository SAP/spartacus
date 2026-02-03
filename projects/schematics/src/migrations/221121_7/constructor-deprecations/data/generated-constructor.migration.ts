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
		class: 'EntitySuccessAction',
		importPath: '@spartacus/core',
		deprecatedParams: [
			{
				className: 'string',
				importPath: ''
			},
			{
				className: 'EntityId',
				importPath: '@spartacus/core'
			},
			{
				className: 'any | undefined',
				importPath: ''
			}
		],
		removeParams: [
			{
				className: 'string',
				importPath: ''
			},
			{
				className: 'EntityId',
				importPath: '@spartacus/core'
			},
			{
				className: 'any | undefined',
				importPath: ''
			}
		],
		addParams: [
			{
				className: 'string',
				importPath: ''
			},
			{
				className: 'EntityId',
				importPath: '@spartacus/core'
			},
			{
				className: 'any',
				importPath: ''
			}
		]
	},
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
	},
	{
		class: 'NavigationUIComponent',
		importPath: '@spartacus/storefront',
		deprecatedParams: [
			{
				className: 'Router',
				importPath: '@angular/router'
			},
			{
				className: 'Renderer2',
				importPath: '@angular/core'
			},
			{
				className: 'ElementRef',
				importPath: '@angular/core'
			},
			{
				className: 'HamburgerMenuService',
				importPath: '@spartacus/storefront'
			},
			{
				className: 'WindowRef',
				importPath: '@spartacus/core'
			},
			{
				className: 'FeatureConfigService',
				importPath: '@spartacus/core'
			}
		],
		removeParams: [
			{
				className: 'Router',
				importPath: '@angular/router'
			},
			{
				className: 'Renderer2',
				importPath: '@angular/core'
			},
			{
				className: 'ElementRef',
				importPath: '@angular/core'
			},
			{
				className: 'HamburgerMenuService',
				importPath: '@spartacus/storefront'
			},
			{
				className: 'WindowRef',
				importPath: '@spartacus/core'
			},
			{
				className: 'FeatureConfigService',
				importPath: '@spartacus/core'
			}
		],
		addParams: [
			{
				className: 'Router',
				importPath: '@angular/router'
			},
			{
				className: 'Renderer2',
				importPath: '@angular/core'
			},
			{
				className: 'ElementRef',
				importPath: '@angular/core'
			},
			{
				className: 'HamburgerMenuService',
				importPath: '@spartacus/storefront'
			},
			{
				className: 'WindowRef',
				importPath: '@spartacus/core'
			}
		]
	}
];
