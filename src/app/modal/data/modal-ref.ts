import { Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export class ModalRef {
  id: string;
  data: any;
  modalType: Type<any> | null = null;

  constructor() {
    this.id = uuidv4().toString();
  }

  private result = new Subject<any>();

  close(result?: any): void {
    this.result.next({ id: this.id, data: result ? { ...result } : null });
    this.result.complete();
  }

  afterClosed(): Observable<any> {
    return this.result.asObservable();
  }
}
