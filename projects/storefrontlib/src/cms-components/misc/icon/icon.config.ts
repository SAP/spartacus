import { DirectionMode } from '../../../layout/config/direction.model';
import { IconConfig } from './icon.model';

export const defaultIconConfig: IconConfig = {
  icon: {
    flipDirection: {
      STAR: DirectionMode.RTL,
      CARET_RIGHT: DirectionMode.RTL,
      CARET_LEFT: DirectionMode.RTL,
    },
  },
};
