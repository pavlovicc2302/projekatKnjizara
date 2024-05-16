export interface KnjigaModel {
    id:string,
    naslov: string,
    autor:string,
    isbn: string,
    slika: string;
    opis: string;
    cena: number,
    kolicina: number,
    status: Status,
    komentari?: Komentar[],
    //userId: string
}

export enum Status{
    Dostupno,
    Nema_na_lageru,
    Na_cekanju,
    Arhivirano
}

export interface Komentar {
    id: string;
    userId: string;
    knjigaId: string;
    komentar: string;
  }