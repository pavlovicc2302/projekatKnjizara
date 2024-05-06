import { Injectable } from '@angular/core';
import { KnjigaModel, Status } from './knjiga.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class KnjigeService {

  private _knjige = new BehaviorSubject<KnjigaModel[]>([])

  // knjige:  KnjigaModel[] = [
  //   {
  //     id: "1",
  //     naslov: '1984',
  //     autor: 'Dzorz Orvel',
  //     isbn: '145446641122',
  //     slika: 'https://upload.wikimedia.org/wikipedia/sr/0/08/1984_vv.jpg',
  //     opis: 'Sjajna knjiga kidaaa',
  //     cena: 1099,
  //     kolicina: 10,
  //     status: Status.Dostupno,
  //     //userId: '1'
  //   },
  //   {
  //     id: "2",
  //     naslov: 'Autobiografija Branislava Nusica',
  //     autor: 'Branislav Nusic',
  //     isbn: '145446641122',
  //     slika: 'https://www.laguna.rs/_img/korice/4036/autobiografija-branislav_nusic_v.jpg',
  //     opis: 'Odlicna',
  //     cena: 1099,
  //     kolicina: 10,
  //     status: Status.Dostupno,
  //     //userId: '1'
  //   },
  // ]

  get knjige(){
    return this._knjige.asObservable();
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  addKnjiga(naslov: string ,autor:string, isbn: string,
    slika: string,opis: string,cena: number,kolicina: number, status: Status,
   // userId: string
  ) {
    let generatedId;
    return this.http.post<{name: string}>(
      `https://mrsr-5cfd1-default-rtdb.europe-west1.firebasedatabase.app/knjige.json?auth=${this.authService.getToken()}`,
      { naslov, autor, isbn, slika, opis, cena, kolicina, status //,userId
      
      }
    ).pipe(
      switchMap((resData) => {
        generatedId = resData.name;
        return this.knjige;
      }),
      take(1),
      tap((knjige) => {
        this._knjige.next(
          knjige.concat({
            id: generatedId,
            naslov, autor, isbn, slika, opis, cena, kolicina, status //,userId
          })
        )
      })
    );
  }

   //Dovlaci sve knjige koje postoje u bazi
   getKnjige() {
    //console.log(this.authService.getUserId())
    return this.http
      .get<{[key: string]: KnjigaModel}>(
        `https://mrsr-5cfd1-default-rtdb.europe-west1.firebasedatabase.app/knjige.json?auth=${this.authService.getToken()}`)
      .pipe(map((knjigeData: any) => {
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
              //userId: knjigeData[key].userId,
            });
          }
          console.log(knjige)
          this._knjige.next(knjige);
          return knjige;
        })
      );
  }

  getKnjiga(id: string){
    return this.http
      .get(
        `https://mrsr-5cfd1-default-rtdb.europe-west1.firebasedatabase.app/knjige/${id}.json?auth=${this.authService.getToken()}`
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
            //userId: resData.userId
          };
        })
      );
  }

  // getKnjiga(id: string) {
  //   return this.knjige.find((k) => k.id === id);
  // }
}
