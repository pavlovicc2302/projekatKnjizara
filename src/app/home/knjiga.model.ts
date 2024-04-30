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
    userId: string
}

export enum Status{
    Dostupno,
    Nema_na_lageru,
    Na_cekanju,
    Arhivirano
}
