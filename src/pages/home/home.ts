import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http }    from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';  
import 'rxjs/add/operator/toPromise';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

// 加载动画
import { LoadingController } from 'ionic-angular';

// 导入要跳转的页面
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public banner = [];
  public blog = [];
  private bannerUrl = "/api/banner";

  @ViewChild(Slides) slides: Slides;

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
  				this.banner = response.json().data;
	  			this.getSafeUrl(this.banner);
	  			this.getLastBlog(loading);
  			}
  		
  		})
      .catch(this.handleError);
  }

  getSafeUrl (arr) {
  	arr.forEach(blog=> {
  		blog.banner_image = this.sanitizer.bypassSecurityTrustResourceUrl(blog.banner_image);
  	});
  }

  // 获取最近的博客
  getLastBlog (loading) {
  	this.http.get('/api/blog')
  		.toPromise()
  		.then(res=> {
  			if (res) {
  				this.blog = res.json().data;;
	  			this.getSafeUrl(this.blog);
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
