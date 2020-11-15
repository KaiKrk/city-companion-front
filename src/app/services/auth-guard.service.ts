import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {Account} from '../models/account.model';

@Injectable()
export class AuthGuard implements CanActivate {

  currentUser: Account;

  constructor(private authService: AuthService,
              private router: Router) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.currentUser) {
      return true;
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
