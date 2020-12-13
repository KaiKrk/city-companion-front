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

@Component({
  selector: 'app-city-companion-settings',
  templateUrl: './city-companion-settings.component.html',
  styleUrls: ['./city-companion-settings.component.scss']
})
export class CityCompanionSettingsComponent implements OnInit {

  memberForm: FormGroup;
  transport: string;
  connectedMember: RegistrationModel;
  settingsSubscription: Subscription;
  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService,
              private authenticationService: AuthService,
              private router: Router) {}


  currentUser = this.authenticationService.currentUserValue;

  ngOnInit(): void {
    this.initForm();
    this.memberService.getMemberInfo(this.currentUser.id);
    this.settingsSubscription = this.memberService.memberInfoSubject.subscribe(
      (registrationModel: RegistrationModel) => {
              this.connectedMember = registrationModel;
    }
    );
    this.memberForm.get('id').setValue(this.connectedMember.account.id);
    this.memberForm.get('surname').setValue(this.connectedMember.account.surname);
    this.memberForm.get('name').setValue(this.connectedMember.account.name);
    this.memberForm.get('email').setValue(this.connectedMember.account.email);
    this.memberForm.get('departureHour').setValue(this.connectedMember.account.departureTime);
    this.memberForm.get('homeStreetNumber').setValue(this.connectedMember.homeAddress.streetNumber);
    this.memberForm.get('homeStreetName').setValue(this.connectedMember.homeAddress.streetName);
    this.memberForm.get('city').setValue(this.connectedMember.homeAddress.city);
    this.memberForm.get('homePostalCode').setValue(this.connectedMember.homeAddress.postalCode);
    this.memberForm.get('workStreetNumber').setValue(this.connectedMember.workAddress.streetNumber);
    this.memberForm.get('workStreetName').setValue(this.connectedMember.workAddress.streetName);
    this.memberForm.get('workCity').setValue(this.connectedMember.workAddress.city);
    this.memberForm.get('workPostalCode').setValue(this.connectedMember.workAddress.postalCode);
    this.memberForm.get('transport').setValue(this.connectedMember.transport.transport);
    this.memberForm.get('transportLine').setValue(this.connectedMember.transport.transportLine);
    this.memberForm.get('departureStop').setValue(this.connectedMember.transport.departureStop);

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
