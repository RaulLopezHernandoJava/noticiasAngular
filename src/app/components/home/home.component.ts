import { NoticiaService } from './../../services/noticia.service';
import { Noticia } from './../../models/noticia';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noticias:Noticia[];
  constructor(
    private noticiaService:NoticiaService
  ) { }


  ngOnInit(): void {
    this.cargarNoticias();
  }

  // Obtener todas las noticias

  cargarNoticias(){
    this.noticiaService.obtenerTodasLasNoticias()
    .subscribe(noticiasRecibidas => this.noticias = noticiasRecibidas)
  }

  // Eliminar Noticia

  borrar(noticia: Noticia): void {
    if (confirm('¿Estás seguro de que quieres eliminar la noticia ' + noticia.id)) {
      this.noticiaService.delete(noticia.id).subscribe(this.cargarNoticias.bind(this))
    }
  }

}
