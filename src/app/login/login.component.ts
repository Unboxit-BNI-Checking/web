import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import axios from 'axios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // loginObj: Login;
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  //authService: any;


  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    // this.loginObj = new Login();
  }

  onLogin() {

    if (this.username.trim() === '' || this.password.trim() === '') {
      // Jika ada field yang kosong, set loginError menjadi true
      this.loginError = true;
      return;
    }
    // this.http.post('/api/admins/login', this.loginObj).subscribe((res:any)=>{
    //   if(res.result){
    //     alert("Login success")
    //     this.router.navigateByUrl('/dashboard')
    //   }else{
    //     alert(res.message)
    //   }
    // })
    const data = {
      username: this.username,
      password: this.password    
    }
    axios.post('/api/admins/login', data).then(response => {
    this.authService.setToken(response.data.data.token);
    // alert("Berhasil login");
    this.router.navigate(['/dashboard']);
    },
    (error) => {
      this.loginError = true;
    })
  }
}

// export class Login {
//   username: string;
//   password: string;
//   constructor() {
//     this.username = '';
//     this.password = '';
//   }
// }