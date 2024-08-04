import { NgClass } from '@angular/common';
import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { InputValidationComponent } from 'app/shared/components/input-validation/input-validation.component';

@Component({
  selector: 'ul-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  standalone: true,
  imports: [FormsModule, NgClass, InputValidationComponent],
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  @Input() options: string[] = [];
  @Input() placeholder?: string;
  @Input() label?: string;

  value: string = '';
  controlName: string = '';
  isTouched: boolean = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  constructor(@Self() @Optional() public control: NgControl) {
    this.control.valueAccessor = this;
  }

  ngOnInit(): void {
    this.controlName = this.control.name?.toString() ?? '';

    if (!this.value) {
      this.value = this.getPlaceholder();
    }
  }

  getPlaceholder(): string {
    return this.placeholder ?? 'Select ' + (this.label ?? this.controlName);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  onValueChange(): void {
    this.onChange(this.value);
  }

  onBlur(): void {
    if (this.isTouched) {
      return;
    }

    this.isTouched = true;
    this.onTouched();
  }
}
