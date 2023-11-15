import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { CandidatureService } from 'src/app/services/candidature.service';
import { OffreService } from 'src/app/services/offre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  my:any
  v:any
  offer: any
  score_candidature:any
  comments: any
  jobsaved: any
  test: boolean = false
  id = this.ativateRoute.snapshot.params['id']
  formOffer: FormGroup
  formcomment: FormGroup
  formLogin:FormGroup
  candidature: any
  candidatures: any
  b:any
  connect:boolean=false
  applied: boolean = false
  userconnect = JSON.parse(localStorage.getItem('userconnect')!)
  state = JSON.parse(localStorage.getItem('state')!)
  LocalDate: String = new Date().toLocaleString();
  date = new Date();
  constructor(private router: Router,private Service: AuthService,private formBuilder: FormBuilder, private offerService: OffreService, private ativateRoute: ActivatedRoute, private candidatureService: CandidatureService, private CandidatService: CandidatService) { }

  ngOnInit(): void {
    this.verif()
    this.getCommentaires()
    this.getOffreById()
    this.check()
    this.apply()
    this.getformcomment()
    this.getFormLogin()
    //this.my=this.result()
   // this.voir()
  }
getformcomment()
{
  this.formcomment = this.formBuilder.group({
    sujet: ['', Validators.required]
  })
}
getFormLogin() {
  this.formLogin = this.formBuilder.group({
    id: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
}
exprire()
{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'this offer is not available !',
  })
}
  verif() {
    if (this.state == 1) {
      this.connect = true
    }
    console.log('connect', this.connect)
  }
  getOffreById() {
    this.offerService.getOffreById(this.id).subscribe(
      (res: any) => {
        this.offer = res
        console.log("offer", this.offer)
      })
  }
voir(){
  this.offerService.getOffreById(1).subscribe(
    (res: any) => {
      this.offer = res
    this.v= this.my-res.datepost
      console.log("v=", this.v)
    })
}
   score(id:any){
    let formData = new FormData()
    formData.append("idcandidature", id);
    this.candidatureService.Score(formData).subscribe(
      (res:any)=>{
        this.score_candidature=res
        console.log('Score',res)
        console.log(this.score_candidature.score)
      }
    )
  return this.score_candidature
  }
  saveCandidature() {
    this.candidatureService.addCandidature(this.candidature, this.userconnect.iduser, this.offer.idoffre).subscribe(
      (res: any) => {
        this.candidature = res
        this.applied = true
        this.score(this.candidature.id)
        console.log('i applied for this job')
        Swal.fire({
          icon: 'success',
          text: ' Applied Job'
        })
        this.apply()
      }
    )
  }
  apply() {
    this.candidatureService.getAllCandidature().subscribe(
      (res: any) => {
        this.candidatures = res
        console.log("les candidatures de ce user", this.candidatures)
        this.candidatures.forEach((candidature: any) => {
          if (candidature.offre.idoffre == this.id && this.userconnect.iduser == candidature.candidat.iduser) {
            this.applied = true
          }
        }
        )
        console.log('Applied :', this.applied)
      }
    )
  }
  addJobSaved(id: any) {
    this.CandidatService.addJobSaved(this.jobsaved, this.userconnect.iduser, id).subscribe(
      (res: any) => {
        this.jobsaved = res
        this.test = true
        console.log(res)
        Swal.fire({
          icon: 'success', text: 'Favroris'
        })

      })
  }
  check() {
    this.offerService.checkFavoris(this.userconnect.iduser, this.id).subscribe(
      (res: any) => {
        this.test = res
        console.log('test:', this.test)
        return this.test
      })
  }

  addCommentaire() {
    this.offerService.addComment(this.formcomment.value, this.userconnect.iduser, this.id).subscribe(
      (res: any) => {
        console.log("comment sent : ", res)
        Swal.fire({
          icon: 'success',
          text: 'Comment :D'
        })
        this.getCommentaires()
      }
    )
  }

  getCommentaires() {
    this.offerService.Comments().subscribe(
      (res: any) => {
        this.comments = res.filter((elem:any)=>elem.offre.idoffre==this.id)
        console.log("comment sent : ", this.comments)
      }
    )
  }
  onLogout() {
    Swal.fire('Logout !!')
    localStorage.clear()
    this.router.navigateByUrl('/login')
    this.connect=false
  }
  onLogin() {
    this.Service.Login(this.formLogin.value).subscribe(
      (res: any) => {
        console.log(res)
        if (res.user.enabled === true) {
          this.connect=true 
          Swal.fire({
            icon: 'success',
            title: 'Welcome :D!',
          })
          this.router.navigateByUrl('/')
          localStorage.setItem('userconnect', JSON.stringify(res.user))
          localStorage.setItem('token', res.access_token)
          localStorage.setItem("state", "1")
          window.location.reload()
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Error',
            text: 'username or password invalid',
          })
        }
      }
    )
  }
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth()+1),
        this.padTo2Digits(date.getDate()),
      ].join('-') 
    
    );

  }
  result() {

    const result = this.formatDate(new Date());
    console.log(result);
    return result //  👉️ "2022-03-07 16:10:22
  }
}
