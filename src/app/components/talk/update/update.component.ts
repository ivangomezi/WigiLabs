import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FireBaseServiceService } from 'src/app/fire-base-service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  
  addTalks: FormGroup;
  items: any[] = [];

  constructor(
    private toastr: ToastrService, 
    private router: Router,
    private fb:FormBuilder,
    private _fire_base_service: FireBaseServiceService,
    private activated: ActivatedRoute
  ){

    this.addTalks = this.addTalks = this.fb.group({
      title: ['', Validators.required],
      descript: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.Details();

    console.log(this.items)
  }

  save(){
    const frm : any = {
      title: this.addTalks.value.title,
      descript: this.addTalks.value.descript
    }

    const id = this.activated.snapshot.params.id;
    this._fire_base_service.update(id, frm).then(()=>{
      this.toastr.success("Tarea se actualizo correctamente.")
      this.router.navigate(['/talk'])
    })
  }

  Details(){
    const id = this.activated.snapshot.params.id;
    this._fire_base_service.gettalkid(id).subscribe(data => {
      if( data.payload.data() != undefined){
        this.addTalks.setValue({
          title:data.payload.data()['title'],
          descript:data.payload.data()['descript']
        })    
      }
      else {
        this.router.navigate(['/talk'])
      }
    })
  }

}
