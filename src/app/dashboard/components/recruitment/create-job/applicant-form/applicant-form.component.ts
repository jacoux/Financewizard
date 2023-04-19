import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  templateUrl: './applicant-form.component.html',
  styleUrls: ['./applicant-form.component.scss'],
})
export class ApplicantFormComponent implements OnInit {
  form: any = {
    title: 'Sollicitatieformulier',
    groups: [
      {
        fields: [
          {
            name: 'Voornaam',
            type: 'text',
            label: 'Voornaam',
            required: true,
          },
        ],
      },

      {
        fields: [
          {
            name: 'Achternaam',
            type: 'text',
            label: 'Achternaam',
            required: true,
          },
        ],
      },
      {
        fields: [
          {
            name: 'email',
            type: 'text',
            label: 'email',
            required: true,
          },
        ],
      },
      {
        fields: [
          {
            name: 'Telefoonnummer',
            type: 'tel',
            label: 'Telefoonnummer',
          },
        ],
      },
      {
        fields: [
          {
            name: 'CV',
            type: 'file',
            label: 'CV',
          },
        ],
      },
      {
        fields: [
          {
            name: 'Motivatiebrief en andere',
            type: 'file',
            label: 'Motivatiebrief en andere',
            multiple: true,
          },
        ],
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {}
  addelement(): void {}
}
