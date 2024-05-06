import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import axios from 'axios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // loginObj: Login;
  username: string = '';
  password: string = '';
  //authService: any;


  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    // this.loginObj = new Login();
  }

  onLogin() {
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
    alert("Berhasil login");
    this.router.navigate(['/dashboard']);
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