import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule,} from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import {
    MatTooltipDefaultOptions,
    MatTooltipModule,
} from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    AsyncPipe,
    CommonModule,
    CurrencyPipe,
    NgClass,
    NgFor,
    NgIf,
} from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink, RouterOutlet } from '@angular/router';


const modules: any = [
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTooltipModule,
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  MatFormFieldModule,
  MatOptionModule,
  NgFor,
  NgIf,
  NgClass,
  RouterLink,
  AsyncPipe,
  CurrencyPipe,
  RouterOutlet
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: [],
})
export class SharedModule { }
