import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MemberService} from '../services/member.service';
import {Account} from '../models/account.model';
import {AdressModel} from '../models/adress.model';
import {TransportModel} from '../models/transport.model';
import {RegistrationModel} from '../models/registration.model';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  memberForm: FormGroup;
  homeAdressForm: FormGroup;
  workAdressForm: FormGroup;
  transportForm: FormGroup;
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
        departureHour: ['', Validators.required]
      }
    );
    this.homeAdressForm = this.formBuilder.group(
      {
        homeStreetNumber: ['', Validators.required],
        homeStreetName: ['', Validators.required],
        homecity: ['', Validators.email],
        postalCode: ['', Validators.required],
      }
    );
    this.workAdressForm = this.formBuilder.group(
      {
        workStreetNumber: ['', Validators.required],
        workStreetName: ['', Validators.required],
        workCity: ['', Validators.required],
        workPostalCode : ['', Validators.required],
      }
    );
    this.transportForm = this.formBuilder.group(
      {
        transport: ['', Validators.required],
        transportLine: [''],
        departureStop: ['']
      }
    );
  }
  onSubmitForm() {
    const memberForm =  this.memberForm.value;
    const homeAdressForm =  this.homeAdressForm.value;
    const workAdressForm =  this.workAdressForm.value;
    const transportForm =  this.transportForm.value;
    const member: Account = {
      name: memberForm.name,
      surname: memberForm.surname,
      email:  memberForm.email,
      password: memberForm.password,
      departureHour: memberForm.departureHour
    };
    const homeAdress: AdressModel = {
      streetNumber: homeAdressForm.streetNumber,
      streetName: homeAdressForm.streetName,
      city: homeAdressForm.city,
      postalCode: homeAdressForm.postalCode,
      isHomeAdress: homeAdressForm.isHomeAdress
    };
    const workAdress: AdressModel = {
      streetNumber: workAdressForm.streetNumber,
      streetName: workAdressForm.streetName,
      city: workAdressForm.city,
      postalCode: workAdressForm.postalCode,
      isHomeAdress: workAdressForm.isHomeAdress
    };
    const transport: TransportModel = {
      transport : transportForm.transport,
      transportLine: transportForm.transportLine,
      departureStop:  transportForm.departureStop
    };
    const registration: RegistrationModel = {
      account: member,
      homeAdress,
      workAdress,
      transport
    };
    this.memberService.addMember(registration);
  }

}
