import { NOTICIA_VACIA, Noticia } from './../../models/noticia';
import { NoticiaService } from './../../services/noticia.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.component.html',
  styleUrls: ['./detalle-noticia.component.css']
})
export class DetalleNoticiaComponent implements OnInit {

  noticia: Noticia = NOTICIA_VACIA
  id: number;

  constructor(
    private noticiaService: NoticiaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      console.log(this.id);
      if (this.id) {
        this.noticiaService.obtenerNoticia(this.id).subscribe(noticia => this.noticia = noticia)
      }
    });

  }
}


