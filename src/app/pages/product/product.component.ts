import { productsData } from './../ui-components/tables/tables.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SnackBarComponent } from 'src/app/components/snackbar/snack-bar/snack-bar.component';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductFormComponent } from './product-form/product-form.component';

@Component({
  selector: 'app-product',
  imports: [
     MatFormFieldModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatGridListModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatPaginator,
        CommonModule,
        MatMenuModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{


  @ViewChild(MatPaginator) paginator: MatPaginator;
  title: string = "Liste des produits";
  products: any[] = [];
  displayedColumns = ['name','current_price','service'];
  paginatedProduct = new MatTableDataSource();
  showForm: boolean = false;


  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}


  ngOnInit(): void {
    this.getAllProduct();
  }


  getAllProduct() {
    this.productService.getAllProduct().subscribe({
      next: (product) => {
        this.products = product;
        this.paginatedProduct.data = this.products;
        this.paginatedProduct.paginator = this.paginator;
      },
      error: (err) => console.error("Erreur lors de la recuperation des donnees",err)
    });
  }

  openDialog(product: any = null): void  {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: { productData: product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (product) {
          this.updateProduct(product._id, result);
        } else {
          this.addNewProduct(result);
        }
      }
    });
  }

  deleteProduct(product: any) {
    this.productService.deleteProduct(product._id).subscribe(() => {
      this.getAllProduct();
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: { message: "Produit supprimer avec succès ✅", type: 'success' },
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-bg'],
        });
    })
  }

  addNewProduct(product: any) {
    this.productService.saveNewProduct(product).subscribe(() => {
      this.getAllProduct();
      this.snackBar.openFromComponent(SnackBarComponent, {
          data: { message: "Produit creer avec succès ✅", type: 'success' },
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-bg'],
        });
    });
  }

  updateProduct(id: string,productsData: any) {
    this.productService.updateProduct(id,productsData).subscribe(() => {
      this.getAllProduct();
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { message: "Produit mis à jour avec succès ✅", type: 'success' },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-bg'],
      });
    })
  }

}
