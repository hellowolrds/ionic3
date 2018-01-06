import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http }    from '@angular/http';
import 'rxjs/add/operator/toPromise';
// 加载动画
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  private blog = '';
  private baseUrl = '/api/detail';
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
  	private http: Http, public navParams: NavParams) {
  	// 开启加载动画
  	let loading = this.loadingCtrl.create({
    	content: '玩命加载中'
  	});
  	let id = navParams.get('article_id');
  	this.baseUrl += '?id=' + id; 
  	loading.present();
  	this.http.get(this.baseUrl)
  		.toPromise()
  		.then(res=>{
  			this.blog = JSON.parse(res._body).data;
  			loading.dismiss();
  		});
  }

}
