import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageComponent } from './user-page.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/AuthService/auth.service';
import { UrlService } from '../../../core/services/url.service';
import { of } from 'rxjs';
import { DeleteConfirmationComponent } from '../../components/delete-confirmation/delete-confirmation.component';
import { PageEvent } from '@angular/material/paginator';

fdescribe('UserPageComponent', () => {

  const MockUrlService = {
    getUrlsByUserId: () => of(
      {
        content: [],
        totalElements: 0,

      }
    ),

    shortenCustomizedUrl: () => of(
      {
        id: 'string',
        longUrl: 'string',
        customUrl: 'string',
        customBody: 'string'
      }
    ),

    getUrlsByUserIdAndShortUrl: (num: number, url: string) => of(
      {
        content: [
          {
            id: 'string',
            longUrl: 'string',
            customUrl: 'string',
            customBody: 'string'
          }
        ],
        totalElements: 2,
        totalPages: 0
      }
    )
  }

  const MockAuthService = {
    user: {
      id: '1',
      name: 'name',
      avatarUrl: 'avatar'
    }
  }


  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPageComponent],
      providers:[
        {provide: UrlService, useValue: MockUrlService},
        {provide: AuthService, useValue: MockAuthService},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;

    matDialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shortCustomizedUrl works correctly', () => {
    const spyResetText = spyOn(component, 'resetText');

    component.longUrl = 'long';

    component.shortCustomizedUrl();

    expect(spyResetText).toHaveBeenCalled();
    expect(component.shortUrl).toEqual('http://localhost:8080/api/string');
  });

  it('changePage works correctly', () => {

    const getUrlsByUserIdSpy = spyOn(component, 'getUrlsByUserId');


      const pageEvent: PageEvent = {
          previousPageIndex: 0,
          pageIndex: 2,
          pageSize: 10,
          length: 100
      };

    component.changePage(pageEvent);

    expect(getUrlsByUserIdSpy).toHaveBeenCalledWith(2);
  });

  it('searchByShortUrl works correctly', () => {
    const spyGetUrlsByUserIdAndShortUrl = spyOn(MockUrlService, 'getUrlsByUserIdAndShortUrl');

    component.searchedUrl = 'short'

    component.searchByShortUrl();

    expect(spyGetUrlsByUserIdAndShortUrl).toHaveBeenCalled()
  })
});
