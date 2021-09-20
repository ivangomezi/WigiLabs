import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FireBaseServiceService } from 'src/app/fire-base-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = {
    name: ''
  }
  addMail: FormGroup;
  constructor(private toastr: ToastrService, 
    private router: Router,
    private fb:FormBuilder,
    private _fire_base_service: FireBaseServiceService) { 

      this.addMail = this.addMail = this.fb.group({
        names: ['', Validators.required],
        last: ['', Validators.required],
        number: ['', Validators.required],
        mail: ['', Validators.required],
        descript: ['', Validators.required]
      });
    }

  ngOnInit(): void {

  }

  //add
  showAdd() {
    if(this.addMail.status != "INVALID"){
      console.log(this.addMail.status)
      const frm : any = {
        names: this.addMail.value.names,
        last: this.addMail.value.last,
        number: this.addMail.value.number,
        mail: this.addMail.value.mail,
        descript: this.addMail.value.descript,
        create: new Date().getDate() + '-' + (new Date().getMonth()+1) + '-' + new Date().getFullYear()
      }

      this.addMail.setValue({
        names: '',
        last: '',
        number: '',
        mail: '',
        descript: ''
      }) 

      this._fire_base_service.addMail(frm).then(()=>{
        this.toastr.success(
          'Correo fue enviado correctamente.'
        )
      })
    }
    else {
      this.toastr.error(
        'Todos los campos del formulario de contacto deben estar completos.'
      );
    }
  }

  chat(){
    if(this.user.name != '') {
      this.router.navigate(['/home/chat/' + this.user.name]);
    }
    else {
      this.toastr.warning(
        'Por favor digita tu nombre o alias para poder inicar el chat.'
      );
    }
  }

}
