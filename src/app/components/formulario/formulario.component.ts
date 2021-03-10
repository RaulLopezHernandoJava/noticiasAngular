import { NoticiaService } from './../../services/noticia.service';
import { Noticia, NOTICIA_VACIA } from './../../models/noticia';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  validado:boolean = false;
  id:number;

  noticia:Noticia = NOTICIA_VACIA;
  constructor(
    private noticiaService:NoticiaService,
    private route: ActivatedRoute,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      console.log(this.id);
      if (this.id) {
        this.noticiaService.obtenerNoticia(this.id).subscribe(noticia => this.noticia = noticia);
      }
    });

  }

  btnAceptar(esValido:boolean):void{

    this.validado = true;

    if(!esValido){
      console.log("Hola")
      return;
    }

    if(this.id){
      this.noticiaService.put(this.noticia).subscribe(this.irAlHomeNoticias.bind(this));
    }else{
      this.noticiaService.crearNoticia(this.noticia).subscribe(this.irAlHomeNoticias.bind(this));
    }


  }

  irAlHomeNoticias() {
    this.router.navigate(['/home']);
  }

}
