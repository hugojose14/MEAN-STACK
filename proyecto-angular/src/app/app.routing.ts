//Rutas que tendremos en nuestra aplicación
//importo mis modulos utilizados para nuestras rutas
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
//importo mis componentes 
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';

//Defino mis rutas
const AppRoutes: Routes = [

    {path:'', component: AboutComponent},
    {path:'sobre-mi',component:AboutComponent},
    {path:'proyectos',component:ProjectsComponent},
    {path:'crear-proyecto',component: CreateComponent},
    {path:'contacto',component:ContactComponent},
    //Cuando la ruta no sea correcta que nos cargue el componente de error
    {path:'**',component: ErrorComponent}

];
//Exportando la configuracion de las rutas
export const appRoutingProviders: any[] = [];
//Cargar nuestra configuracion de rutas en el router de angular y hacer que funcione
export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes);                