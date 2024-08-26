import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './core/services/AuthService/auth.service';
import { of } from 'rxjs';
import { RouterTestingModule } from "@angular/router/testing";

fdescribe('AppComponent', () => {

  const MockAuthService = {
    user: { id: 1, imageUrl: 'http://example.com/avatar.png', name: 'testuser' },
    login: () => of({
      id:'1',
      name: 'string',
      imageUrl: 'string'
    }),

  }

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: MockAuthService
        },

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'urlino-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('urlino-app');
  });

  it('should call authService.login and set authService.user if cookie exists', () => {
    const spyLogin = spyOn(MockAuthService, 'login').and.callThrough();
    spyOn(component, 'doesHttpOnlyCookieExist').and.returnValue(true);

    component.ngOnInit();

    expect(spyLogin).toHaveBeenCalled();

  });

  it('should call authService.login and not set authService.user if cookie doesnt exists', () => {
    const spyLogin = spyOn(MockAuthService, 'login').and.callThrough();
    spyOn(component, 'doesHttpOnlyCookieExist').and.returnValue(false);

    component.ngOnInit();

    expect(spyLogin).not.toHaveBeenCalled();

  });
});
