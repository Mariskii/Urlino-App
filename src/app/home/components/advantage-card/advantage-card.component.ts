import { Component, Input } from '@angular/core';
import { Advantage } from '../../../core/interfaces/advantage.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-advantage-card',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './advantage-card.component.html',
  styleUrl: './advantage-card.component.scss'
})
export class AdvantageCardComponent {
  @Input() advantage!: Advantage;
}
