import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.sass'],
})
export class AddProductModalComponent implements OnInit {
  @Output() productData = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();
  public productForm!: UntypedFormGroup;
  products: any;

  constructor(
    public crudApi: GeneralCrudService,
    public fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.getProductForm();
  }

  getProductForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      vatPercentage: [''],
      price: [''],
      description: [''],
      hourlyRate: [],
      qty: [],
    });
  }
  get name() {
    return this.productForm.get('name');
  }
  get vatPercentage() {
    return this.productForm.get('vatPercentage');
  }
  get price() {
    return this.productForm.get('price');
  }
  get qty() {
    return this.productForm.get('qty');
  }
  get description() {
    return this.productForm.get('description');
  }
  get hourlyRate() {
    return this.productForm.get('hourlyRate');
  }
  ResetForm() {
    this.productForm.reset();
  }

  submitProductData() {
    const prd = this.productForm.value;

    this.productData.emit(prd);
    this.ResetForm();
  }

  close() {
    this.toggle.emit();
  }
}
