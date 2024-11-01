import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-checkout-dialog',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './checkout-dialog.component.html',
  styleUrl: './checkout-dialog.component.scss',
})
export class CheckoutDialogComponent {
  checkoutForm: FormGroup;
  paymentMethods = ['Credit Card', 'Bank Transfer', 'PayPal'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CheckoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { total: number }
  ) {}

  ngOnInit(): void {
    this.initCheckoutFormGroup();
  }

  /**
   * Initializes the checkout form group with address and payment method fields,
   * both set as required validators.
   *
   * @returns {void} No return value.
   */
  initCheckoutFormGroup(): void {
    this.checkoutForm = this.fb.group({
      address: ['', Validators.required],
      paymentMethod: ['', Validators.required],
    });
  }

  /**
   * Handles the checkout process and closes the checkout dialog.
   *
   * This function is intended to be expanded with additional checkout logic if needed.
   *
   * @returns {void} No return value.
   */
  onCheckout(): void {
    // Implement checkout logic here if needed
    localStorage?.setItem('cart', null);
    this.dialogRef.close(); // Closes the checkout dialog
  }

  /**
   * Cancels the checkout process and closes the checkout dialog,
   * returning the user to the cart dialog.
   *
   * @returns {void} No return value.
   */
  onCancel(): void {
    this.dialogRef.close(); // Closes the checkout dialog and returns to the cart dialog
  }
}
