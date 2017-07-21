import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: "photo-detail"
})
@Component({
  selector: 'page-photo-detail',
  templateUrl: 'photo-detail.html',
})
export class PhotoDetailPage {

  title = "";
  img_data = [{
    src: "assets/images/1.jpg"
  }, {
    src: "assets/images/2.jpg"
  }, {
    src: "assets/images/3.jpg"
  }, {
    src: "assets/images/4.jpg"
  }, {
    src: "assets/images/4.jpg"
  }, {
    src: "assets/images/3.jpg"
  }, {
    src: "assets/images/3.jpg"
  }, {
    src: "assets/images/2.jpg"
  }, {
    src: "assets/images/1.jpg"
  }, {
    src: "assets/images/2.jpg"
  }, {
    src: "assets/images/3.jpg"
  }, {
    src: "assets/images/2.jpg"
  }, {
    src: "assets/images/4.jpg"
  }, {
    src: "assets/images/2.jpg"
  }, {
    src: "assets/images/1.jpg"
  }];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = this.navParams.data.title;
  }

  ionViewWillEnter() {
    this.getNode();
  }
  getNode() {
    let parentNode = document.getElementById("container");
    let childNodeArray: any = parentNode.getElementsByClassName("box");
    let screenWidth = document.documentElement.clientWidth;
    let childWidth = childNodeArray[0].offsetWidth;
    let num = Math.floor(screenWidth / childWidth); //获得一排摆的个数 用Math.floor()转换为整数
    parentNode.style.cssText = "width:" + childWidth * num + "px; margin:0 auto"; //固定container的宽并设置居中
    this.setImagePosition(num, childNodeArray);
  }

  setImagePosition(num, childArray) {
    var imgHeightArray = [];//定义数组用于存放所有图片的高度
    for (var i = 0; i < childArray.length; i++) { //遍历所有图片
      if (i < num) {
        imgHeightArray[i] = childArray[i].offsetHeight; //取得第一排图片的高度
      } else {
        var minHeight = Math.min.apply(null, imgHeightArray); //获取第一排图片中高度最小的图片
        var minIndex = this.getMinHeight(imgHeightArray, minHeight); //函数获得高度最小的图片的位置
        childArray[i].style.position = "absolute"; //绝对定位图片
        childArray[i].style.top = minHeight + "px"; //图片距顶部像素
        childArray[i].style.left = childArray[minIndex].offsetLeft + "px"; //图片距左的像素
        imgHeightArray[minIndex] = imgHeightArray[minIndex] + childArray[i].offsetHeight; //将最低高度的box的高度加上它下方的box高度
      }
    }
  }

  getMinHeight(imgHeightArray, minHeight) {
    for (var i in imgHeightArray) {
      if (imgHeightArray[i] == minHeight) { //循环所有数组的高度 让它等于最小图片的高度 返回i值
        return i;
      }
    }
  }
  //这里是借助ionic的上拉加载代替网页的滚动监听实现加载更多
  doInfinite(infiniteScroll) {
    let parentNode = document.getElementById("container");
    for (var i = 0; i < this.img_data.length; i++) {
      let divNode = document.createElement("div"); //创建div节点
      divNode.className = "box";//为节点添加box类名
      parentNode.appendChild(divNode);//添加根元素
      let subDivNode = document.createElement("div");//创建节点
      subDivNode.className = "box_img";//为节点添加类名
      divNode.appendChild(subDivNode);//添加根元素
      var img = document.createElement("img");//创建节点
      img.src = this.img_data[i].src;//图片加载路径
      subDivNode.appendChild(img);//添加根元素
    }
    this.getNode();
    setTimeout(() => { infiniteScroll.complete() }, 1000);
  }
}
