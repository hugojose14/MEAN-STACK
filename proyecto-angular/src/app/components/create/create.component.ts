import { Component, OnInit } from '@angular/core';
//importo mi modulo y mis servicios
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  //Cargo mi servicio
  //Cargo el objeto ProjectService
  providers:[ProjectService]
})
export class CreateComponent implements OnInit {

    public title: string;
    //Este será el objeto que modificará el formulario 
    public project: Project;
    public status:string;
    constructor(
      //un objeto de tipo
      private  _projectService: ProjectService

    ) {
      //objeto a esas propiedades
      this.title = "Crear proyecto";
      //project va a ser una instancia de Project
      this.project = new Project('','','','',2019,'','');
     }

    ngOnInit() {
    }

    onSubmit(form:any){
      console.log(this.project);
      //el metodo suscribe, me permite recoger lo que me devuelva el api rest y suscribirme  al observale
      this._projectService.saveProject(this.project).subscribe(
        response =>{
          //Si me llega esto 
          if(response.project){
            this.status = 'success';
            //vaciar el formulario
            form.reset();
          }else{
            this.status = 'failed';
          }
        },
        error =>{
          console.log(<any>error);
        }
      );
    }
}
