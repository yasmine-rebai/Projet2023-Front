import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup

  constructor(private Service: AuthService, private formBuilder: FormBuilder, private route: Router) { }
  ngOnInit(): void {
    this.getFormLogin()

  }
  getFormLogin() {
    this.formLogin = this.formBuilder.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onLogin() {
    this.Service.Login(this.formLogin.value).subscribe(
      (res: any) => {
        console.log(res)
        if (res.user.enabled == true) {
          Swal.fire({
            icon: 'success',
            title: 'Welcome '+res.user.username,
            imageUrl:'https://cdn1.vectorstock.com/i/thumb-large/57/10/ta-da-emoticon-vector-21205710.jpg',
            imageWidth: 238,
            imageHeight: 250,
           
          })
          if (res.user.role == 'EMPLOYER') {
            this.route.navigateByUrl('/employer-dashboard/dashboard-profile')
            localStorage.setItem('userconnect', JSON.stringify(res.user))
            localStorage.setItem('token', res.access_token)
            localStorage.setItem("state", "1")
          }
          if (res.user.role == 'CANDIDAT')
            this.route.navigateByUrl('/candidates-dashboard/candidates-profile')
          localStorage.setItem('userconnect', JSON.stringify(res.user))
          localStorage.setItem('token', res.access_token)
          localStorage.setItem("state", "1")
        }
      }, (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Error',
          text: 'username or password invalid',
        })
      }
    )
  }
}

