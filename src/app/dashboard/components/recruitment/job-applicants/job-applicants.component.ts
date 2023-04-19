import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/shared/types/recruitments';

@Component({
  selector: 'job-applications',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.sass'],
})
export class JobApplicantsComponent implements OnInit {
  candidates: Candidate[] = [];
  constructor() {}

  ngOnInit(): void {
    this.candidates = [
      {
        voornaam: 'Lotte',
        achternaam: 'De Smedt',
        geboortedatum: '1993-08-15',
        geslacht: 'vrouw',
        cv: 'Ik heb een diploma in marketing en werk momenteel als marketingmedewerker bij een groot bedrijf.',
        motivatiebrief:
          'Ik ben geïnteresseerd in deze vacature omdat het me de kans geeft om mijn vaardigheden te ontwikkelen en bij te dragen aan een groeiend bedrijf.',
      },
      {
        voornaam: 'Bram',
        achternaam: 'Van Damme',
        geboortedatum: '1991-02-23',
        geslacht: 'man',
        cv: 'Ik ben afgestudeerd als software-ingenieur en werk momenteel als softwareontwikkelaar bij een start-up.',
        motivatiebrief:
          'Ik ben zeer geïnteresseerd in deze vacature omdat het me de kans geeft om te werken aan een uitdagend project en mijn vaardigheden verder te ontwikkelen.',
      },
      {
        voornaam: 'Fien',
        achternaam: 'Jacobs',
        geboortedatum: '1988-11-12',
        geslacht: 'vrouw',
        cv: 'Ik ben afgestudeerd als architect en heb ervaring met het ontwerpen van huizen en kantoorruimtes.',
        motivatiebrief:
          'Ik ben erg enthousiast over deze vacature omdat het me de kans geeft om te werken aan uitdagende projecten en mijn vaardigheden verder te ontwikkelen.',
      },
      {
        voornaam: 'Jeroen',
        achternaam: 'Vermeulen',
        geboortedatum: '1990-05-29',
        geslacht: 'man',
        cv: 'Ik heb een diploma in bedrijfskunde en werk momenteel als accountmanager bij een groot bedrijf.',
        motivatiebrief:
          'Ik ben zeer geïnteresseerd in deze vacature omdat het me de kans geeft om mijn vaardigheden te ontwikkelen en bij te dragen aan de groei van het bedrijf.',
      },
      {
        voornaam: 'Eline',
        achternaam: 'Van Hoof',
        geboortedatum: '1994-03-17',
        geslacht: 'vrouw',
        cv: 'Ik ben afgestudeerd als journalist en werk momenteel als redacteur bij een tijdschrift.',
        motivatiebrief:
          'Ik ben erg enthousiast over deze vacature omdat het me de kans geeft om te werken aan interessante artikelen en mijn vaardigheden als journalist verder te ontwikkelen.',
      },
      {
        voornaam: 'Ruben',
        achternaam: 'Peeters',
        geboortedatum: '1992-09-07',
        geslacht: 'man',
        cv: 'Ik heb een diploma in marketing en werk momenteel als marketingmanager',
        motivatiebrief:
          'Ik ben erg enthousiast over deze vacature omdat het me de kans geeft om te werken aan interessante artikelen en mijn vaardigheden als journalist verder te ontwikkelen.',
      },
    ];
  }
}
