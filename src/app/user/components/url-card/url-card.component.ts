import { Component, Input } from '@angular/core';
import { CustomUrlResponse } from '../../../core/interfaces/customUrl.interface';

@Component({
  selector: 'app-url-card',
  standalone: true,
  imports: [],
  templateUrl: './url-card.component.html',
  styleUrl: './url-card.component.scss'
})
export class UrlCardComponent {
  @Input() urlUser!:CustomUrlResponse;

}
