import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FireBaseServiceService } from 'src/app/fire-base-service.service';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.css']
})
export class TalkComponent implements OnInit {
  addTalks: FormGroup;
  items: any[] = [];
  //items: Observable<any[]>

  constructor(
    private toastr: ToastrService, 
    private router: Router,
    //firebase: AngularFirestore,
    private fb:FormBuilder,
    private _fire_base_service: FireBaseServiceService
    ) 
    {
      this.addTalks = this.addTalks = this.fb.group({
        title: ['', Validators.required],
        descript: ['', Validators.required]
      });

      //this.items = firebase.collection('agenda').valueChanges();
    }

  ngOnInit(): void {
    this.Details();
  }

  //add
  showAdd() {
    if(this.addTalks.status != "INVALID"){
      const frm : any = {
        title: this.addTalks.value.title,
        descript: this.addTalks.value.descript,
        create: new Date().getDate() + '-' + (new Date().getMonth()+1) + '-' + new Date().getFullYear()
      }

      this.addTalks.setValue({
        title:'',
        descript:''
      }) 

      this._fire_base_service.add(frm).then(()=>{
        this.toastr.success(
          'Tarea agregada correctamente.'
        )
      }).catch(error =>{
        this.toastr.error(
          'Tarea no se agrego correctamente.'
        );
      })
    }
    else {
      this.toastr.error(
        'Todos los campos de la nueva tarea deben estar completos.'
      );
    }
  }

  //Method
  Details(){
    this._fire_base_service.gettalk().subscribe(data => {
      this.items = [];
      data.forEach((element: any) => {
        this.items.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }
  Update(item: any): void{
    this.router.navigate(['/talk/update/'+item]);
    this.toastr.warning(
      'Actualizando tarea.'
    );
  }
  Delete(item: any): void{
    this._fire_base_service.delete(item).then(()=> {
      this.toastr.success(
        'Tarea eliminada correctamente.'
      );
    }).catch(error => {
      this.toastr.error(
        'Tarea no se eliminada correctamente.'
      );
    })
  }

}
