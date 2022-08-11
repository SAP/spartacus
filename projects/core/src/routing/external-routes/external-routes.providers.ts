import { ExternalRoutesService } from './external-routes.service';

export function addExternalRoutesFactory(
  service: ExternalRoutesService
): () => void {
  const result = () => {
    service.addRoutes();
  };
  return result;
}
