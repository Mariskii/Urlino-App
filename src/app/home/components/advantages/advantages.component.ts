import { Component } from '@angular/core';
import { Advantage } from '../../../core/interfaces/advantage.interface';
import { advantageItems } from '../../config/advantages.items';
import { AdvantageCardComponent } from '../advantage-card/advantage-card.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-advantages',
  standalone: true,
  imports: [
    AdvantageCardComponent,
    TranslateModule,
  ],
  templateUrl: './advantages.component.html',
  styleUrl: './advantages.component.scss'
})
export class AdvantagesComponent {
  advantagCardItems:Advantage[] = advantageItems;
}
