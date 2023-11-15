import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OffreService } from 'src/app/services/offre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-new-job',
  templateUrl: './post-new-job.component.html',
  styleUrls: ['./post-new-job.component.css']
})
export class PostNewJobComponent implements OnInit {
  id:any
  formoffer:FormGroup
  citys: any
  categories: any
  fileToUplod: Array<File> = [];
  userconnect = JSON.parse(localStorage.getItem('userconnect')!)
  state = JSON.parse(localStorage.getItem('state')!)
  idoffer: number
  formImage: FormGroup
  Offre:any
  constructor(private ar: ActivatedRoute, private offreService: OffreService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.ar.snapshot.params['id']
    this.getAllCategorie()
    this.getOffreById()


          this.formoffer = this.formBuilder.group({
            titleoffer: ['', Validators.required],
            email: ['', Validators.required],
            datelimite: ['', Validators.required],
            duree: ['', Validators.required],
            id_category: ['', Validators.required],
            contract_type: ['', Validators.required],
            salary: ['', Validators.required],
            currency: ['', Validators.required],
            experience: ['', Validators.required],
            profil:['',Validators.required],
            skill: ['', Validators.required]
          })
  }
  FormValue(Offre:any) {
    this.formoffer.patchValue({
      titleoffer:Offre.titleoffer,
      email: Offre.email,
      datelimite:Offre.datelimite,
      duree:Offre.duree,
      id_category: Offre.id_category,
      contract_type:Offre.contract_type,
      salary: Offre.salary,
      currency: Offre.currency,
      experience:Offre.experience,
      profil:Offre.profil,
      skill:Offre.skill,

    })
  }
  updateOffer() {
    this.offreService.updateOffer(this.formoffer.value,this.id).subscribe(
      (res: any) => {
        console.log(res)
        this.Offre=res
        this.getOffreById()
        Swal.fire('Event updated','success')
      })
  }
  getOffreById() {
    this.offreService.getOffreById(this.id).subscribe(
      (res: any) => {
        this.Offre = res
        console.log("Offre", this.Offre)
      })
  }


  getAllCategorie() {
    this.offreService.getAllCategorie().subscribe(
      (res: any) => {
        this.categories = res
        console.log("categories", this.categories)
      })
  }

 
}
