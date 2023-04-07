import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor() {}

  renderAnswer(q: any) {
    if (q.includes('vaderschapsverlof')) {
      return 'Je kan 20 dagen vaderschapsverlof vrij opnemen binnen de 4 maanden na de geboorte. We zien dat je dochter, Lauren al 1,5jaar oud is. Je hebt dus geen recht meer op vaderschapsverlof, maar eventueel wel op ouderschapsverlof';
    }
    if (q.includes('duur')) {
      return 'We hebben je producten vergeleken met een aantal andere, soortgelijke bedrijven en zien dat je gemiddeld 10% minder vraagt voor Lassen & boren';
    }
    if (q.includes('betaald') || q.includes('wanneer')) {
      return 'Je wordt standaard uitbetaald aan het einde van iedere maand.';
    }
    if (q.includes('ziek') || q.includes('werken')) {
      return 'Meld je ziekte voor 9u00 aan de personeelsdienst. Voor één dag ziekte hoef je sinds 2023 geen ziektebriefje meer in te dienen. Ben je langer dan één dag afwezig wegens ziekte, bezorg de personeelsdienst en controledienst dan je doktersattest binnen de 3 dagen.';
    } else {
      return 'We konden geen antwoord vinden';
    }
  }
}
