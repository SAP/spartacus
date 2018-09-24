import { ClientGenerator } from '../helpers/client-generator';
import { ENDPOINTS } from '../constants/endpoints';

export class UsersGenerator extends ClientGenerator {
  async generateForSite(site: string) {
    return {
      [`${site}-${ENDPOINTS.USERS}`]: this.getUsers()
    };
  }

  getUsers() {
    return [
      {
        type: 'userWsDTO',
        name: 'John Doe',
        uid: 'john@loco.com',
        displayUid: 'john@loco.com',
        firstName: 'John',
        lastName: 'Doe'
      }
    ];
  }
}
