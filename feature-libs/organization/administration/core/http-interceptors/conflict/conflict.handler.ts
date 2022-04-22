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

  protected budgetMask = /Budget with code \[(.*)\] already exists/;
  protected userMask = /User already exists/;
  protected userGroupMask = /Member Permission with the same id already exists/;
  protected unitMask = /Organizational unit with uid \[(.*)\] already exists/;

  hasMatch(errorResponse: HttpErrorResponse): boolean {
    return super.hasMatch(errorResponse) && this.matchMask(errorResponse);
  }

  handleError(request: HttpRequest<any>, response: HttpErrorResponse) {
    return this.getErrors(response).forEach(({ message }: ErrorModel) => {
      // Handle budget conflict
      this.handleConflict(message, this.budgetMask, 'budget');
      // Handle user email conflict
      this.handleConflict(message, this.userMask, 'user', request?.body?.email);
      // Handle user group conflict
      this.handleConflict(
        message,
        this.userGroupMask,
        'userGroup',
        request?.body?.uid
      );
      // Handle unit conflict
      this.handleConflict(message, this.unitMask, 'unit');
    });
  }

  protected matchMask(response: HttpErrorResponse): boolean {
    return this.getErrors(response).some((error) =>
      [this.budgetMask, this.userMask, this.userGroupMask, this.unitMask].some(
        (mask) => mask.test(error.message)
      )
    );
  }

  protected handleConflict(
    message: string,
    mask: RegExp,
    key: string,
    code?: string
  ) {
    const result = message.match(mask);
    const params = { code: result?.[1] ?? code };
    if (result) {
      this.globalMessageService.add(
        { key: `organization.httpHandlers.conflict.${key}`, params },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    }
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
