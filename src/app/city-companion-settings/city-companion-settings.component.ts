import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MemberService} from '../services/member.service';
import {Router} from '@angular/router';
import {Account} from '../models/account.model';
import {AdressModel} from '../models/adress.model';
import {TransportModel} from '../models/transport.model';
import {RegistrationModel} from '../models/registration.model';

@Component({
  selector: 'app-city-companion-settings',
  templateUrl: './city-companion-settings.component.html',
  styleUrls: ['./city-companion-settings.component.scss']
})
export class CityCompanionSettingsComponent implements OnInit {

  memberForm: FormGroup;
  transport: string;
  constructor(private formBuilder: FormBuilder,
              private memberService: MemberService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
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
