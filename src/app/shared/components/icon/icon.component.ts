import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ul-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class IconComponent {
  @Input() size: string = '24px';
  @Input() iconName!: string;
  @Input() fill: string = 'none';
  @Input() stroke: string = '#fff';
}
