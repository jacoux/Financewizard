import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  templateUrl: './applicant-process.component.html',
  styleUrls: ['./applicant-process.component.scss'],
})
export class ApplicantProcessComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  movies = [
    'Solliciteren via de website',
    'Bevestigingsmail sollicitatie aangekregen ',
    'Uitnodiging gesprek',
    'Beoordeling door verantwoordelijk',
    'Gesprek',
    'Persoonlijkheidstest',
    'Onboarding',
    'Voorstel tot aanwerving',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
