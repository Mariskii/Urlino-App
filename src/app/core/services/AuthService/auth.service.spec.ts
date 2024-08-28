import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
      ],
    }).compileComponents();

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('logout works correctly', () => {
    service.delete();

    expect(service.user).toBe(undefined);
  });

  it('login works correctly', () => {

    const userResp = {
      id:'21413',
      login: 'User',
      avatar_url:'url'
    }

    service.login().subscribe((res) => {

      expect(res).toEqual(userResp);
    })

    const req = httpMock.expectOne('http://localhost:8080/auth/user');

    expect(req.request.method).toBe('GET');

    req.flush(userResp);

  });
});
