import { Component, OnInit , Renderer2, ElementRef} from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert-notify',
  templateUrl: './alert-notify.component.html',
  styleUrls: ['./alert-notify.component.css']
})
export class AlertNotifyComponent implements OnInit {


  success: boolean|null = null


  constructor(private alertService : AlertService,private renderer: Renderer2, private el: ElementRef){

  }

  ngOnInit(): void {
    console.log(this.success);

    this.alertService.alertMode.subscribe(res=>{
      this.success = res
      if(this.success == true || this.success == false)
      {
      const alertDiv = this.el.nativeElement.querySelector('.alert');
      this.renderer.addClass(alertDiv, 'active');
      setTimeout(() => {
      this.renderer.removeClass(alertDiv, 'active');
      }, 2000);
      }
    })
  }

  alertify(pop:boolean){

  }
}
