import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm: FormGroup = this.fb.group({
    name:      ['', [ Validators.required, Validators.minLength(3) ]],
    lastName:  ['', [ Validators.required, Validators.minLength(3) ]],
    email:     ['', [ Validators.required, Validators.email ]],
    password:  ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required, Validators.minLength(6) ]],
    terms:     [ false, [ Validators.requiredTrue ]]
  },  
  {
    validators: this.passwordsMatch('password', 'password2')
  }); 

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }


  //Methods:
  //register
  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;  
    } 

    this.userService.createUser(this.registerForm.value)
        .subscribe({
          next: res => this.router.navigateByUrl('/')  ,
          error: err => Swal.fire('Error', err.error.msg, 'error')           
        });
    
  }

  //check fields
  invalidField( field: string ): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true
    }
    return false;
  }

  //check passwords match
  invalidPasswords() {
    const password = this.registerForm.get('password')?.value;
    const password2 = this.registerForm.get('password2')?.value;

    if ((password !== password2) && this.formSubmitted ) {
      return true;
    }
    return false;
  }

  //para que el form reactivo detecte si los passwords son iguales y funcione con el Validators
  passwordsMatch(password: string, password2: string) {
    //instancia de FormGroup, para obtener acceso a los controles del formulario
    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(password);
      const pass2Control = formGroup.get(password2);

      if ( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null);

      } else {
        pass2Control?.setErrors({ notMatching: true });

      }
    }
  }


}
