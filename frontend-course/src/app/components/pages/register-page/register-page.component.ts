import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;
  isSubmitted = false;

  returnUrl = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name:['', [Validators.required, Validators.minLength(5)]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(5)]],
      confirmPassword:['', Validators.required],
      address:['', [Validators.required, Validators.minLength(10)]]
    },{
      validators: PasswordsMatchValidator('password', 'confirmPassword')
    });

    this.returnUrl= this._activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const fv= this.registerForm.value;
    const user :IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address
    };

    this._userService.register(user).subscribe(_ => {
      this._router.navigateByUrl(this.returnUrl);
    })
  }
}
