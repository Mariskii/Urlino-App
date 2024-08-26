import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlCardComponent } from './url-card.component';

describe('UrlCardComponent', () => {
  let component: UrlCardComponent;
  let fixture: ComponentFixture<UrlCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrlCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrlCardComponent);
    component = fixture.componentInstance;

    component.urlUser = {
      id: '1',
      longUrl: 'string',
      customUrl: 'string',
      customBody: 'string'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setDeleteConfirmation works correctly', () => {
    const spyDelete = spyOn(component.deleteUrl, 'emit');

    component.setDeleteConfirmation();

    expect(spyDelete).toHaveBeenCalledWith('1');
  });

  it('setEditDialog works correctly', () => {
    const spyDelete = spyOn(component.editUrl, 'emit');

    component.setEditDialog();

    expect(spyDelete).toHaveBeenCalledWith('1');
  });
});
