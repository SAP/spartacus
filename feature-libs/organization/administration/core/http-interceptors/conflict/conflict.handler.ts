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

  protected budgetMask = /Budget with code \[(.*)\] already exists/g;
  protected userMask = /User already exists/g;
  protected userGroupMask = /Member Permission with the same id already exists/g;
  protected unitMask = /Organizational unit with uid \[(.*)\] already exists/g;

  hasMatch(errorResponse: HttpErrorResponse): boolean {
    return super.hasMatch(errorResponse) && this.matchMask(errorResponse);
  }

  handleError(request: HttpRequest<any>, response: HttpErrorResponse) {
    return this.getErrors(response).forEach(({ message }: ErrorModel) => {
      this.handleBudgetConflict(message);
      this.handleUserConflict(message, request);
      this.handleUserGroupConflict(message, request);
      this.handleUnitConflict(message);
    });
  }

  protected matchMask(response: HttpErrorResponse): boolean {
    return this.getErrors(response).some((error) =>
      [
        this.budgetMask,
        this.userMask,
        this.userGroupMask,
        this.unitMask,
      ].some((mask) => mask.exec(error.message))
    );
  }

  protected handleConflict(
    message: string,
    mask: RegExp,
    key: string,
    code?: string
  ) {
    const result = mask.exec(message);
    const params = { code: result?.[1] ?? code };
    if (result) {
      this.globalMessageService.add(
        { key: `organization.httpHandlers.conflict.${key}`, params },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
  }

  protected handleBudgetConflict(message: string) {
    this.handleConflict(message, this.budgetMask, 'budget');
  }

  protected handleUserConflict(message: string, request: HttpRequest<any>) {
    this.handleConflict(message, this.userMask, 'user', request?.body?.email);
  }

  protected handleUserGroupConflict(
    message: string,
    request: HttpRequest<any>
  ) {
    this.handleConflict(
      message,
      this.userGroupMask,
      'userGroup',
      request?.body?.uid
    );
  }

  protected handleUnitConflict(message: string) {
    this.handleConflict(message, this.unitMask, 'unit');
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
