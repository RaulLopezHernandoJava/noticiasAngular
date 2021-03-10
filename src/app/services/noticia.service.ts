import { Noticia, NOTICIA_VACIA } from './../models/noticia';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{Observable,of} from 'rxjs';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private urlBase = 'http://localhost:3000/noticias/';
  private urlObtenerNoticiasOrdenadasPorFecha ="http://localhost:3000/noticias?_sort=fecha&_order=desc";

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http:HttpClient
  ) { }

  // Obtener todas las noticias ordenadas de la mas nueva a la mas antigua

  obtenerTodasLasNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.urlObtenerNoticiasOrdenadasPorFecha).pipe(
      catchError(this.gestionarError<Noticia[]>('obtenerTodasLasNoticias', []))
    )
  }

  // Obtener Noticia

  obtenerNoticia(id: number): Observable<Noticia> {
    return this.http.get<Noticia>(this.urlBase + id).pipe(
      catchError(this.gestionarError<Noticia>('getPorId', NOTICIA_VACIA))
    );
  }
  // Crear Noticia

  crearNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.post<Noticia>(this.urlBase, noticia, this.httpOptions).pipe(
      catchError(this.gestionarError<Noticia>('crearNoticia', NOTICIA_VACIA))
    );
  }

  //Borrar Noticia

  delete(id: number): Observable<Noticia> {
    return this.http.delete<Noticia>(this.urlBase + id, this.httpOptions).pipe(
      catchError(this.gestionarError<Noticia>('delete', NOTICIA_VACIA))
    );
  }


  //Actualizar Noticia

  put(Noticia: Noticia): Observable<Noticia> {
    return this.http.put<Noticia>(this.urlBase + Noticia.id, Noticia, this.httpOptions).pipe(
      catchError(this.gestionarError<Noticia>('put', NOTICIA_VACIA))
    );
  }



  // Gestionar los errores de todos los metodos
  gestionarError<T>(operacion: string, resultado?: T) {
    return (error: HttpErrorResponse) => {
      alert('Ha habido un error en la operación ' + operacion);
      return of(resultado as T);
    };
  }


}
