import { Component, Input } from '@angular/core';
import { Advantage } from '../../../core/interfaces/advantage.interface';

@Component({
  selector: 'app-advantage-card',
  standalone: true,
  imports: [],
  templateUrl: './advantage-card.component.html',
  styleUrl: './advantage-card.component.scss'
})
export class AdvantageCardComponent {
  @Input() advantage!: Advantage;
}
