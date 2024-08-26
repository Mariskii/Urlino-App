import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { AuthService } from '../../../core/services/AuthService/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ToolbarComponent', () => {

  const MockAuthService = {
    user: { id: 1, imageUrl: 'http://example.com/avatar.png', name: 'testuser' },
    delete: () => of()
  }

  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarComponent, RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: MockAuthService
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logout works correctly', () => {
    const spyDelete = spyOn(MockAuthService, 'delete');
    const spyToggleSidenav = spyOn(component, 'toggleSidenav').and.callThrough();

    component.logout();

    expect(component).toBeTruthy();
    expect(spyDelete).toHaveBeenCalled();
  });
});
