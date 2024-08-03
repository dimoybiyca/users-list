import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellSelectComponent } from './table-cell-select.component';

describe('TableCellSelectComponent', () => {
  let component: TableCellSelectComponent;
  let fixture: ComponentFixture<TableCellSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCellSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableCellSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
