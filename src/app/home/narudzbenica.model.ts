export interface Narudzbenica {
    id:string,
    userId:string,
    ukupnaKolicina: number,
    ukupnaCena: number,
    datum: Date,
    stavke: StavkaNarudzbenice[],
}

export interface StavkaNarudzbenice {
    id:string,
    knjigaId: string,
    isbn: string,
    naslov: string,
    kolicina: number,
    cena: number,
    iznos: number,
}