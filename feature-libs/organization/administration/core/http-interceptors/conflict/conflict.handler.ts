import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import {
  ErrorModel,
  GlobalMessageType,
  HttpErrorHandler,
  HttpResponseStatus,
  Priority,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class OrganizationConflictHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.CONFLICT;

  hasMatch(errorResponse: HttpErrorResponse): boolean {
    return (
      super.hasMatch(errorResponse) && this.getErrors(errorResponse).length > 0
    );
  }

  handleError(request: HttpRequest<any>, response: HttpErrorResponse) {
    if (!this.handleDuplicated(request, response)) {
      this.globalMessageService.add(
        { key: 'httpHandlers.conflict' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  protected handleDuplicated(
    request: HttpRequest<any>,
    response: HttpErrorResponse
  ): boolean {
    return this.getErrors(response)
      .map(({ message }: ErrorModel) =>
        [
          this.handleBudgetConflict(message),
          this.handleUserConflict(message, request),
          this.handleUserGroupConflict(message, request),
          this.handleUnitConflict(message),
        ].some((handler) => handler)
      )
      .some((handler) => handler);
  }

  protected handleOrganizationConflict(
    message: string,
    mask: RegExp,
    key: string,
    code?: string
  ): boolean {
    const result = mask.exec(message);
    const params = { code: result?.[1] ?? code };
    if (result) {
      this.globalMessageService.add(
        { key: `organization.httpHandlers.conflict.${key}`, params },
        GlobalMessageType.MSG_TYPE_ERROR
      );
      return true;
    }
    return false;
  }

  protected handleBudgetConflict(message: string): boolean {
    const mask = RegExp('Budget with code \\[(.*)\\] already exists', 'g');
    return this.handleOrganizationConflict(message, mask, 'budget');
  }

  protected handleUserConflict(
    message: string,
    request: HttpRequest<any>
  ): boolean {
    const mask = RegExp('User already exists', 'g');
    return this.handleOrganizationConflict(
      message,
      mask,
      'user',
      request?.body?.email
    );
  }

  protected handleUserGroupConflict(
    message: string,
    request: HttpRequest<any>
  ): boolean {
    const mask = RegExp(
      'Member Permission with the same id already exists',
      'g'
    );
    return this.handleOrganizationConflict(
      message,
      mask,
      'userGroup',
      request?.body?.uid
    );
  }

  protected handleUnitConflict(message: string): boolean {
    const mask = RegExp(
      'Organizational unit with uid \\[(.*)\\] already exists',
      'g'
    );
    return this.handleOrganizationConflict(message, mask, 'unit');
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors || []).filter(
      (error) => error.type === 'AlreadyExistsError'
    );
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }
}
