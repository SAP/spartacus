/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const userRegistrationForm = {
    fields: {
        titleCode: {
            label: 'Title (optional)',
            placeholder: 'Title',
        },
        firstName: {
            label: 'First name',
            placeholder: 'First name',
        },
        lastName: {
            label: 'Last name',
            placeholder: 'Last name',
        },
        companyName: {
            label: 'Company name',
            placeholder: 'Company name',
        },
        email: {
            label: 'E-mail',
            placeholder: 'E-mail',
        },
        city: {
            label: 'City/Town (optional)',
            placeholder: 'Please select City/Town',
        },
        country: {
            label: 'Country (optional)',
            placeholder: 'Select Country',
        },
        state: {
            label: 'State/Province (optional)',
            placeholder: 'Select State/Province',
        },
        postalCode: {
            label: 'Zip/Postal code (optional)',
            placeholder: 'Zip/Postal code',
        },
        addressLine: {
            label: 'Address (optional)',
            placeholder: 'Address',
        },
        secondAddressLine: {
            label: 'Address line 2 (optional)',
            placeholder: 'Address line 2',
        },
        phoneNumber: {
            label: 'Phone number (optional)',
            placeholder: 'Phone number',
        },
        message: {
            label: 'Message (optional)',
            placeholder: `An example data for the message field: "Department: Ground support; Position: Chief safe guard; Report to: Steve Jackson; Comments: Please create new account for me".`,
        },
    },
    messageToApproverTemplate: `Company name: {{companyName}},
  Phone number: {{phoneNumber}},
  Address: {{addressLine}} {{secondAddressLine}} {{city}} {{state}} {{postalCode}} {{country}},
  Message: {{message}}`,
    successFormSubmitMessage: 'Thank you for registering! A representative will contact you shortly and confirm your access information.',
    formSubmitButtonLabel: 'Register',
    goToLoginButtonLabel: 'Already registered? Go to Sign in',
    httpHandlers: {
        conflict: 'User with this e-mail address already exists.',
    },
};
export const userRegistration = {
    userRegistrationForm,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yZWdpc3RyYXRpb24uaTE4bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vdXNlci1yZWdpc3RyYXRpb24vYXNzZXRzL3RyYW5zbGF0aW9ucy9lbi91c2VyLXJlZ2lzdHJhdGlvbi5pMThuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRztJQUNsQyxNQUFNLEVBQUU7UUFDTixTQUFTLEVBQUU7WUFDVCxLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCLFdBQVcsRUFBRSxPQUFPO1NBQ3JCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsS0FBSyxFQUFFLFlBQVk7WUFDbkIsV0FBVyxFQUFFLFlBQVk7U0FDMUI7UUFDRCxRQUFRLEVBQUU7WUFDUixLQUFLLEVBQUUsV0FBVztZQUNsQixXQUFXLEVBQUUsV0FBVztTQUN6QjtRQUNELFdBQVcsRUFBRTtZQUNYLEtBQUssRUFBRSxjQUFjO1lBQ3JCLFdBQVcsRUFBRSxjQUFjO1NBQzVCO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsS0FBSyxFQUFFLFFBQVE7WUFDZixXQUFXLEVBQUUsUUFBUTtTQUN0QjtRQUNELElBQUksRUFBRTtZQUNKLEtBQUssRUFBRSxzQkFBc0I7WUFDN0IsV0FBVyxFQUFFLHlCQUF5QjtTQUN2QztRQUNELE9BQU8sRUFBRTtZQUNQLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsV0FBVyxFQUFFLGdCQUFnQjtTQUM5QjtRQUNELEtBQUssRUFBRTtZQUNMLEtBQUssRUFBRSwyQkFBMkI7WUFDbEMsV0FBVyxFQUFFLHVCQUF1QjtTQUNyQztRQUNELFVBQVUsRUFBRTtZQUNWLEtBQUssRUFBRSw0QkFBNEI7WUFDbkMsV0FBVyxFQUFFLGlCQUFpQjtTQUMvQjtRQUNELFdBQVcsRUFBRTtZQUNYLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsV0FBVyxFQUFFLFNBQVM7U0FDdkI7UUFDRCxpQkFBaUIsRUFBRTtZQUNqQixLQUFLLEVBQUUsMkJBQTJCO1lBQ2xDLFdBQVcsRUFBRSxnQkFBZ0I7U0FDOUI7UUFDRCxXQUFXLEVBQUU7WUFDWCxLQUFLLEVBQUUseUJBQXlCO1lBQ2hDLFdBQVcsRUFBRSxjQUFjO1NBQzVCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsS0FBSyxFQUFFLG9CQUFvQjtZQUMzQixXQUFXLEVBQUUsd0tBQXdLO1NBQ3RMO0tBQ0Y7SUFDRCx5QkFBeUIsRUFBRTs7O3VCQUdOO0lBQ3JCLHdCQUF3QixFQUN0QiwyR0FBMkc7SUFDN0cscUJBQXFCLEVBQUUsVUFBVTtJQUNqQyxvQkFBb0IsRUFBRSxtQ0FBbUM7SUFDekQsWUFBWSxFQUFFO1FBQ1osUUFBUSxFQUFFLCtDQUErQztLQUMxRDtDQUNGLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRztJQUM5QixvQkFBb0I7Q0FDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmV4cG9ydCBjb25zdCB1c2VyUmVnaXN0cmF0aW9uRm9ybSA9IHtcbiAgZmllbGRzOiB7XG4gICAgdGl0bGVDb2RlOiB7XG4gICAgICBsYWJlbDogJ1RpdGxlIChvcHRpb25hbCknLFxuICAgICAgcGxhY2Vob2xkZXI6ICdUaXRsZScsXG4gICAgfSxcbiAgICBmaXJzdE5hbWU6IHtcbiAgICAgIGxhYmVsOiAnRmlyc3QgbmFtZScsXG4gICAgICBwbGFjZWhvbGRlcjogJ0ZpcnN0IG5hbWUnLFxuICAgIH0sXG4gICAgbGFzdE5hbWU6IHtcbiAgICAgIGxhYmVsOiAnTGFzdCBuYW1lJyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnTGFzdCBuYW1lJyxcbiAgICB9LFxuICAgIGNvbXBhbnlOYW1lOiB7XG4gICAgICBsYWJlbDogJ0NvbXBhbnkgbmFtZScsXG4gICAgICBwbGFjZWhvbGRlcjogJ0NvbXBhbnkgbmFtZScsXG4gICAgfSxcbiAgICBlbWFpbDoge1xuICAgICAgbGFiZWw6ICdFLW1haWwnLFxuICAgICAgcGxhY2Vob2xkZXI6ICdFLW1haWwnLFxuICAgIH0sXG4gICAgY2l0eToge1xuICAgICAgbGFiZWw6ICdDaXR5L1Rvd24gKG9wdGlvbmFsKScsXG4gICAgICBwbGFjZWhvbGRlcjogJ1BsZWFzZSBzZWxlY3QgQ2l0eS9Ub3duJyxcbiAgICB9LFxuICAgIGNvdW50cnk6IHtcbiAgICAgIGxhYmVsOiAnQ291bnRyeSAob3B0aW9uYWwpJyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnU2VsZWN0IENvdW50cnknLFxuICAgIH0sXG4gICAgc3RhdGU6IHtcbiAgICAgIGxhYmVsOiAnU3RhdGUvUHJvdmluY2UgKG9wdGlvbmFsKScsXG4gICAgICBwbGFjZWhvbGRlcjogJ1NlbGVjdCBTdGF0ZS9Qcm92aW5jZScsXG4gICAgfSxcbiAgICBwb3N0YWxDb2RlOiB7XG4gICAgICBsYWJlbDogJ1ppcC9Qb3N0YWwgY29kZSAob3B0aW9uYWwpJyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnWmlwL1Bvc3RhbCBjb2RlJyxcbiAgICB9LFxuICAgIGFkZHJlc3NMaW5lOiB7XG4gICAgICBsYWJlbDogJ0FkZHJlc3MgKG9wdGlvbmFsKScsXG4gICAgICBwbGFjZWhvbGRlcjogJ0FkZHJlc3MnLFxuICAgIH0sXG4gICAgc2Vjb25kQWRkcmVzc0xpbmU6IHtcbiAgICAgIGxhYmVsOiAnQWRkcmVzcyBsaW5lIDIgKG9wdGlvbmFsKScsXG4gICAgICBwbGFjZWhvbGRlcjogJ0FkZHJlc3MgbGluZSAyJyxcbiAgICB9LFxuICAgIHBob25lTnVtYmVyOiB7XG4gICAgICBsYWJlbDogJ1Bob25lIG51bWJlciAob3B0aW9uYWwpJyxcbiAgICAgIHBsYWNlaG9sZGVyOiAnUGhvbmUgbnVtYmVyJyxcbiAgICB9LFxuICAgIG1lc3NhZ2U6IHtcbiAgICAgIGxhYmVsOiAnTWVzc2FnZSAob3B0aW9uYWwpJyxcbiAgICAgIHBsYWNlaG9sZGVyOiBgQW4gZXhhbXBsZSBkYXRhIGZvciB0aGUgbWVzc2FnZSBmaWVsZDogXCJEZXBhcnRtZW50OiBHcm91bmQgc3VwcG9ydDsgUG9zaXRpb246IENoaWVmIHNhZmUgZ3VhcmQ7IFJlcG9ydCB0bzogU3RldmUgSmFja3NvbjsgQ29tbWVudHM6IFBsZWFzZSBjcmVhdGUgbmV3IGFjY291bnQgZm9yIG1lXCIuYCxcbiAgICB9LFxuICB9LFxuICBtZXNzYWdlVG9BcHByb3ZlclRlbXBsYXRlOiBgQ29tcGFueSBuYW1lOiB7e2NvbXBhbnlOYW1lfX0sXG4gIFBob25lIG51bWJlcjoge3twaG9uZU51bWJlcn19LFxuICBBZGRyZXNzOiB7e2FkZHJlc3NMaW5lfX0ge3tzZWNvbmRBZGRyZXNzTGluZX19IHt7Y2l0eX19IHt7c3RhdGV9fSB7e3Bvc3RhbENvZGV9fSB7e2NvdW50cnl9fSxcbiAgTWVzc2FnZToge3ttZXNzYWdlfX1gLFxuICBzdWNjZXNzRm9ybVN1Ym1pdE1lc3NhZ2U6XG4gICAgJ1RoYW5rIHlvdSBmb3IgcmVnaXN0ZXJpbmchIEEgcmVwcmVzZW50YXRpdmUgd2lsbCBjb250YWN0IHlvdSBzaG9ydGx5IGFuZCBjb25maXJtIHlvdXIgYWNjZXNzIGluZm9ybWF0aW9uLicsXG4gIGZvcm1TdWJtaXRCdXR0b25MYWJlbDogJ1JlZ2lzdGVyJyxcbiAgZ29Ub0xvZ2luQnV0dG9uTGFiZWw6ICdBbHJlYWR5IHJlZ2lzdGVyZWQ/IEdvIHRvIFNpZ24gaW4nLFxuICBodHRwSGFuZGxlcnM6IHtcbiAgICBjb25mbGljdDogJ1VzZXIgd2l0aCB0aGlzIGUtbWFpbCBhZGRyZXNzIGFscmVhZHkgZXhpc3RzLicsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgdXNlclJlZ2lzdHJhdGlvbiA9IHtcbiAgdXNlclJlZ2lzdHJhdGlvbkZvcm0sXG59O1xuIl19