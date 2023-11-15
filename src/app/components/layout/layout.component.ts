import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { EmployerService } from 'src/app/services/employer.service';
import { OffreService } from 'src/app/services/offre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  formOffer: FormGroup
  oo:any
  formLogin: FormGroup
  comments:any
  candidats:any
  employers:any
  idoffre: any
  test: boolean = false
  jobsaved: any
  favoris: any
  offers: any
  offer: any
  citys: any
  city: any
  categories: any
  id_city: any
  connect: boolean = true
  searchFilter: any = ''
  fileToUplod: Array<File> = [];
  userconnect = JSON.parse(localStorage.getItem('userconnect')!)
  state = JSON.parse(localStorage.getItem('state')!)
  constructor(private Service: AuthService, private formBuilder: FormBuilder, private route: Router,private employerService: EmployerService,private offreService: OffreService, private CandidatService: CandidatService, private ativateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.check();
    this.getAllJob();
    this.getAllCategorie();
    this.getAllcandidat();
    this.getAllSociete();
    this. getCommentaires();
    this.getFormLogin();
    
    // this.getOffreById(this.idoffre);
  //  this.check();
 
   
  }
  check() {
    if (this.state == "1") {
      this.connect = true
    } else {
      this.connect = false
    }
    console.log('connect', this.connect)
  }
  getAllSociete()
  {
    this.employerService.getAllSociete().subscribe(
      (res: any) => {
        this.employers = res
        console.log("employers", this.employers)
      })
  }
  getAllcandidat() {
    this.CandidatService.getAllCandidat().subscribe(
      (res: any) => {
        this.candidats = res
        console.log("candidats", this.candidats)
      })
  }
  deleteoffre(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.offreService.deleteOffer(id).subscribe(
          (res: any) => {
            console.log("deleted !")
            this.getAllJob();
          }
        )
        Swal.fire(
          'Deleted!',
          'Your job has been deleted.',
          'success'
        )
      }
    })
  }

  getAllJob() {
    this.offreService.getAlloffer().subscribe(
      (res: any) => {
        this.offers = res
        console.log("offers", this.offers)
      })
  }

  getAllCity() {
    this.offreService.getAllCity().subscribe(
      (res: any) => {
        this.citys = res
        console.log("city", this.citys)
      })
  }

  getAllCategorie() {
    this.offreService.getAllCategorie().subscribe(
      (res: any) => {
        this.categories = res
        console.log("categories", this.categories)
      })
  }

  getOffreById(idoffre:any) {
    this.offreService.getOffreById(idoffre).subscribe(
      (res: any) => {
        this.offer = res
        console.log("offer", this.offer)
        console.log("cccc",this.offer.idoffre)
      //this.check()
      })
  }

  addJobSaved(id: any) {
    this.CandidatService.addJobSaved(this.jobsaved, this.userconnect.iduser, id).subscribe(
      (res: any) => {
        this.jobsaved = res
        this.test=true
        console.log(res)
        Swal.fire({
          icon: 'success', text: 'Favroris'
        })

      })
  }
  // check() {
  //   this.offreService.checkFavoris(this.userconnect.iduser,this.idoffre).subscribe(
  //     (res: any) => {
  //       this.test = res
  //          console.log('test:',this.test)
  //          return this.test
  //        })
  // }
  totalOffers() {
    let total = 0
    this.offers.forEach((element: any) =>
      total = total + 1
    )
    return total
  }
  totalCompanys() {
    let total = 0
    this.employers.forEach((element: any) =>
      total = total + 1
    )
    return total
  }
  getCommentaires() {
    this.offreService.Comments().subscribe(
      (res: any) => {
        this.comments = res
        console.log("comment sent : ", this.comments)
      }
    )
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
            title: 'Welcome :D!',
          })
          if (res.user.role == 'EMPLOYER') {
            this.route.navigateByUrl('/employer-dashboard/dashboard-employer')
            localStorage.setItem('userconnect', JSON.stringify(res.user))
            localStorage.setItem('token', res.access_token)
            localStorage.setItem("state", "1")
          }
          if (res.user.role == 'CANDIDAT')
            this.route.navigateByUrl('/candidates-dashboard/candidates-manage-jobs')
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