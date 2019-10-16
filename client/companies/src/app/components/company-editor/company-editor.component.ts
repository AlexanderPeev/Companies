import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CompanyRestService} from '../../services/rest/company-rest.service';
import {Company} from '../../model/company';

/*
class EditorErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && control.touched && form.invalid;
  }
}
*/

@Component({
  selector: 'app-company-editor',
  templateUrl: './company-editor.component.html',
  styleUrls: ['./company-editor.component.scss']
})
export class CompanyEditorComponent implements OnInit, OnDestroy {
  public loading = true;
  public error = false;
  public updating = false;
  public updated = false;
  public updateError = false;
  public updateConflict = false;
  public company: Company = null;
  public editedCompany: Company = null;
  public initialCompany: Company = null;
  //public errorStateMatcher: ErrorStateMatcher = new EditorErrorMatcher();
  private id: string;
  private destroyed = false;
  private sub: any;

  constructor(private route: ActivatedRoute, private companyRest: CompanyRestService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchCompany();
    });
  }

  ngOnDestroy() {
    this.destroyed = true;
    if (this.sub) {
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
      this.initialCompany = company.copy();
      this.error = false;
      this.loading = false;
      this.detectChanges();
    }, e => {
      this.error = true;
      this.loading = false;
      this.detectChanges();
    });
  }

  private detectChanges() {
    if (!this.destroyed) {
      this.cdr.detectChanges();
    }
  }

  public get canUpdate(): boolean {
    return !this.updating
      && !this.loading
      && !!this.company
      && !!this.company.name
      && !!this.company.address
      && !!this.company.city
      && !!this.company.country;
  }

  public handleDiff(): void {
    if (!CompanyEditorComponent.isChanged(this.company.name, this.initialCompany.name)) {
      this.company.name = this.editedCompany.name;
    }
    if (!CompanyEditorComponent.isChanged(this.company.address, this.initialCompany.address)) {
      this.company.address = this.editedCompany.address;
    }
    if (!CompanyEditorComponent.isChanged(this.company.city, this.initialCompany.city)) {
      this.company.city = this.editedCompany.city;
    }
    if (!CompanyEditorComponent.isChanged(this.company.country, this.initialCompany.country)) {
      this.company.country = this.editedCompany.country;
    }
    if (!CompanyEditorComponent.isChanged(this.company.email, this.initialCompany.email)) {
      this.company.email = this.editedCompany.email;
    }
    if (!CompanyEditorComponent.isChanged(this.company.phone, this.initialCompany.phone)) {
      this.company.phone = this.editedCompany.phone;
    }
  }

  public update(): void {
    this.updating = true;
    this.updated = false;
    this.updateError = false;
    this.updateConflict = false;
    this.detectChanges();

    this.companyRest.updateCompany(this.company).subscribe(company => {
      this.company = company;
      this.initialCompany = company.copy();
      this.updateError = false;
      this.updateConflict = false;
      this.updating = false;
      this.updated = true;
      this.detectChanges();
    }, e => {
      // 409 === 'Conflict'
      if (e && e.status === 409) {
        this.updateError = false;
        this.updateConflict = true;
        this.updating = false;
        this.updated = false;

        this.companyRest.getCompanyById(this.id).subscribe(company => {
          this.editedCompany = this.company;
          this.company = company;
          this.handleDiff();
          this.detectChanges();
        }, e => {
          this.error = true;
          this.loading = false;
          this.detectChanges();
        });
      } else {
        this.updateError = true;
        this.updateConflict = false;
      }
      this.updating = false;
      this.updated = false;
      this.detectChanges();
    });
  }

  public isConflicted(initial: string, edited: string, remote: string): boolean {
    return initial !== remote && initial !== edited && edited != remote;
  }

  public static isChanged(remote: string, initial: string): boolean {
    return initial !== remote;
  }
}
