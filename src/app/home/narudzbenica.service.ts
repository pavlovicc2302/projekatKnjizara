import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { Narudzbenica, StatusNarudzbenice, StavkaNarudzbenice } from './narudzbenica.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { KnjigeService } from './knjige.service';
import { Status } from './knjiga.model';


@Injectable({
  providedIn: 'root',
})
export class NarudzbenicaService {

  private _narudzbenice = new BehaviorSubject<Narudzbenica[]>([]);
  private nizStavki: StavkaNarudzbenice[] = [];
  private _stavke = new BehaviorSubject<StavkaNarudzbenice[]>(this.nizStavki);

  get stavke() {
    return this._stavke.asObservable();
  }

  get narudzbenice() {
    return this._narudzbenice.asObservable();
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private knjigeService: KnjigeService
  ) {}

  dodajStavku(stavka: StavkaNarudzbenice) {
    stavka.id = (this.nizStavki.length + 1).toString();
    this.nizStavki.push(stavka);
    this._stavke.next([...this.nizStavki]);
    console.log(this.nizStavki);
  }

  namestiDatum(datum: Date): string {
    const formatDatum = (num: number) => (num < 10 ? `0${num}` : num);

    const dan = formatDatum(datum.getDate());
    const mesec = formatDatum(datum.getMonth() + 1);
    const godina = datum.getFullYear();
    const sati = formatDatum(datum.getHours());
    const minuti = formatDatum(datum.getMinutes());

    return `${dan}.${mesec}.${godina}. ${sati}:${minuti}`;
  }

  addNarudzbenica(
    ukupnaKolicina: number,
    ukupnaCena: number,
    status: StatusNarudzbenice,
    stavke: StavkaNarudzbenice[] = this.nizStavki
  ) {
    const user = `${localStorage.getItem('ulogovani')}:${localStorage.getItem('ulogovaniID')}`;
    const datum = this.namestiDatum(new Date());
    const url = `https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/narudzbenice.json?auth=${this.authService.getToken()}`;

    return this.http
      .post<{ name: string }>(url, { user, ukupnaKolicina, ukupnaCena, datum, stavke, status })
      .pipe(
        switchMap((resData) => {
          const generatedId = resData.name;
          return this.narudzbenice.pipe(
            take(1),
            map((narudzbenice) => {
              return [...narudzbenice, { id: generatedId, user, ukupnaKolicina, ukupnaCena, datum, stavke, status }];
            })
          );
        }),
        tap((narudzbenice) => {
          this._narudzbenice.next(narudzbenice);
          this.nizStavki = [];
          this._stavke.next([]);
          this.router.navigateByUrl('/home/tabs/pocetna');
        })
      );
  }

  getNarudzbenice(status: StatusNarudzbenice) {
    const url = `https://knjizara-d51e5-default-rtdb.europe-west1.firebasedatabase.app/narudzbenice.json?auth=${this.authService.getToken()}`;

    return this.http.get<{ [key: string]: Narudzbenica }>(url).pipe(
      map((narudzbeniceData) => {
        const narudzbenice: Narudzbenica[] = [];
        for (const key in narudzbeniceData) {
          if (narudzbeniceData.hasOwnProperty(key)) {
            const narudzbenica = narudzbeniceData[key];
            if (narudzbenica.status.toLowerCase() === StatusNarudzbenice[status].toLowerCase()) {
              narudzbenice.push({
                id: key,
                user: narudzbenica.user,
                ukupnaKolicina: narudzbenica.ukupnaKolicina,
                ukupnaCena: narudzbenica.ukupnaCena,
                datum: narudzbenica.datum,
                stavke: narudzbenica.stavke ? Object.values(narudzbenica.stavke) : [],
                status: narudzbenica.status,
              });
            }
          }
        }
        this._narudzbenice.next(narudzbenice);
        return narudzbenice;
      })
    );
  }
}
