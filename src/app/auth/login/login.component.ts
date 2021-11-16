import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public loginForm: FormGroup = this.fb.group({
    email:     [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ]],
    password:  ['', [ Validators.required, Validators.minLength(6) ]],
    remember: [false ]
  }); 


  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) { }


  ngOnInit(): void {
  }

  //Methods:
  login() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;  
    } 

    this.userService.login(this.loginForm.value)
        .subscribe({
          next: res => {
            //si el usuario quiere ser recordado
            if (this.loginForm.get('remember')?.value) {
              localStorage.setItem('email', this.loginForm.get('email')?.value);
            } else {
              localStorage.removeItem('email');
            }

            this.router.navigateByUrl('/');
          },

          error: err => Swal.fire('Error', err.error.msg, 'error')    
          
        }) 
  }

  
  //check fields
  invalidField( field: string ): boolean {
    if (this.loginForm.get(field)?.invalid && this.formSubmitted) {
      return true
    }
    return false;
  }


}
