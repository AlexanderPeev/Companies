import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyRestService } from '../../services/rest/company-rest.service';
import { Company } from '../../model/company';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit, OnDestroy {
  public loading = true;
  public error = false;
  public deletionError = false;
  public deleted = false;
  public company: Company = null;
  private id: string;
  private destroyed = false;
  private sub: any;

  constructor(private route: ActivatedRoute, private companyRest: CompanyRestService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
       this.fetchCompany();
    });
  }

  ngOnDestroy() {
    this.destroyed = true;
    if(this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  retry() {
    this.loading = true;
    this.error = false;
    this.detectChanges();
    this.fetchCompany();
  }

  public fetchCompany() {
      this.companyRest.getCompanyById(this.id).subscribe(company => {
        this.company = company;
        this.error = false;
        this.loading = false;
        this.detectChanges();
      }, e => {
        this.error = true;
        this.loading = false;
        this.detectChanges();
      });
  }

  retryDeleting() {
    this.loading = true;
    this.deletionError = false;
    this.detectChanges();
    this.deleteCompany();
  }

  deleteCompany() {
    this.companyRest.deleteCompany(this.company).subscribe(() => {
      this.deleted = true;
      this.deletionError = false;
      this.loading = false;
      this.detectChanges();
    }, e => {
      this.deleted = false;
      this.deletionError = true;
      this.loading = false;
      this.detectChanges();
    });
  }

  private detectChanges() {
    if(!this.destroyed) {
      this.cdr.detectChanges();
    }
  }

}
