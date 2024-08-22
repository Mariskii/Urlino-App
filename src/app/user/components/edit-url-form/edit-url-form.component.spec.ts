import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUrlFormComponent } from './edit-url-form.component';

describe('EditUrlFormComponent', () => {
  let component: EditUrlFormComponent;
  let fixture: ComponentFixture<EditUrlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUrlFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUrlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
