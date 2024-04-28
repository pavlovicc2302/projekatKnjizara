import { Injectable } from '@angular/core';
import { KnjigaModel, Status } from './knjiga.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class KnjigeService {

    knjige: KnjigaModel[] = [
        {
            id: 1,
            naslov: '1984',
            autor: 'Dzorz Orvel',
            isbn: '145446641122',
            slika: 'https://upload.wikimedia.org/wikipedia/sr/0/08/1984_vv.jpg',
            opis: 'Sjajna knjiga kidaaa',
            cena: 1099,
            kolicina: 10,
            status: Status.Dostupno
        },
        {  id: 2,
            naslov: 'Autobiografija',
            autor: 'Branislav Nusic',
            isbn: '145446647122',
            slika: 'https://www.laguna.rs/_img/korice/4036/autobiografija-branislav_nusic_v.jpg',
            opis: 'Sjajna knjiga kidaaa  :)',
            cena: 1799,
            kolicina: 18,
            status: Status.Dostupno
        },
        {
            id: 4,
            naslov: '1984',
            autor: 'Dzorz Orvel',
            isbn: '145446641122',
            slika: 'https://upload.wikimedia.org/wikipedia/sr/0/08/1984_vv.jpg',
            opis: 'Sjajna knjiga kidaaa',
            cena: 1099,
            kolicina: 10,
            status: Status.Dostupno
        }
    ];

    constructor(private http: HttpClient) { }

    //Dodavanje jedne knjige u bazu
    addKnjiga(knjiga: KnjigaModel){
        return this.http.post("https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/knjige.json",
        {knjiga}
        )
    }

    //Dovlaci sve knjige koje postoje u bazi
    getKnjige(){
        return this.http.get("https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/knjige.json")
    }

    //Prolazi kroz niz knjiga i pronalazi knjigu sa zadatim id-jem. Za prikaz odabrane knjige
    getKnjiga(id: number) {
        return this.knjige.find((k) => k.id === id);
    }

}