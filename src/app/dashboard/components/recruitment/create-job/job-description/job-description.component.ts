import { Component, OnInit } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.sass'],
})
export class JobDescriptionComponent implements OnInit {
  addForm: UntypedFormGroup;
  rows: UntypedFormArray;
  constructor(private fb: UntypedFormBuilder) {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required],
    });
    this.rows = this.fb.array([]);
  }

  ngOnInit(): void {
    this.addForm.addControl('rows', this.rows);
  }
  getControls() {
    return (this.addForm.get('rows') as UntypedFormArray).controls;
  }

  getRow() {
    return this.addForm.get('rows') as UntypedFormArray;
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }

  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  createItemFormGroup(): UntypedFormGroup {
    return this.fb.group({
      title: null,
      description: null,
    });
  }

  selectTemplate(value: any) {
    if (value === 'HHH') {
      const form = this.fb.group({
        title: 'Over Ferm',
        description: 'test',
      });
      this.rows.push(form);
      const form2 = this.fb.group({
        title: 'Wat we verwachten:',
        description: 'teshvbhkjnlk,ml;ùm;l',
      });
      this.rows.push(form2);
    }
  }
}
