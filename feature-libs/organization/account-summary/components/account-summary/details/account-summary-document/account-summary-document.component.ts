import { Component, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
// import { AccountSummaryDetailsService } from '../../../services/account-summary-details.service';

@Component({
  selector: 'cx-account-summary-document',
  templateUrl: './account-summary-document.component.html',
  styleUrls: ['./account-summary-document.component.css']
})
export class AccountSummaryDocumentComponent implements OnInit {

  currentUnitCode: string;
  baseSiteId: string;
  res: Object;

  rowData: any[] = [
    { id: 'POCR-0000001', type: 'Purchase Order', createDate: 'Apr 20, 2022 5:07AM', dueDate: 'Apr 21, 2022 5:07AM', originalAmount: '$7,851,558,00', openAmount: '$7,851,558,00', status: 'Open', link: '' },
    { id: 'POCR-0000004', type: 'Purchase Order', createDate: 'Apr 14, 2022 5:07AM', dueDate: 'Apr 23, 2022 5:07AM', originalAmount: '$7,851,558,00', openAmount: '$7,851,558,00', status: 'Open', link: 'View' },
    { id: 'POCR-0000003', type: 'Purchase Order', createDate: 'Apr 05, 2022 5:07AM', dueDate: 'Apr 25, 2022 5:07AM', originalAmount: '$7,851,558,00', openAmount: '$7,851,558,00', status: 'Closed', link: '' },
    { id: 'CRNCR-0000001', type: 'Invoice', createDate: 'Mar 21, 2022 5:07AM', dueDate: 'Mar 24, 2022 5:07AM', originalAmount: '$7,851,558,00', openAmount: '$7,851,558,00', status: 'Closed', link: '' },
    { id: 'CRNCR-0000002', type: 'Invoice', createDate: 'Mar 24, 2022 5:07AM', dueDate: 'Mar 27, 2022 5:07AM', originalAmount: '$7,851,558,00', openAmount: '$7,851,558,00', status: 'Open', link: 'View' }


  ];

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'Document Number' },
    { field: 'type', headerName: 'Document Type' },
    { field: 'createDate', headerName: 'Created On' },
    { field: 'dueDate', headerName: 'Due On' },
    { field: 'originalAmount', headerName: 'Original Amount' },
    { field: 'openAmount', headerName: 'Open Amount' },
    { field: 'status', headerName: 'Status', maxWidth: 150 },
    { field: 'link', headerName: '', maxWidth: 100 },
  ];

  defaultColDef: ColDef = {
    sortable: true, filter: true, resizable: true
  };

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }

  constructor(
    private routingService: RoutingService) {
    this.routingService.getRouterState().subscribe((value) => {
      const urlArr = value.state.url.split('/');
      this.baseSiteId = urlArr[0];
      this.currentUnitCode = urlArr[urlArr.length - 1];
    });
  }

  ngOnInit(): void {
    // this.accountSummaryDetailsService.getAccountSummary(this.currentUnitCode).subscribe((response: any) => {
    //   this.res = response;
    // });
  }


}
