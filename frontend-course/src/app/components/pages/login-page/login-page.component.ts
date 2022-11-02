import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  constructor(private formBuilder:FormBuilder, private _userService: UserService,
    private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    });

    this.returnUrl = this._activatedRoute.snapshot.queryParams.returnUrl;
  }

    get fc(){
      //verification
      return this.loginForm.controls;
    }

    submit(){
      this.isSubmitted = true;
      if(this.loginForm.invalid) return;

      //affiche le login en alert
      // alert(`email: ${this.fc.email.value},
      // password: ${this.fc.password.value}`)

      //
    }
}
