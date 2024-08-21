import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomUrlResponse } from '../../../core/interfaces/customUrl.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-url-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './url-card.component.html',
  styleUrl: './url-card.component.scss'
})
export class UrlCardComponent {
  @Input() urlUser!:CustomUrlResponse;
  @Output() deleteUrl = new EventEmitter<string>();


  setDeleteConfirmation() {
    this.deleteUrl.emit(this.urlUser.id);
  }
}
