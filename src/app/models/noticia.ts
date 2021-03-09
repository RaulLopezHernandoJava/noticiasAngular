export class Noticia {

  public id: number;
  public titulo: string;
  public imagen: string;
  public fecha: string;
  public textoCortoNoticia:string;
  public textoNoticia: any;
}

export const NOTICIA_VACIA = { id: 0, titulo:'', imagen:'', fecha: '', textoCortoNoticia: '',textoNoticia:''};
