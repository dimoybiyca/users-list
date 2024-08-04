import { NgClass } from '@angular/common';
import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { InputValidationComponent } from 'app/shared/components/input-validation/input-validation.component';
import { TInputType } from 'app/shared/types/input-type.type';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'ul-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
  imports: [FormsModule, InputValidationComponent, NgClass, NgxMaskDirective],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() type: TInputType = 'text';
  @Input() placeholder?: string;
  @Input() label?: string;
  @Input() mask?: string;

  value: string = '';
  controlName: string = '';
  isTouched: boolean = false;

  constructor(@Self() @Optional() public control: NgControl) {
    this.control.valueAccessor = this;
  }

  ngOnInit(): void {
    this.controlName = this.control.name?.toString() ?? '';
  }

  onChange = (value: string) => {};
  onTouched = () => {};

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
