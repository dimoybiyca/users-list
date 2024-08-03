import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private isEditing: boolean = false;
  private $closeCurrentCell!: Subject<void>;

  onEditCell(): Subject<void> {
    if (this.isEditing) {
      this.closeCell();
    }

    this.isEditing = true;
    this.$closeCurrentCell = new Subject<void>();
    return this.$closeCurrentCell;
  }

  onCancelEdit(): void {
    this.isEditing = false;
    this.closeCell();
  }

  private closeCell(): void {
    if (!this.$closeCurrentCell) {
      return;
    }

    this.$closeCurrentCell.next();
    this.$closeCurrentCell.complete();
  }
}
