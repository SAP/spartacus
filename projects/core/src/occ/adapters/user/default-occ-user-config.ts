import { OccConfig } from '../../config/occ-config';

export const defaultOccUserConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        userLoad: 'users/${userId}',
      },
    },
  },
};
