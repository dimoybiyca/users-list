import { Type } from '@angular/core';
import { TModalResult } from 'app/modal/types/modal-result.type';
import { Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export class ModalRef<T> {
  id: string;
  data: any;
  modalType: Type<any> | null = null;

  constructor() {
    this.id = uuidv4().toString();
  }

  private result = new Subject<TModalResult<T>>();

  close(result?: T): void {
    this.result.next({ id: this.id, data: result ? { ...result } : null });
    this.result.complete();
  }

  afterClosed(): Observable<TModalResult<T>> {
    return this.result.asObservable();
  }
}
