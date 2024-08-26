import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUrlFormComponent } from './edit-url-form.component';
import { UpdateUrl } from '../../../core/interfaces/updateUrl.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('EditUrlFormComponent', () => {

  const MockDialogRef = {
    close: (confirm?: UpdateUrl) => {}
  }

  let component: EditUrlFormComponent;
  let fixture: ComponentFixture<EditUrlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUrlFormComponent],
      providers: [
        {provide: MatDialogRef, useValue: MockDialogRef},
        {provide: MAT_DIALOG_DATA, useValue: {id: '1'}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUrlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close dialog works', () => {
    const spyClose = spyOn(MockDialogRef, 'close');

    component.closeDialog();

    expect(spyClose).toHaveBeenCalled();
  });

  it('confirmation works', () => {
    const spyClose = spyOn(MockDialogRef, 'close');

    component.longUrl = 'longUrl';
    component.customBody = 'string';

    component.confirmation();

    expect(spyClose).toHaveBeenCalledWith(
      {
        id: '1',
        longUrl: 'longUrl',
        shortURL: 'string'
      }
    );
  });

  it('clearLongUrl works correctly', () => {
    component.clearLongUrl();

    expect(component.longUrl).toEqual('');
  });
});
