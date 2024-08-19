import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShorternUrlComponent } from './shortern-url.component';

describe('ShorternUrlComponent', () => {
  let component: ShorternUrlComponent;
  let fixture: ComponentFixture<ShorternUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShorternUrlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShorternUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
