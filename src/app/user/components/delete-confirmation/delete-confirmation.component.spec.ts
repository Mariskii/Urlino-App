import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationComponent } from './delete-confirmation.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DeleteConfirmationComponent', () => {

  const MockDialogRef = {
    close: (confirm: boolean) => {}
  }

  let component: DeleteConfirmationComponent;
  let fixture: ComponentFixture<DeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteConfirmationComponent],
      providers: [
        {provide: MatDialogRef, useValue: MockDialogRef},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close dialog works correctly', () => {
    const spyClose = spyOn(MockDialogRef, 'close');

    component.closeDialog();

    expect(spyClose).toHaveBeenCalledWith(false);
  });

  it('confirmation works correctly', () => {
    const spyClose = spyOn(MockDialogRef, 'close');

    component.confirmation();

    expect(spyClose).toHaveBeenCalledWith(true);
  });
});
