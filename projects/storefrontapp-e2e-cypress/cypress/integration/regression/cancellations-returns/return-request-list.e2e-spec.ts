import { RegisterUser } from '../../../helpers/auth-forms';
import * as methods from '../../../helpers/cancellations-returns';

const user: RegisterUser = {
  firstName: 'Intern',
  lastName: 'Tester',
  email: 'test@sap.com',
  password: 'Test123$',
};

describe('Return Request List for Cancellations and Returns', () => {
  before(() => {
    methods.signIn(user);
  });

  it('should see order history tab and return request list tab', () => {
    methods.checkTabs();
  });

  it('should open the return request list tab and see a list', () => {
    methods.checkReturnRequestList();
  });

  it('should open order detail page when clicking order# on return list', () => {
    methods.checkOrderNumberLink();
  });

  it('should open return detail page when clicking return# on return list', () => {
    methods.checkReturnNumberLink();
  });
});
