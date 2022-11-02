import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';

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

    //queryParams => fragment en plusieur routes
    //snapshot => Observable de la route defini
    this.returnUrl = this._activatedRoute.snapshot.queryParams.returnUrl;
  }

    get fc(){
      //Contains => verifie qu'une partie d'une chaine est dans un tableau
      //Controls => verifie le FormGroup valide ????
      return this.loginForm.controls;
    }

    submit(){
      this.isSubmitted = true;
      //return void => retourner rien
      if(this.loginForm.invalid) return;

      this._userService.login({email:this.fc.email.value,
        password: this.fc.password.value}).subscribe(() => {
          this._router.navigateByUrl(this.returnUrl);
        });
    }
}
