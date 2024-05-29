import { Component, inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NarudzbenicaService } from '../narudzbenica.service';
import { StatusNarudzbenice, StavkaNarudzbenice } from '../narudzbenica.model';
import { forkJoin } from 'rxjs';
import { KnjigeService } from '../knjige.service';
import { Status } from '../knjiga.model';
import { jsPDF} from 'jspdf';

@Component({
  selector: 'app-narudzbenica-modal',
  templateUrl: './narudzbenica-modal.component.html',
  styleUrls: ['./narudzbenica-modal.component.scss'],
})
export class NarudzbenicaModalComponent implements OnInit {
  nizStavki: StavkaNarudzbenice[] = [];

  
  constructor(
    private modalCtrl: ModalController,
    private narudzbenicaService: NarudzbenicaService,
    private knjigeService:KnjigeService
  ) {}

  ngOnInit(): void {
    this.narudzbenicaService.stavke.subscribe((stavke) => {
      this.nizStavki = stavke;
      console.log(this.nizStavki);
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  potvrdiNarudzbenicu() {

    //kada se klikne da, pozove se ova metoda i ona ce napraviti pdf
    this.generatePDF();
    

    const promeneStatusa = this.nizStavki.map(stavka =>
      this.knjigeService.promeniStatusKnjige(stavka.knjigaId, Status.Na_cekanju)
    );
  

    console.log(this.ukupnaCena())
    console.log(this.ukupnaKolicina())
   
    forkJoin(promeneStatusa).subscribe({
      next: () => {
        // Kada su sve promene statusa završene, kreira se narudzbenica
        this.narudzbenicaService
          .addNarudzbenica(this.ukupnaKolicina(), this.ukupnaCena(),StatusNarudzbenice.Neobradjena)
          .subscribe(() => {
            this.modalCtrl.dismiss({ confirm: true });
          }, (error) => {
            console.error('Error while adding narudzbenica:', error);
          });
      },
      error: (error) => {
        console.error('Error while updating book statuses:', error);
      }
    });
  }

  ukupnaCena(): number {
    return this.nizStavki.reduce((total, stavka) => total + stavka.cena * stavka.kolicina, 0);
  }

  ukupnaKolicina():number{
    return this.nizStavki.reduce((total, stavka)=> total + stavka.kolicina,0)
  }



  generatePDF() {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text('Narudzbenica', 10, 10);
  
    doc.setFontSize(12);
    doc.text('Spisak knjiga za narudzbenicu:', 10, 20);
    doc.line(10, 22, 200, 22); 
  
    let y = 30;
    this.nizStavki.forEach((stavka, index) => {
      doc.text(`${index + 1}. ${stavka.naslov}`, 10, y);
      doc.text(`Kolicina: ${stavka.kolicina}`, 150, y);
      doc.text(`Cena: ${stavka.cena.toFixed(2)} RSD`, 10, y + 10);
      doc.text(`Ukupan iznos: ${(stavka.kolicina * stavka.cena).toFixed(2)} RSD`, 150, y + 10);
      y += 20;
    });
  
    doc.line(10, y, 200, y); 
    y += 10;
    doc.text(`Ukupna kolicina: ${this.ukupnaKolicina()}`, 10, y);
    doc.text(`Ukupna cena: ${this.ukupnaCena().toFixed(2)} RSD`, 150, y);
  
    doc.save('narudzbenica.pdf');
  }


}














