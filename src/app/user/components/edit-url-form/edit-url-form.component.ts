import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { CustomUrlResponse } from '../../../core/interfaces/customUrl.interface';
import { FormsModule } from '@angular/forms';
import { UpdateUrl } from '../../../core/interfaces/updateUrl.interface';

@Component({
  selector: 'app-edit-url-form',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './edit-url-form.component.html',
  styleUrl: './edit-url-form.component.scss'
})
export class EditUrlFormComponent implements OnInit {

  longUrl?: string;
  customBody?: string;

  constructor(
    public dialog: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public url: CustomUrlResponse) { }

  ngOnInit(): void {
    this.longUrl = this.url.longUrl
    this.customBody = this.url.customBody
  }

  closeDialog(): void {
    this.dialog.close();
  }

  confirmation(): void {

    let updateUrl = undefined;

    if(((this.longUrl != this.url.longUrl) || (this.customBody != this.url.customBody)) && (this.longUrl)) {
      updateUrl = {
        id: this.url.id,
        longUrl: this.longUrl,
        shortURL: this.customBody
      }
    }

    this.dialog.close(updateUrl);
  }

  clearLongUrl() {
    this.longUrl = '';
  }
}
