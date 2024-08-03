import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IconComponent } from 'app/shared/components/icon/icon.component';

@Component({
  selector: 'ul-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class SearchInputComponent {
  @Input() initialValue = '';
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}
