import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { GeneralCrudService } from 'src/app/shared/services/general-crud.service';
import { Product } from 'src/app/shared/types/invoice';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css'],
})
export class AddProductModalComponent implements OnInit, OnChanges {
  @Output() productData = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();
  @Input() product?: Product;
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

  ngOnChanges() {
    
    if (this.product && this.productForm) {
      this.productForm.controls['name'].setValue(this.product?.name);
      this.productForm.controls['vatPercentage'].setValue(
        this.product?.vatPercentage
      );
      this.productForm.controls['price'].setValue(
        this.product?.price
      );
      this.productForm.controls['description'].setValue(this.product?.description);
      this.productForm.controls['hourlyRate'].setValue(
        this.product?.isHourlyRate
      );
      this.productForm.controls['qty'].setValue(
        this.product?.qty
      );
    }
  }

  close() {
    this.toggle.emit();
  }
}
