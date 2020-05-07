import { ExternalRoutesService } from './external-routes.service';

export function addExternalRoutesFactory(service: ExternalRoutesService) {
  const result = () => {
    service.addRoutes();
  };
  return result;
}
