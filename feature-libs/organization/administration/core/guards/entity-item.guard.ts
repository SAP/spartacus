import { BaseItem } from '../../components/shared';

export abstract class EntityItemGuard {
  canActivate(
    item: BaseItem,
    entity: string,
    routeParam?: string
  ): BaseItem | void {
    const entityData = this.splitEntity(entity);

    if (this.isValid(item)) {
      return item;
    } else {
      this.showErrorMessage(entityData);
      /*
       * timeout for the user to be able to see the error message before redirecting
       * if we do not want the timeout, we would need to use the global message service
       */
      setTimeout(() => {
        this.redirect(entityData, item, routeParam);
      }, 1000);
    }
  }

  protected splitEntity(entity: string): string[] {
    return entity.split('.');
  }

  protected abstract isValid(item: BaseItem): boolean;

  protected abstract showErrorMessage(entityData: string[]): void;

  protected abstract redirect(
    entityData: string[],
    _item?: BaseItem,
    _routeParam?: string
  ): void;
}
