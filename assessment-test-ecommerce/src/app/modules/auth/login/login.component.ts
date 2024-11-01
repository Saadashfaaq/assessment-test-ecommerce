import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // *************** Form Variables ***************
  email = new FormControl<string>('');
  password = new FormControl<string>('');

  constructor(
    private router: Router,
  ){}

  ngOnInit(): void {}

  /**
 * Logs the user in by saving their credentials to local storage and navigating to the home page.
 *
 * This function retrieves the email and password values from the form, 
 * saves them as a JSON string in the browser's local storage under the key 'user',
 * and then redirects the user to the home page.
 *
 * @returns {void} No return value.
 */
  login(): void{
    localStorage.setItem('user', JSON.stringify({
      email: this.email.value,
      password: this.password.value,
    }));
    
    this.router.navigate(['/home'])
  }

}
