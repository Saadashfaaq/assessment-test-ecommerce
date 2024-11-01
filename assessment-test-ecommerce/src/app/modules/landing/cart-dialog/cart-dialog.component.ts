import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-cart-dialog',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
  ],
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.scss'
})
export class CartDialogComponent {
  cartItems: { product: any; quantity: number }[] = [];

  constructor(
    private dialogRef: MatDialogRef<CartDialogComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }

/**
 * Loads the cart from local storage, consolidates items with the same ID, 
 * and stores them in the `cartItems` array with their quantities.
 *
 * @returns {void} No return value.
 */
loadCart(): void {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartMap = new Map();

  cart.forEach((item: any) => {
    if (cartMap.has(item.id)) {
      cartMap.get(item.id).quantity += 1;
    } else {
      cartMap.set(item.id, { product: item, quantity: 1 });
    }
  });

  this.cartItems = Array.from(cartMap.values());
}

/**
 * Closes the currently open dialog.
 *
 * @returns {void} No return value.
 */
closeDialog(): void {
  this.dialogRef.close();
}

/**
 * Increases the quantity of an item in the cart at the specified index and updates local storage.
 *
 * @param {number} index - The index of the item in `cartItems` to increase the quantity for.
 * @returns {void} No return value.
 */
increaseQuantity(index: number): void {
  this.cartItems[index].quantity++;
  this.updateCartInStorage();
}

/**
 * Decreases the quantity of an item in the cart at the specified index.
 * Removes the item if the quantity reaches zero, and updates local storage.
 *
 * @param {number} index - The index of the item in `cartItems` to decrease the quantity for.
 * @returns {void} No return value.
 */
decreaseQuantity(index: number): void {
  this.cartItems[index].quantity--;
  if (this.cartItems[index].quantity === 0) {
    this.cartItems.splice(index, 1); // Remove item if quantity reaches zero
  }
  this.updateCartInStorage();
}

/**
 * Updates the cart data in local storage based on the current `cartItems` array.
 * Each item is expanded to match its quantity.
 *
 * @returns {void} No return value.
 */
updateCartInStorage(): void {
  const updatedCart = this.cartItems.flatMap(item =>
    Array(item.quantity).fill(item.product)
  );
  localStorage.setItem('cart', JSON.stringify(updatedCart));
}

/**
 * Calculates and returns the total price of all items in the cart.
 *
 * @returns {number} The total price of the items in the cart.
 */
getTotalPrice(): number {
  return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

/**
 * Closes the current dialog and opens the checkout dialog with the cart's total price as data.
 *
 * @returns {void} No return value.
 */
openCheckoutDialog(): void {
  this.dialogRef.close(); 
  this.dialog.open(CheckoutDialogComponent, {
    disableClose: true,
    width: '750px',
    panelClass: 'certification-rule-pop-up',
    data: { total: this.getTotalPrice() }
  });
}
}
