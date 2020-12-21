import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MemberFormComponent} from './account-form/member-form.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClient} from '@angular/common/http';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MemberService} from './services/member.service';
import {AuthService} from './services/auth.service';
import {WelcomeComponent} from './welcome/welcome.component';
import {AuthGuard} from './services/auth-guard.service';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import { CityCompanionDashboardComponent } from './city-companion-dashboard/city-companion-dashboard.component';
import { CityCompanionSettingsComponent } from './city-companion-settings/city-companion-settings.component';
import {DashboardService} from './services/dashboard.service';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'memberForm', component: MemberFormComponent},
  {path: 'authentication', component: AuthenticationComponent},
  {path: 'dashboard', canActivate: [AuthGuard], component: CityCompanionDashboardComponent},
  {path: 'settings', canActivate: [AuthGuard], component: CityCompanionSettingsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MemberFormComponent,
    AuthenticationComponent,
    WelcomeComponent,
    CityCompanionDashboardComponent,
    CityCompanionSettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    FontAwesomeModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    NgbCollapseModule,
    ReactiveFormsModule,
  ],
  providers: [ MemberService, , AuthService, AuthGuard, DashboardService,
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
