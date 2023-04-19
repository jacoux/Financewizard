import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './all-candidates.component.html',
  styleUrls: ['./all-candidates.component.sass'],
})
export class AllCandidatesComponent implements OnInit {
  candidates = [
    {
      first_name: 'Eline',
      last_name: 'De Vos',
      email: 'eline.devos@example.com',
      gender: 'female',
      age: 28,
      last_applied: '2022-11-05',
      area: 'IT',
      hours: 40,
      city: 'Mechelen',
    },
    {
      first_name: 'Bart',
      last_name: 'Vermeulen',
      email: 'bart.vermeulen@example.com',
      gender: 'male',
      age: 34,
      last_applied: '2022-09-12',
      area: 'Huishoudhulp',
      hours: 32,
      city: 'Brugge',
    },
    {
      first_name: 'Annelies',
      last_name: 'Peeters',
      email: 'annelies.peeters@example.com',
      gender: 'female',
      age: 41,
      last_applied: '2023-02-01',
      area: 'Boekhouding',
      hours: 40,
      city: 'Hasselt',
    },
    {
      first_name: 'Johan',
      last_name: 'Vandenberghe',
      email: 'johan.vandenberghe@example.com',
      gender: 'male',
      age: 26,
      last_applied: '2023-03-24',
      area: 'Boekhouding',
      hours: 38,
      city: 'Gent',
    },
    {
      first_name: 'Lore',
      last_name: 'Smeets',
      email: 'lore.smeets@example.com',
      gender: 'female',
      age: 31,
      last_applied: '2023-01-19',
      area: 'IT',
      hours: 40,
      city: 'Tongeren',
    },
    {
      first_name: 'Tom',
      last_name: 'Verstraeten',
      email: 'tom.verstraeten@example.com',
      gender: 'male',
      age: 29,
      last_applied: '2022-11-12',
      area: 'Project manager',
      hours: 40,
      city: 'Antwerpen',
    },
    {
      first_name: 'Karen',
      last_name: 'Van Damme',
      email: 'karen.vandamme@example.com',
      gender: 'female',
      age: 36,
      last_applied: '2023-03-05',
      area: 'Administratie',
      hours: 40,
      city: 'Oostende',
    },
    {
      first_name: 'Bram',
      last_name: 'De Vos',
      email: 'bram.devos@example.com',
      gender: 'M',
      age: 32,
      last_applied: '2022-12-01',
      area: 'Verpleegster',
      hours: 40,
      city: 'Mechelen',
    },
    {
      first_name: 'Emma',
      last_name: 'Van Daele',
      email: 'emma.vandaele@example.com',
      gender: 'F',
      age: 26,
      last_applied: '2022-11-15',
      area: 'Zorg',
      hours: 38,
      city: 'Gent',
    },
    {
      first_name: 'Jonas',
      last_name: 'Declercq',
      email: 'jonas.declercq@example.com',
      gender: 'M',
      age: 29,
      last_applied: '2022-10-20',
      area: 'Huishoudhulp',
      'Senior Developer': true,
      hours: 40,
      city: 'Leuven',
    },
    {
      first_name: 'Eline',
      last_name: 'Vermeersch',
      email: 'eline.vermeersch@example.com',
      gender: 'F',
      age: 28,
      last_applied: '2022-09-30',
      area: 'Administratie',
      'Senior Developer': false,
      hours: 32,
      city: 'Brugge',
    },
    {
      first_name: 'Pieter',
      last_name: 'Vandenberghe',
      email: 'pieter.vandenberghe@example.com',
      gender: 'M',
      age: 34,
      last_applied: '2022-08-17',
      area: 'schoonmaak',
      'Senior Developer': true,
      hours: 40,
      city: 'Brussel',
    },
    {
      first_name: 'Lotte',
      last_name: 'Jacobs',
      email: 'lotte.jacobs@example.com',
      gender: 'F',
      age: 25,
      last_applied: '2022-07-10',
      area: 'HR',
      'Senior Developer': false,
      hours: 38,
      city: 'Hasselt',
    },
    {
      first_name: 'Ruben',
      last_name: 'Vanhove',
      email: 'ruben.vanhove@example.com',
      gender: 'M',
      age: 31,
      last_applied: '2022-06-02',
      area: 'schoonmaak',
      'Senior Developer': true,
      hours: 40,
      city: 'Kortrijk',
    },
  ];
  ngOnInit(): void {}
}
