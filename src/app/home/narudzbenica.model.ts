export interface Narudzbenica {
    id?:string,
    user?:string,
    ukupnaKolicina?: number,
    ukupnaCena?: number,
    datum?: string,
    stavke?: StavkaNarudzbenice[],
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