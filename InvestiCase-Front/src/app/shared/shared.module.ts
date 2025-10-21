import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    SidebarComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    SidebarComponent
  ]
})
export class SharedModule {}
