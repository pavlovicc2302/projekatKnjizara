import { Injectable } from '@angular/core';
import { KnjigaModel, Status } from './knjiga.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class KnjigeService {
  knjige: KnjigaModel[] = [
    {
      id: '1',
      naslov: '1984',
      autor: 'Dzorz Orvel',
      isbn: '145446641122',
      slika: 'https://upload.wikimedia.org/wikipedia/sr/0/08/1984_vv.jpg',
      opis: 'Sjajna knjiga kidaaa',
      cena: 1099,
      kolicina: 10,
      status: Status.Dostupno,
      userId: '1'
    },
    {
      id: '2',
      naslov: 'Autobiografija',
      autor: 'Branislav Nusic',
      isbn: '145446647122',
      slika:
        'https://www.laguna.rs/_img/korice/4036/autobiografija-branislav_nusic_v.jpg',
      opis: 'Sjajna knjiga kidaaa  :)',
      cena: 1799,
      kolicina: 18,
      status: Status.Dostupno,
      userId: '1'
    },
    {
      id: '4',
      naslov: '1984',
      autor: 'Dzorz Orvel',
      isbn: '145446641122',
      slika: 'https://upload.wikimedia.org/wikipedia/sr/0/08/1984_vv.jpg',
      opis: 'Sjajna knjiga kidaaa',
      cena: 1099,
      kolicina: 10,
      status: Status.Dostupno,
      userId: '1'
    },
  ];

  constructor(private http: HttpClient, private authService: AuthService) {}

  //Dodavanje jedne knjige u bazu
  addKnjiga(naslov: string,autor:string,isbn: string,slika: string,opis: string,cena: number,kolicina: number,status: Status,
    userId: string) {
    return this.http.post(
      `https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/knjige.json?${this.authService.getToken()}`,
      { naslov,autor,isbn,slika,opis,cena,kolicina,status,userId}
    );
  }

  //Dovlaci sve knjige koje postoje u bazi
  getKnjige() {
    console.log(this.authService.getUserId())
    return this.http
      .get<{[key: string]: KnjigaModel}>(
        `https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/knjige.json?${this.authService.getToken()}`
      )
      .pipe(
        map((knjigeData: any) => {
          console.log(knjigeData);

          const knjige: KnjigaModel[] = [];
          for (const key in knjigeData) {
            knjige.push({
              id: key,
              autor: knjigeData[key].autor,
              naslov: knjigeData[key].naslov,
              isbn: knjigeData[key].isbn,
              slika: knjigeData[key].slika,
              opis: knjigeData[key].opis,
              cena: knjigeData[key].cena,
              kolicina: knjigeData[key].kolicina,
              status: knjigeData[key].status,
              userId: knjigeData[key].userId,
            });
          }
          return knjige;
        })
      );
  }

  getKnjiga(id: string) {
    return this.http
      .get(
        `https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/knjige/${id}.json?${this.authService.getToken()}`
      )
      .pipe(
        map((resData: any) => {
          console.log(resData);
          return {
            id,
            autor: resData.autor,
            naslov: resData.naslov,
            isbn: resData.isbn,
            slika: resData.slika,
            opis: resData.opis,
            cena: resData.cena,
            kolicina: resData.kolicina,
            status: resData.status,
            userId: resData.userId
          };
        })
      );
  }

  //Prolazi kroz niz knjiga i pronalazi knjigu sa zadatim id-jem. Za prikaz odabrane knjige
  //   getKnjiga(id: string) {
  //    return this.knjige.find((k) => k.id === id);
  // }
}
