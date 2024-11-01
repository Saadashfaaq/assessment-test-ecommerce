import { Component, ViewChild } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NavigationComponent, SharedModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  isUserLogin: boolean = false;
  products: any;
  categories: string[] = [];
  filteredProducts: any[] = [];
  categoryControl = new FormControl('');

  pageSize = 10;
  pageIndex = 0;
  totalProducts = 20;

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    private router: Router,
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.checkIsUserLogin();
    this.getProductList();
    this.getAllCategories();
    this.initFilter();
  }

  /**
   * Checks if the user is logged in by verifying the presence of an email and password in local storage.
   * If the user is not logged in, it navigates to the login page.
   *
   * @returns {void} No return value.
   */
  checkIsUserLogin(): void {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!(user?.email && user?.password)) {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Fetches the product list from the product service and updates the component's state.
   * Filters the products based on the selected category and logs the product list to the console.
   *
   * @returns {void} No return value.
   */
  getProductList(): void {
    this.productService.getProductList().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.filterProducts(this.categoryControl.value);
        this.updateFilteredProducts();
      },
      error: (err) => console.error('Error fetching products:', err),
    });
  }

  /**
   * Retrieves all product categories from the product service and updates the component's state.
   * Logs the retrieved categories to the console.
   *
   * @returns {void} No return value.
   */
  getAllCategories(): void {
    this.productService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  /**
   * Filters the products based on the selected category.
   * Updates the filteredProducts array accordingly.
   *
   * @param {string} selectedCategory - The category selected by the user.
   * @returns {void} No return value.
   */
  filterProducts(selectedCategory: string): void {
    this.filteredProducts = selectedCategory
      ? this.products.filter((product) => product.category === selectedCategory)
      : this.products;

    this.totalProducts = this.filteredProducts.length;
    this.pageSize =
      this.filteredProducts.length < 10 ? this.filteredProducts.length : 10;
  }

  /**
   * Initializes the filter by observing changes to the category control's value.
   * Updates the filtered products when the selected category changes.
   *
   * @returns {void} No return value.
   */
  initFilter(): void {
    // Observes changes to categoryControl value
    this.categoryControl.valueChanges.subscribe((selectedCategory) => {
      this.filterProducts(selectedCategory);
    });
  }

  /**
   * Adds a product to the cart stored in local storage.
   * Retrieves the current cart, adds the product, and saves the updated cart back to local storage.
   *
   * @param {any} product - The product to be added to the cart.
   * @returns {void} No return value.
   */
  addToCart(product: any): void {
    // Retrieve cart items from local storage
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Add product to cart
    cart.push(product);

    // Save updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optional: Show confirmation message
    console.log(`${product.title} has been added to the cart!`);
  }

  /**
   * Opens the cart dialog, allowing the user to view and manage their cart items.
   *
   * @returns {void} No return value.
   */
  openCartDialog(): void {
    this.dialog.open(CartDialogComponent, {
      disableClose: true,
      width: '750px',
      panelClass: 'certification-rule-pop-up',
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateFilteredProducts();
  }

  updateFilteredProducts() {
    const startIndex = this.pageIndex * this.pageSize;
    this.filteredProducts = this.products.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }
}
