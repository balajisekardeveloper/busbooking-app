import { Component } from '@angular/core';
import { FormBuilder,ReactiveFormsModule,FormGroup, FormControl,Validators } from '@angular/forms';
import { Bookingservice, LoginResponse, UserData } from '../../../pages/service/bookingservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

 loginform!:FormGroup;
  username:string|null =null;
  userloggedin:boolean =true;

 constructor(private formbuilders:FormBuilder, private bookServ:Bookingservice, private route:Router){
   this.loginform = this.formbuilders.group({
  userName: ['', Validators.required],
  password: ['']
    });
 
 }

  onLogin() {
    const loginvalue = this.loginform.value;
    this.bookServ.LoginForm(loginvalue).subscribe((res: LoginResponse) => {
      if (res.result) {
        localStorage.setItem('refresh', res.data.refreshToken);
        localStorage.setItem('username', loginvalue.userName);
        this.bookServ.setUser(loginvalue.userName);
          this.bookServ.setLogin(true);
          this.username = loginvalue.userName;  
          this.userloggedin = true;             
        alert("login Success");
        this.route.navigate(['/']);
      }
      else {
        alert(res.message);
      }
    })
  }
   
}
