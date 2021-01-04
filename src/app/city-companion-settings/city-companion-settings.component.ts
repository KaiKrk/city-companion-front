import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MemberService} from '../services/member.service';
import {Router} from '@angular/router';
import {Account} from '../models/account.model';
import {AdressModel} from '../models/adress.model';
import {TransportModel} from '../models/transport.model';
import {RegistrationModel} from '../models/registration.model';
import {AuthService} from '../services/auth.service';
import {Subscription} from 'rxjs';
import {AccountInfo} from '../models/account.info.model';

@Component({
  selector: 'app-city-companion-settings',
  templateUrl: './city-companion-settings.component.html',
  styleUrls: ['./city-companion-settings.component.scss']
})
export class CityCompanionSettingsComponent implements OnInit {

  memberForm: FormGroup;
  transport: string;
  connectedMember: RegistrationModel;
  accountInfo: AccountInfo;
  connectedMember2 = [];
  cM ;
  settingsSubscription: Subscription;
  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService,
              private authenticationService: AuthService,
              private router: Router) {}


  currentUser = this.authenticationService.currentUserValue;

  ngOnInit() {
    this.initForm();
    this.accountInfo = this.memberService.getMemberInfo(this.currentUser.id);

    this.settingsSubscription =  this.memberService.memberInfoSubject.subscribe(
      (registrationModel: RegistrationModel) => {
              console.log('RM ' + registrationModel);
              this.connectedMember = registrationModel;
    }),
    // @ts-ignore
    this.settingsSubscription =  this.memberService.memberInfoSubject2.subscribe(
      (registrationModel: any[]) => {
        this.connectedMember2 = registrationModel;
      }
    );
    console.log('value checker  ' + this.accountInfo.transport.transport);
    this.memberForm.get('surname').setValue(this.accountInfo.account.surname);
    this.memberForm.get('name').setValue(this.accountInfo.account.name);
    this.memberForm.get('email').setValue(this.accountInfo.account.email);
    this.memberForm.get('departureHour').setValue(this.accountInfo.account.departureTime);
    this.memberForm.get('homeStreetNumber').setValue(this.accountInfo.homeAddress.streetNumber);
    this.memberForm.get('homeStreetName').setValue(this.accountInfo.homeAddress.streetName);
    this.memberForm.get('city').setValue(this.accountInfo.homeAddress.city);
    this.memberForm.get('postalCode').setValue(this.accountInfo.homeAddress.postalCode);
    this.memberForm.get('workStreetNumber').setValue(this.accountInfo.workAddress.streetNumber);
    this.memberForm.get('workStreetName').setValue(this.accountInfo.workAddress.streetName);
    this.memberForm.get('workCity').setValue(this.accountInfo.workAddress.city);
    this.memberForm.get('workPostalCode').setValue(this.accountInfo.workAddress.postalCode);
    this.memberForm.get('transport').setValue(this.accountInfo.transport.transport);
    this.memberForm.get('transportLine').setValue(this.accountInfo.transport.transportLine);
    this.memberForm.get('departureStop').setValue(this.accountInfo.transport.departureStop);

  }

  onChange(event) {
    this.transport = event.target.value;
  }

  initForm() {
    this.memberForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', Validators.email],
        password: ['', Validators.required],
        departureHour: ['', Validators.required],
        homeStreetNumber: ['', Validators.required],
        homeStreetName: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        workStreetNumber: ['', Validators.required],
        workStreetName: ['', Validators.required],
        workCity: ['', Validators.required],
        workPostalCode : ['', Validators.required],
        transport: ['', Validators.required],
        transportLine: [''],
        departureStop: ['']
      }
    );
  }
  onSubmitForm() {
    const memberForm =  this.memberForm.value;
    const member: Account = {
      name: memberForm.name,
      surname: memberForm.surname,
      email:  memberForm.email,
      password: memberForm.password,
      departureTime: memberForm.departureHour
    };
    const homeAddress: AdressModel = {
      streetNumber: memberForm.homeStreetNumber,
      streetName: memberForm.homeStreetName,
      city: memberForm.city,
      postalCode: memberForm.postalCode,
      isHomeAddress: true
    };
    const workAddress: AdressModel = {
      streetNumber: memberForm.workStreetNumber,
      streetName: memberForm.workStreetName,
      city: memberForm.workCity,
      postalCode: memberForm.workPostalCode,
      isHomeAddress: false
    };
    const transport: TransportModel = {
      transport : memberForm.transport,
      transportLine: memberForm.transportLine,
      departureStop:  memberForm.departureStop
    };
    const registration: RegistrationModel = {
      account: member,
      homeAddress,
      workAddress,
      transport
    };
    console.log('form complete');
    this.memberService.updateMember(registration);
  }

}
