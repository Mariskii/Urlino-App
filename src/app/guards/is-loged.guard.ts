import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/AuthService/auth.service';

export const isLogedGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const isLogged = authService.user? true: false;


  if (!isLogged) {
    router.navigate(['./home']);
  }

  return isLogged;
};
