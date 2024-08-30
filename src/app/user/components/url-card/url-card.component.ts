import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomUrlResponse } from '../../../core/interfaces/customUrl.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-url-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    ClipboardModule,
  ],
  templateUrl: './url-card.component.html',
  styleUrl: './url-card.component.scss'
})
export class UrlCardComponent {
  @Input() urlUser!:CustomUrlResponse;
  @Output() deleteUrl = new EventEmitter<string>();
  @Output() editUrl = new EventEmitter<string>();


  setDeleteConfirmation() {
    this.deleteUrl.emit(this.urlUser.id);
  }

  setEditDialog() {
    this.editUrl.emit(this.urlUser.id);
  }

  getShortUrl() {
    return `${environment.API_URL}/api/${this.urlUser.customUrl}`
  }
}
