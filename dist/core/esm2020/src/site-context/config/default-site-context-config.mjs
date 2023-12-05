/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CURRENCY_CONTEXT_ID, LANGUAGE_CONTEXT_ID, } from '../providers/context-ids';
export function defaultSiteContextConfigFactory() {
    return {
        context: {
            [LANGUAGE_CONTEXT_ID]: [
                'en',
                'de',
                'ja',
                'zh',
                'ru',
                'fr',
                'tr',
                'it',
                'es',
                'uk',
                'pl',
                'nl',
                'hi',
                'ar',
                'pt',
                'bn',
                'pa',
            ],
            [CURRENCY_CONTEXT_ID]: [
                'USD',
                'EUR',
                'JPY',
                'GBP',
                'AUD',
                'CAD',
                'CHF',
                'CNY',
                'SEK',
                'NZD',
                'MXN',
                'SGD',
                'HKD',
                'NOK',
                'KRW',
                'TRY',
                'RUB',
                'INR',
                'BRL',
                'ZAR',
            ],
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1zaXRlLWNvbnRleHQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvc2l0ZS1jb250ZXh0L2NvbmZpZy9kZWZhdWx0LXNpdGUtY29udGV4dC1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUdILE9BQU8sRUFDTCxtQkFBbUIsRUFDbkIsbUJBQW1CLEdBQ3BCLE1BQU0sMEJBQTBCLENBQUM7QUFFbEMsTUFBTSxVQUFVLCtCQUErQjtJQUM3QyxPQUFPO1FBQ0wsT0FBTyxFQUFFO1lBQ1AsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO2dCQUNyQixJQUFJO2dCQUNKLElBQUk7Z0JBQ0osSUFBSTtnQkFDSixJQUFJO2dCQUNKLElBQUk7Z0JBQ0osSUFBSTtnQkFDSixJQUFJO2dCQUNKLElBQUk7Z0JBQ0osSUFBSTtnQkFDSixJQUFJO2dCQUNKLElBQUk7Z0JBQ0osSUFBSTtnQkFDSixJQUFJO2dCQUNKLElBQUk7Z0JBQ0osSUFBSTtnQkFDSixJQUFJO2dCQUNKLElBQUk7YUFDTDtZQUNELENBQUMsbUJBQW1CLENBQUMsRUFBRTtnQkFDckIsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxLQUFLO2FBQ047U0FDRjtLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgU2l0ZUNvbnRleHRDb25maWcgfSBmcm9tICcuL3NpdGUtY29udGV4dC1jb25maWcnO1xuaW1wb3J0IHtcbiAgQ1VSUkVOQ1lfQ09OVEVYVF9JRCxcbiAgTEFOR1VBR0VfQ09OVEVYVF9JRCxcbn0gZnJvbSAnLi4vcHJvdmlkZXJzL2NvbnRleHQtaWRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRTaXRlQ29udGV4dENvbmZpZ0ZhY3RvcnkoKTogU2l0ZUNvbnRleHRDb25maWcge1xuICByZXR1cm4ge1xuICAgIGNvbnRleHQ6IHtcbiAgICAgIFtMQU5HVUFHRV9DT05URVhUX0lEXTogW1xuICAgICAgICAnZW4nLFxuICAgICAgICAnZGUnLFxuICAgICAgICAnamEnLFxuICAgICAgICAnemgnLFxuICAgICAgICAncnUnLFxuICAgICAgICAnZnInLFxuICAgICAgICAndHInLFxuICAgICAgICAnaXQnLFxuICAgICAgICAnZXMnLFxuICAgICAgICAndWsnLFxuICAgICAgICAncGwnLFxuICAgICAgICAnbmwnLFxuICAgICAgICAnaGknLFxuICAgICAgICAnYXInLFxuICAgICAgICAncHQnLFxuICAgICAgICAnYm4nLFxuICAgICAgICAncGEnLFxuICAgICAgXSxcbiAgICAgIFtDVVJSRU5DWV9DT05URVhUX0lEXTogW1xuICAgICAgICAnVVNEJyxcbiAgICAgICAgJ0VVUicsXG4gICAgICAgICdKUFknLFxuICAgICAgICAnR0JQJyxcbiAgICAgICAgJ0FVRCcsXG4gICAgICAgICdDQUQnLFxuICAgICAgICAnQ0hGJyxcbiAgICAgICAgJ0NOWScsXG4gICAgICAgICdTRUsnLFxuICAgICAgICAnTlpEJyxcbiAgICAgICAgJ01YTicsXG4gICAgICAgICdTR0QnLFxuICAgICAgICAnSEtEJyxcbiAgICAgICAgJ05PSycsXG4gICAgICAgICdLUlcnLFxuICAgICAgICAnVFJZJyxcbiAgICAgICAgJ1JVQicsXG4gICAgICAgICdJTlInLFxuICAgICAgICAnQlJMJyxcbiAgICAgICAgJ1pBUicsXG4gICAgICBdLFxuICAgIH0sXG4gIH07XG59XG4iXX0=