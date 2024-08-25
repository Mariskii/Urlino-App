import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isLogedGuard } from './is-loged.guard';

describe('isLogedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isLogedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
