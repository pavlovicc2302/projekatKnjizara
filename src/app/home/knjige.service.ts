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
      `https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/knjige.json?auth=${this.authService.getToken()}`,
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
    return this.http
      .get<{[key: string]: KnjigaModel}>(
        `https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/knjige.json?auth=${this.authService.getToken()}`)
      .pipe(map((knjigeData: any) => {
          const knjige: KnjigaModel[] = [];
          for (const key in knjigeData) {
            const knjigaData = knjigeData[key];
            if (knjigaData.status.toLowerCase() === Status[Status.Dostupno].toLowerCase()) {
              knjige.push({
                id: key,
                autor: knjigaData.autor,
                naslov: knjigaData.naslov,
                isbn: knjigaData.isbn,
                slika: knjigaData.slika,
                opis: knjigaData.opis,
                cena: knjigaData.cena,
                kolicina: knjigaData.kolicina,
                status: knjigaData.status,
              });
            }
          }
          this._knjige.next(knjige);
          return knjige;
        })
      );
  }

  getKnjiga(id: string){
    return this.http
      .get(
        `https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/knjige/${id}.json?auth=${this.authService.getToken()}`
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

  promeniStatusKnjige(id: string, status: Status) {
    const knjiga = this._knjige.value.find(k => k.id === id);
    if (!knjiga) {
      console.error('Knjiga nije pronađena.');
      return null;
    }
    knjiga.status = status; // Promeni status na "Arhivirano"
    return this.http.patch(
      `https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/knjige/${id}.json?auth=${this.authService.getToken()}`,
      { status: Status[Status.Arhivirano] } // Ažuriraj status u Firebase bazi
    ).pipe(
      tap(() => {
        // Emituj ažuriranu listu knjiga
        this._knjige.next([...this._knjige.value]);
      })
    );
  }
}
