import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http }    from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';  
import 'rxjs/add/operator/toPromise';

// 加载动画
import { LoadingController } from 'ionic-angular';

// 导入要跳转的页面
import { DetailPage } from '../detail/detail';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public time = [];
  private timeUrl = "/api/all_time";
  constructor(public navCtrl: NavController, private http: Http,
  	private sanitizer: DomSanitizer, public loadingCtrl: LoadingController) {
  	// 开启加载动画
  	let loading = this.loadingCtrl.create({
    	content: '正在加载中'
  	});
  	loading.present();

  	this.http.get(this.timeUrl)
  		.toPromise()
  		.then(response=> {
  			if (response._body) {
  				this.time= JSON.parse(response._body).data;
	  			console.log(this.time);
	  			loading.dismiss();
  			}
  		
  		})
  }

}
