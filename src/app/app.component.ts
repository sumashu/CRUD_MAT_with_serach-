import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Product } from './models/product';
import { HttpDataService } from './services/http-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUDMATERIAL';
  displayedColumns: string[] = ['productName','category','freshness','price','comment','date'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 constructor(private dialog : MatDialog, private httpdataserv:HttpDataService )
 { }
 ngOnInit(): void {
  this.getAllProducts();
  
 }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'40%'
    });
  }

  getAllProducts()
  {
     this.httpdataserv.getProduct()
     .subscribe({
       next:(res)=>{
        //this.dataSource = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
         },
      error:(err)=>{console.log("Something went wrong",err)}
  });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
