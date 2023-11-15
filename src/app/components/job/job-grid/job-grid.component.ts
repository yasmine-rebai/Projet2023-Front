import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CandidatureService } from 'src/app/services/candidature.service';
import { OffreService } from 'src/app/services/offre.service';
import Swal from 'sweetalert2';

@Component({
  selector:'app-job-grid',
  templateUrl:'./job-grid.component.html',
  styleUrls: ['./job-grid.component.css']
})
export class JobGridComponent implements OnInit {
  x:any
  my:any
  type:any
  formOffer:FormGroup
  formLogin: FormGroup
  items: any 
  pageOfItems: Array<any>;
  p: number = 1
  page = 1;
  count = 0;
  pageSize =3;
  pageSizes = [3, 6, 9];
  candidature: any
  offre: any
  citys: any
  connect: boolean = true
  city: any
  categories: any
  id_city: any
  searchFilter: any = ''
  fileToUplod: Array<File> = [];
  userconnect = JSON.parse(localStorage.getItem('userconnect')!)
  state = JSON.parse(localStorage.getItem('state')!)
  LocalDate: String = new Date().toLocaleString();
  date = new Date();
  constructor(private Service: AuthService,private formBuilder:FormBuilder,private offreService:OffreService,private ar:ActivatedRoute,private router:Router,private candidatureService:CandidatureService) { }

  ngOnInit(): void {
    this.check();
    this.getAllJob();
    this.getAllCity();
    this.getAllCategorie();
    this.getFormLogin();
    console.log("datttttttttttttttttttttttttt",this.date);

    let id: any
    this.offreService.getCity(id).subscribe(data => {
      this.city = data;
    })
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
  }
  check() {
    if (this.state == "1") {
      this.connect = true
    } else {
      this.connect = false
    }
    console.log('connect', this.connect)
  }
  getAllJob() {
    this.offreService.getAlloffer().subscribe(
      (res: any) => {
        this.offre = res
        console.log("offre", this.offre)
      })
  }
  getJobSpe() {
  
    this.offreService.getAlloffer().subscribe(
      (res: any) => {
        this.offre = res.filter((element:any)=>(element.contracttype==this.type)
       )
      }
    )
  }
  getAllCity() {
    this.offreService.getAllCity().subscribe(
      (res: any) => {
        this.citys = res
        console.log("city", this.citys)
      })
  }
  getFormLogin() {
    this.formLogin = this.formBuilder.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  getAllCategorie() {
    this.offreService.getAllCategorie().subscribe(
      (res: any) => {
        this.categories = res
        console.log("categories",this.categories)
      })
  }


  OnChangeCategory(event: any) {
    
    if(event.target.checked){
      console.log("detected value category ", event.target.value)
      this.offreService.getAlloffer().subscribe(
        (res: any) => {
          this.offre = res.filter((job: any) => job.categorie.titlecategorie == event.target.value)
        })
    }
    else
    {
      this.getAllJob();
    }
  }
  OnChangeExp(event: any) {
    
    if(event.target.checked){
      console.log("detected value category ", event.target.value)
      this.offreService.getAlloffer().subscribe(
        (res: any) => {
          this.offre = res.filter((job: any) => job.experience == event.target.value)
        })
    }
    else
    {
      this.getAllJob();
    }
  }
  OnChangeType(event: any) {
    
    if(event.target.checked){
      console.log("detected value type ", event.target.value)
      this.offreService.getAlloffer().subscribe(
        (res: any) => {
          this.offre = res.filter((job: any) => job.contract_type == event.target.value)
        })
    }
    else{
      this.getAllJob();
    }
  }
  OnChangeLieu(event: any) {
    
    if(event.target.checked){
      console.log("detected value category ", event.target.value)
      this.offreService.getAlloffer().subscribe(
        (res: any) => {
          this.offre = res.filter((job: any) => job.city.admin_name == event.target.value)
        })
    }
    else
    {
      this.getAllJob();
    }
  }

  addCandidature(id_offre: any) {
   /* let formData = new FormData();
    formData.append("id_offre", this.formCandidature.value.id_offre);
    formData.append("id_candidat", this.formCandidature.value.id_candidat);*/
    this.candidatureService.addCandidature(this.candidature,id_offre,this.userconnect.id).subscribe(
      (res: any) => {
        this.candidature = res;
        console.log("candidature",this.candidature)
        Swal.fire({
          icon: 'success',
          title: 'add',
        })
        this.router.navigateByUrl('/job-grid')

      }
    )
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
handlePageChange(event: number): void {
  this.page = event;
  this.getAllJob();
}

handlePageSizeChange(event: any): void {
  this.pageSize = event.target.value;
  this.page = 1;
  this.getAllJob();
}
totalOffers() {
  let total = 0
  this.offre.forEach((element: any) =>
    total = total + 1
  )
  return total
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
          this.router.navigateByUrl('/employer-dashboard/dashboard-employer')
          localStorage.setItem('userconnect', JSON.stringify(res.user))
          localStorage.setItem('token', res.access_token)
          localStorage.setItem("state", "1")
        }
        if (res.user.role == 'CANDIDAT')
          this.router.navigateByUrl('/candidates-dashboard/candidates-manage-jobs')
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

OnChangeDate(event: any) {
    this.x=this.date.getTime()-25200;
  if(event.target.checked){
    console.log("detected value category ", event.target.value)
    this.offreService.getAlloffer().subscribe(
      (res: any) => {
        this.offre = res.filter((job: any) =>(job.datepost.getTime()<=this.x ) && this.date.getDate()> job.datepost.getDate())
        console.log("message",this.offre);
      })
  }
  else
  {
    this.getAllJob();
  }
}

}
