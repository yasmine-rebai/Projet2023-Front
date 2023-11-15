import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CandidatService } from 'src/app/services/candidat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  formLogin: FormGroup
  userconnect = JSON.parse(localStorage.getItem('userconnect')!)
  state = JSON.parse(localStorage.getItem('state')!)

  connect: boolean = true
  constructor(private router: Router, private Service: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.check()
    this.getFormLogin()
  }
  getFormLogin() {
    this.formLogin = this.formBuilder.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  check() {
    if (this.state == "1") {
      this.connect = true
    } else {
      this.connect = false
    }
    console.log('connect', this.connect)
  }
  onLogout()
   {
    Swal.fire({
      imageUrl:'http://1.bp.blogspot.com/-Y4okTm_EgaE/VpDjQIcEeZI/AAAAAAAAHc4/FkBPP_RXJL8/s1600/Bye-smiley.png',
      imageWidth: 600,
      imageHeight: 315,
    })
    localStorage.clear()
    this.router.navigateByUrl('/login')
    this.connect = false
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
            this.router.navigateByUrl('/employer-dashboard/dashboard-employer')
            localStorage.setItem('userconnect', JSON.stringify(res.user))
            localStorage.setItem('token', res.access_token)
            localStorage.setItem("state", "1")
            window.location.reload()
          }
          if (res.user.role == 'CANDIDAT')
            this.router.navigateByUrl('/candidates-dashboard/candidates-manage-jobs')
          localStorage.setItem('userconnect', JSON.stringify(res.user))
          localStorage.setItem('token', res.access_token)
          localStorage.setItem("state", "1")
          window.location.reload()
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
