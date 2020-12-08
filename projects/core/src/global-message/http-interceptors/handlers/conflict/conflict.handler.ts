import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { HttpErrorHandler } from '../http-error.handler';
import { Priority } from '../../../../util/applicable';
import { ErrorModel } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ConflictHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.CONFLICT;

  handleError(_request: HttpRequest<any>, response: HttpErrorResponse) {
    this.handleConflict(_request, response);
  }

  protected handleConflict(
    _request: HttpRequest<any>,
    response: HttpErrorResponse
  ) {
    this.getErrors(response)
      .filter((error) => error.type === 'AlreadyExistsError')
      .forEach(({ message }: ErrorModel) => {
        if (
          ![
            this.handleBudgetConflict(message),
            this.handleUserConflict(message),
            this.handleUserGroupConflict(message),
            this.handleUnitConflict(message),
          ].some((handler) => handler)
        ) {
          this.globalMessageService.add(
            { key: 'httpHandlers.conflict.other' },
            GlobalMessageType.MSG_TYPE_ERROR
          );
        }
      });
  }

  protected handleOrganizationConflict(
    message: string,
    mask: RegExp,
    key: string
  ): boolean {
    const result = mask.exec(message);
    const params = { code: result?.[1] };
    if (result) {
      this.globalMessageService.add(
        { key: `httpHandlers.conflict.${key}`, params },
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

  protected handleUserConflict(message: string): boolean {
    const mask = RegExp('User already exists', 'g');
    return this.handleOrganizationConflict(message, mask, 'user');
  }

  protected handleUserGroupConflict(message: string): boolean {
    const mask = RegExp(
      'Member Permission with the same id already exists',
      'g'
    );
    return this.handleOrganizationConflict(message, mask, 'userGroup');
  }

  protected handleUnitConflict(message: string): boolean {
    const mask = RegExp(
      'Organizational unit with uid \\[(.*)\\] already exists',
      'g'
    );
    return this.handleOrganizationConflict(message, mask, 'unit');
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return response.error?.errors || [];
  }

  getPriority(): Priority {
    return Priority.LOW;
  }
}
