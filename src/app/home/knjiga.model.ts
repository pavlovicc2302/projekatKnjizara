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
    Dostupno = "Dostupno",
    Nema_na_lageru = "Nema_na_lageru",
    Na_cekanju="Na_cekanju",
    Arhivirano="Arhivirano"
}

export interface Komentar {
    id: string;
    userId: string;
    korisnik: string;
    knjigaId: string;
    komentar: string;
  }