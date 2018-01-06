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
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public blog = [];
  private bannerUrl = "/api/all_blog";

  constructor(public navCtrl: NavController, private http: Http,
  	private sanitizer: DomSanitizer, public loadingCtrl: LoadingController) {
  	// 开启加载动画
  	let loading = this.loadingCtrl.create({
    	content: '正在加载中'
  	});
  	loading.present();

  	this.http.get(this.bannerUrl)
  		.toPromise()
  		.then(response=> {
  			if (response) {
  				this.blog = response.json().data;
	  			console.log(this.blog);
	  			loading.dismiss();
  			}
  		
  		})
      .catch(this.handleError);
  }

  // 这个方法主要处理的是页面跳转
  redirect (id) {
  	this.navCtrl.push(DetailPage, {
  		article_id: id
  	});
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
