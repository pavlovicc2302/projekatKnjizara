import { Injectable } from '@angular/core';
import { KnjigaModel } from './knjiga.model';


@Injectable({
    providedIn: 'root'
})
export class KnjigeService {

    knjige: KnjigaModel[] = [
        {
            id: 1,
            naslov: '1984',
            autor: 'Dzorz Orvel',
            isbn: 145446641122,
            slika: 'https://upload.wikimedia.org/wikipedia/sr/0/08/1984_vv.jpg',
            opis: 'Sjajna knjiga kidaaa',
            cena: 1099,
            kolicina: 10
        },
        {  id: 2,
            naslov: 'Autobiografija',
            autor: 'Branislav Nusic',
            isbn: 145446647122,
            slika: 'https://www.laguna.rs/_img/korice/4036/autobiografija-branislav_nusic_v.jpg',
            opis: 'Sjajna knjiga kidaaa  :)',
            cena: 1799,
            kolicina: 18
        },
        {
            id: 4,
            naslov: '1984',
            autor: 'Dzorz Orvel',
            isbn: 145446641122,
            slika: 'https://upload.wikimedia.org/wikipedia/sr/0/08/1984_vv.jpg',
            opis: 'Sjajna knjiga kidaaa',
            cena: 1099,
            kolicina: 10
        }
    ];

    constructor() { }

    getKnjige(id: number) {
        return this.knjige.find((k) => k.id === id);
    }

}