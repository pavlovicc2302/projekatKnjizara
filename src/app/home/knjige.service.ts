import { Injectable } from '@angular/core';
import { KnjigaModel, Status } from './knjiga.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class KnjigeService {

  private _knjige = new BehaviorSubject<KnjigaModel[]>([]);

  get knjige() {
    return this._knjige.asObservable();
  }

  constructor(private http: HttpClient, private authService: AuthService) { }

  addKnjiga(naslov: string, autor: string, isbn: string, slika: string, opis: string, cena: number, kolicina: number, status: Status) {
    let generatedId;
    return this.http.post<{name: string}>(
      `https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/knjige.json?auth=${this.authService.getToken()}`,
      { naslov, autor, isbn, slika, opis, cena, kolicina, status }
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
            naslov, autor, isbn, slika, opis, cena, kolicina, status
          })
        );
      })
    );
  }

  getKnjige() {
    return this.http
      .get<{[key: string]: KnjigaModel}>(
        `https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/knjige.json?auth=${this.authService.getToken()}`
      )
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

  getKnjiga(id: string) {
    return this.http
      .get(
        `https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/knjige/${id}.json?auth=${this.authService.getToken()}`
      )
      .pipe(
        map((resData: any) => {
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
          };
        })
      );
  }

  updateKnjiga(id: string, updatedKnjiga: Partial<KnjigaModel>) {
    return this.http
      .patch(
        `https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/knjige/${id}.json?auth=${this.authService.getToken()}`,
        updatedKnjiga
      )
      .pipe(
        switchMap(() => this.knjige),
        take(1),
        tap(knjige => {
          const updatedKnjigeIndex = knjige.findIndex(k => k.id === id);
          const updatedKnjige = [...knjige];
          updatedKnjige[updatedKnjigeIndex] = {
            ...knjige[updatedKnjigeIndex],
            ...updatedKnjiga
          };
          this._knjige.next(updatedKnjige);
        })
      );
  }

  promeniStatusKnjige(id: string, status: Status) {
    const knjiga = this._knjige.value.find(k => k.id === id);
    if (!knjiga) {
      console.error('Knjiga nije pronađena.');
      return null;
    }
    knjiga.status = status;
    return this.http.patch(
      `https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/knjige/${id}.json?auth=${this.authService.getToken()}`,
      { status: Status[Status.Arhivirano] }
    ).pipe(
      tap(() => {
        this._knjige.next([...this._knjige.value]);
      })
    );
  }
}
