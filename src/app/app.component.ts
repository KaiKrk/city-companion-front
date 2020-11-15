import {Component} from '@angular/core';
import {faBook, faSubway} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from './services/auth.service';
import {Account} from './models/account.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentUser: Account;
  faBook = faBook;
  faSubway = faSubway;
  public isMenuCollapsed = true;

  constructor(
    private router: Router,
    private authenticationService: AuthService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  logout() {
    this.isMenuCollapsed = true;
    this.authenticationService.logout();
    this.router.navigate(['/authentication']);
  }

}
