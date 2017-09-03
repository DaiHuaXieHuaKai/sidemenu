import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { AppConfig } from './../app/app.config';
import { LoadingController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { Storage } from '@ionic/storage';

declare let GaoDe: any;
@Injectable()
export class UtilProvider {
  headers: any;
  options: any;
  token: string = "tokenrenzheng";
  constructor(public http: Http, private storage: Storage, private themeableBrowser: ThemeableBrowser,
    private loadingCtrl: LoadingController, private platform: Platform, private geolocation: Geolocation,
    private camera: Camera, private transfer: FileTransfer, private file: File) {
    let this_ = this;
    this.storage.get("User").then((value) => {
      console.log(value)
      // if (value) {
      //   this_.token = JSON.parse(value).token;
      // }
    })
    this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Auth-Token': this.token });
    this.options = new RequestOptions({
      headers: this.headers
    });
  }


  /* 
    网络请求
  */
  //将POST参数序列化，解决后台接收不到参数问题
  private serialize(obj) {
    let result = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toParam(key, value));
        }
        result = result.concat(queryValues);
      } else {
        result.push(this.toParam(key, values));
      }
    }
    return result.join('&');
  }
  private toParam(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }


  /* 
  get 请求
  */
  get(uri) {
    let this_ = this;
    return new Promise((resolve, reject) => {
      this.http.get(AppConfig.Url + uri, this_.options).map(res => res.json()).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error)
      })
    })
  }
  /* 
  post 请求
  */
  post(uri, data) {
    let this_ = this;
    return new Promise((resolve, reject) => {
      this.http.post(AppConfig.Url + uri, this.serialize(data), this_.options).map(res => res.json()).subscribe(data => {
        resolve(data);
      }, error => {
        reject(error)
      })
    })
  }





  /* 
  打开外部链接
  */
  openUrl(data) {
    let options = {
      statusbar: {
        color: '#b7ebf9'
      },
      toolbar: {
        height: 44,
        color: '#b7ebf9'
      },
      title: {
        color: '#0b71a5',
        staticText: '',
        showPageTitle: true
      },
      backButton: {
        wwwImage: 'assets/images/back/back.png',
        wwwImagePressed: 'assets/images/back/back-press.png',
        wwwImageDensity: 2,
        align: 'left',
        event: 'backPressed'
      },
      backButtonCanClose: true
    }
    this.themeableBrowser.create(data.weixin_url, '_blank', options);
  }

  /* 
  使用loading显示提示消息，不带loading动画
  */
  showLoading(content) {
    let loading = this.loadingCtrl.create({
      spinner: "hide",
      content: content,
      duration: 1500
    })
    loading.present();
  }


  /* 
  emoj图片
  */
  getEmoj() {
    const emojs = "🏠 🏡 🏫 🏢 🏣 🏥 🏦 🏪 🏩 🏨 💒 ⛪ ️🏬 🏤 🌇 🌆 🌄 🗻 🗾 🗼 🏭 ⛺ ️🏰 🏯 😊 😍 😘 😳 😡 😓 😭 😲 😁 😱 😖 😉 😏 😜 😰 😢 😚 😄 😪 😣 😔 😠 😌 😝 😂 😥 😃 😨 😒 😷 😞 👿 👽 😁 😄 😇 😯 😕 😂 😅 😈 😐 😠 😀 😃 😆 😉 😑 😬 😮 😥 😨 😟 😢 😣 😦 😩 😱 😵 😴 😤 😧 😰 😶 😷 😝 😙 😎 😖 😞 😛 😋 😭 😔 😒 😜 😗 😚 😌 😪 😏 🙋 🙅 🙎 😼 😻 🙌 🙆 🙏 😸 😽 😫 🙍 🙇 ☺ 😁 😄 😇 😯 😕 😂 😅 😈 😐 😠 😀 😃 😆 😉 😑 😬 😮 😥 😨 😟 😢 😣 😦 😩 😱 😵 😴 😤 😧 😰 😶 😷 😝 😙 😎 😖 😞 😛 😋 😭 😔 😒 😜 😗 😚 😌 😪 😏 🙋 🙅 🙎 😼 😻 🙌 🙆 🙏 😸 😽 😫 🙍 🙇 😺 😹 😿 😾 🙉 👶 👨 👵 🙀 🙊 👦 👩 😄 😃 😀 ☺ ️😉 😚 😗 😙 😜 😝 😛 😁 😔 😌 😒 😞 😣 😢 😂 😭 😪 😥 😰 😅 😩 😫 😨 😱 😠 😤 😖 😆 😋 😷 😎 😴 😵 😟 😦 😧 😈 👿 😮 😬 😐 😕 😯 😶 😇 😏 😑 👲 👳 👮 👷 💂 👶 👦 👧 👨 👩 👴 👵 👱 👼 👸 😺 😸 😻 😽 😼 🙀 😿 😹 😾 👹 👺 🙈 🙉 🙊 💀 👽 👀 👃 👄 👂 ❤ 💔 💘 💝 💜 💛 💚 💙 💩 👍 👎 👊 ✌ 👌 💪 👆 👇 👈 👉 ✊ 👐 🙏 🙌 👏 👧 👦 👩 👨 👶 👵 👴 👳 👳 👳 👲 👸 👸 👷 💂 👮 🙆 🙅 💇 🙅 💇 💆 💁 💁 👯 👫 👫 🎎 🚶 🏃 💃 💑 💏 👼 💀 🐱 🐶 🐭 🐹 🐰 🐺 🐸 🐯 🐨 🐻 🐷 🐮 🐗 🐵 🐙 🐛 🐔 🐧 🐦 🐍 🐴 🐠 🐳 🐬 ☀ ☔ 🌙 ✨ ⭐ ⚡ ☁ ⛄ 🌊 ❗ ❓ 🌻 🌺 🌹 🔥 🎵 💦 💤 🌷 🌸 💐 🍀 🌾 🍃 🍂 🎃 👻 🎅 🌵 🌴 🎍 🍁 🎄 🔔 🎉 🎈 💿 📷 🎥 📬 💡 🔑 🔒 🔓 📺 💻 🛀 💰 🔫 💊 ⚽ 🏈 🏀 🎾 🎿 🏄 🏊 🏆 👾 🎤 🎸 👙 👑 🌂 👜 💄 💅 💍 🎁 💎 ☕ 🎂 🍰 🍺 🍻 🍸 🍵 🍶 🍔 🍟 🍝 🍜 🍧 🍦 🍡 🍙 🍘 🍞 🍛 🍚 🍲 🍱 🍣 🍎 🍓 🍉 🍆 🍅 🍊 🚀 🚄 🚉 🚃 🚗 🚕 🚓 🚒 🚑 🚙 🚲 🏁 🚹 🚺 ⭕ ❌ 😺 😹 😿 😾 🙉 👶 👨 👵 🙀 🙊 👦 👩 💏 🙈 💩 👧 👴 💑 👪 👫 👬 👭 👮 💂 👸 👱 💃 👤 👷 👯 🎅 👲 💆 👥 💁 👰 👼 👳 💇 💅 👺 👿 👀 👣 💋 👻 👽 💀 👂 👄 ❤ 👹 👾 💪 👃 👅 💙 💚 💓 💖 💝 👍 ✊ 💛 💔 💗 💞 👎 ✌ 💜 💕 💘 💟 👌 ✋ 👊 👇 👋 ☝ 👈 👏 👆 👉 👐 🔰 👟 🎩 ⌚ 👖 👙 💄 👑 🎓 👔 👗 👠 👞 👒 👓 👕 👘 👡 👢 💼 👛 💲 💶 💱 👚 🎒 💰 💵 💷 💹 👜 👝 💳 💴 💸 🔫 🔪 💊 🔕 🔭 🔋 📗 💣 🚬 🚪 🔮 🔌 📘 💉 🔔 🔬 🔦 📜 📙 📚 📑 📖 🎃 🎁 🎆 📔 📓 📰 🎄 🎂 🎇 📒 📕 📛 🎀 🎈 🎉 🎊 🎌 🎎 📟 📠 📨 🎍 🎐 📱 ☎ 📦 📩 🎏 🎋 📲 📞 ✉ 📪 📫 📮 📯 📡 ✒ 📏 📭 📤 📢 💬 ✏ 📐 📬 📥 📣 💭 📝 📍 📌 💺 💾 📅 📁 📄 📎 💻 💿 📇 📂 📊 ✂ 💽 📆 📋 📃 📈 📉 🎢 🎨 📷 🎭 🎲 ⛺ 🎠 🎬 📹 🎫 🎰 🎡 🎪 🎥 🎦 🎮 🃏 🎴 📺 📼 🎵 🎻 🎺 🀄 📻 🎧 🎶 🎹 🎸 🎯 📀 🎤 🎼 🎷 〽 🐕 🐈 🐁 🐢 🐓 🐤 🐶 🐱 🐭 🐇 🐔 🐥 🐩 🐀 🐹 🐰 🐣 🐦 🐏 🐺 🐄 🐗 🐽 🐼 🐑 🐃 🐮 🐖 🐸 🐧 🐐 🐂 🐴 🐷 🐍 🐘 🐨 🐆 🐫 🐳 🐠 🐚 🐒 🐯 🐪 🐋 🐡 🐬 🐵 🐻 🐊 🐟 🐙 🐌 🐛 🐞 🐾 🍻 🍶 🍼 🐜 🐲 🍸 🍷 ☕ 🍴 🐝 🐉 🍺 🍹 🍵 🍨 🍧 🍰 🍬 🍯 🍟 🍖 🍦 🍪 🍭 🍳 🍝 🍗 🍩 🍫 🍮 🍔 🍕 🍤 🍣 🍜 🍛 🍢 🍠 🍏 🍱 🍙 🍲 🍡 🍌 🍊 🍞 🍚 🍥 🍘 🍎 🍋 🍄 🍇 🍐 🍓 🌴 🌴 🍅 🍈 🍑 🍍 🌲 🌵 🍆 🍉 🍒 🌰 🌳 🌷 🌸 🍁 🌺 🌽 ☀ ☁ 🌹 🍂 🌻 🌾 🌈 🌁 🍀 🍃 🌼 🌿 ⛅ 🌂 ☔ 🌀 🌙 🌚 🌑 🌔 💧 ❄ 🌞 🌛 🌒 🌕 ⚡ ⛄ 🌝 🌜 🌓 🌖 🌗 🌄 🌆 🌉 🌎 🌐 🌘 🌅 🌃 🌊 🌏 🌟 🎑 🌇 🌌 🌋 🌍 🌠 🏠 🏣 🏦 🏩 ⛪ 🏯 🏡 🏤 🏧 🏪 ⛲ 🏰 🏢 🏥 🏨 🏫 🏬 🏭 🗻 🗾 🏮 🔨 🛁 🚾 🗼 🗿 💈 🔩 🛀 🎽 🗽 ⚓ 🔧 🚿 🚽 🎣 🎱 🎿 🏂 🏂 🏆 🏈 🎳 🎾 🏀 🏃 🏇 🏉 ⚾ ⚽ 🏁 🏄 🐎 🏊 🚂 🚅 Ⓜ 🚋 🚎 🚑 🚃 🚆 🚈 🚌 🚏 🚒 🚄 🚇 🚊 🚍 🚐 🚓 🚔 🚗 🚚 🚝 🚠 🚣 🚕 🚘 🚛 🚞 🚡 🚁 🚖 🚙 🚜 🚢 🚢 ✈ 🛂 🛅 🚳 🚷 🚀 ⛽ 🛃 ⛵ 🚴 🚸 🚤 🅿 🛄 🚲 🚵 🚉 🚶 🚥 🚦 ♨ 💎 🚧 💌 💐 🚨 💍 💒 💏 🙈 💩 👧 👴 💑 👪 👫 👬 👭 👮 💂 👸 👱 💃 👤 👷 👯 🎅 👲 💆 👥 💁 👰 👼 👳 💇 💅 👺 👿 👀 👣 💋 👻 👽 💀 👂 👄 ❤ 👹 👾 💪 👃 👅 💙 💚 💓 💖 💝 👍 ✊ 💛 💔 💗 💞 👎 ✌ 💜 💕 💘 💟 👌 ✋ 👊 👇 👋 ☝ 👈 👏 👆 👉 👐 🔰 👟 🎩 ⌚ 👖 👙 💄 👑 🎓 👔 👗 👠 👞 👒 👓 👕 👘 👡 👢 💼 👛 💲 💶 💱 👚 🎒 💰 💵 💷 💹 👜 👝 💳 💴 💸 🔫 🔪 💊 🔕 🔭 🔋 📗 💣 🚬 🚪 🔮 🔌 📘 💉 🔔 🔬 🔦 📜 📙 📚 📑 📖 🎃 🎁 🎆 📔 📓 📰 🎄 🎂 🎇 📒 📕 📛 🎀 🎈 🎉 🎊 🎌 🎎 📟 📠 📨 🎍 🎐 📱 ☎ 📦 📩 🎏 🎋 📲 📞 ✉ 📪 📫 📮 📯 📡 ✒ 📏 📭 📤 📢 💬 ✏ 📐 📬 📥 📣 💭 📝 📍 📌 💺 💾 📅 📁 📄 📎 💻 💿 📇 📂 📊 ✂ 💽 📆 📋 📃 📈 📉 🎢 🎨 📷 🎭 🎲 ⛺ 🎠 🎬 📹 🎫 🎰 🎡 🎪 🎥 🎦 🎮 🃏 🎴 📺 📼 🎵 🎻 🎺 🀄 📻 🎧 🎶 🎹 🎸 🎯 📀 🎤 🎼 🎷 〽 🐕 🐈 🐁 🐢 🐓 🐤 🐶 🐱 🐭 🐇 🐔 🐥 🐩 🐀 🐹 🐰 🐣 🐦 🐏 🐺 🐄 🐗 🐽 🐼 🐑 🐃 🐮 🐖 🐸 🐧 🐐 🐂 🐴 🐷 🐍 🐘 🐨 🐆 🐫 🐳 🐠 🐚 🐒 🐯 🐪 🐋 🐡 🐬 🐵 🐻 🐊 🐟 🐙 🐌 🐛 🐞 🐾 🍻 🍶 🍼 🐜 🐲 🍸 🍷 ☕ 🍴 🐝 🐉 🍺 🍹 🍵 🍨 🍧 🍰 🍬 🍯 🍟 🍖 🍦 🍪 🍭 🍳 🍝 🍗 🍩 🍫 💩 🔥 ✨ 🌟 💫 💥 💢 💦 💧 💤 💨 👂 👀 👃 👅 👄 👍 👎 👌 👊 ✊ ✌ ️👋 ✋ 👐 👆 👇 👉 👈 🙌 🙏 ☝ ️👏 💪 🚶 🏃 💃 👫 👪 👬 👭 💏 💑 👯 🙆 🙅 💁 🙋 💆 💇 💅 👰 🙎 🙍 🙇 🎩 👑 👒 👟 👞 👡 👠 👢 👕 👔 👚 👗 🎽 👖 👘 👙 💼 👜 👝 👛 👓 🎀 🌂 💄 💛 💙 💜 💚 ❤ ️💔 💗 💓 💕 💖 💞 💘 💌 💋 💍 💎 👤 👥 💬 👣 💭 🐶 🐺 🐱 🐭 🐹 🐰 🐸 🐯 🐨 🐻 🐷 🐽 🐮 🐗 🐵 🐒 🐴 🐑 🐘 🐼 🐧 🐦 🐤 🐥 🐣 🐔 🐍 🐢 🐛 🐝 🐜 🐞 🐌 🐙 🐚 🐠 🐟 🐬 🐳 🐋 🐄 🐏 🐀 🐃 🐅 🐇 🐉 🐎 🐐 🐓 🐕 🐖 🐁 🐂 🐲 🐡 🐊 🐫 🐪 🐆 🐈 🐩 🐾 💐 🌸 🌷 🍀 🌹 🌻 🌺 🍁 🍃 🍂 🌿 🌾 🍄 🌵 🌴 🌲 🌳 🌰 🌱 🌼 🌐 🌞 🌝 🌚 🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘 🌜 🌛 🌙 🌍 🌎 🌏 🌋 🌌 🌠 ⭐ ️☀ ️⛅ ☁ ⚡ ️☔ ️❄ ️⛄ ️🌀 🌁 🌈 🌊 🎍 💝 🎎 🎒 🎓 🎏 🎆 🎇 🎐 🎑 🎃 👻 🎅 🎄 🎁 🎋 🎉 🎊 🎈 🎌 🔮 🎥 📷 📹 📼 💿 📀 💽 💾 💻 📱 ☎ ️📞 📟 📠 📡 📺 📻 🔊 🔉 🔈 🔇 🔔 🔕 📢 📣 ⏳ ⌛ ⏰ ⌚ ️🔓 🔒 🔏 🔐 🔑 🔎 💡 🔦 🔆 🔅 🔌 🔋 🔍 🛁 🛀 🚿 🚽 🔧 🔩 🔨 🚪 🚬 💣 🔫 🔪 💊 💉 💰 💴 💵 💷 💶 💳 💸 📲 📧 📥 📤 ✉ ️📩 📨 📯 📫 📪 📬 📭 📮 📦 📝 📄 📃 📑 📊 📈 📉 📜 📋 📅 📆 📇 📁 📂 ✂ ️📌 📎 ✒ ️✏ ️📏 📐 📕 📗 📘 📙 📓 📔 📒 📚 📖 🔖 📛 🔬 🔭 📰 🎨 🎬 🎤 🎧 🎼 🎵 🎶 🎹 🎻 🎺 🎷 🎸 👾 🎮 🃏 🎴 🀄 ️🎲 🎯 🏈 🏀 ⚽ ️⚾ 🎾 🎱 🏉 🎳 ⛳ ️🚵 🚴 🏁 🏇 🏆 🎿 🏂 🏊 🏄 🎣 ☕ ️🍵 🍶 🍼 🍺 🍻 🍸 🍹 🍷 🍴 🍕 🍔 🍟 🍗 🍖 🍝 🍛 🍤 🍱 🍣 🍥 🍙 🍘 🍚 🍜 🍲 🍢 🍡 🍳 🍞 🍩 🍮 🍦 🍨 🍧 🎂 🍰 🍪 🍫 🍬 🍭 🍯 🍎 🍏 🍊 🍋 🍒 🍇 🍉 🍓 🍑 🍈 🍌 🍐 🍍 🍠 🍆 🍅 🌽 🏠 🏡 🏫 🏢 🏣 🏥 🏦 🏪 🏩 🏨 💒 ⛪ ️🏬 🏤 🌇 🌆 🏯 🏰 ⛺ ️🏭 🗼 🗾 🗻 🌄 🌅 🌃 🗽 🌉 🎠 🎡 ⛲ 🎢 🚢 ⛵ ️🚤 🚣 ⚓ ️🚀 ✈ ️💺 🚁 🚂 🚊 🚉 🚞 🚆 🚄 🚅 🚈 🚇 🚝 🚋 🚃 🚎 🚌 🚍 🚙 🚘 🚗 🚕 🚖 🚛 🚚 🚨 🚓 🚔 🚒 🚑 🚐 🚲 🚡 🚟 🚠 🚜 💈 🚏 🎫 🚦 🚥 ⚠ ️🚧 🔰 ⛽ ️🏮 🎰 ♨ ️🗿 🎪 🎭 📍 🚩"
    let array = emojs.split(" ");
    return array;
  }

  /* 
  获取地理位置
  */
  getLocation() {
    return new Promise((resolve, reject) => {
      let locationJson = {
        lat: "",
        lng: ""
      };
      if (this.platform.is("android")) {
        GaoDe.getCurrentPosition((result: any) => {
          if (result.status == "定位成功") {
            locationJson.lat = result.latitude;
            locationJson.lng = result.longitude;
            resolve(locationJson);
          }
        }, (error) => {
          reject(0);
        })
      }
      if (this.platform.is("ios")) {
        this.geolocation.getCurrentPosition({ timeout: 10000, enableHighAccuracy: true }).then((result: any) => {
          locationJson.lat = result.coords.latitude;
          locationJson.lng = result.coords.longitude;
          resolve(locationJson);
        }).catch((error) => {
          reject(0);
        })
      }
    })
  }


  /* 
  选择图片
  */
  selectImage(type) {
    return new Promise((resolve, reject) => {
      let options: any = {
        quality: 30,
        destinationType: this.camera.DestinationType.FILE_URI,
        // correctOrientation: true
      };
      if (type == 0) {
        options.sourceType = this.camera.PictureSourceType.CAMERA
        this.camera.getPicture(options).then((imageData) => {
          resolve(imageData);
        }, (err) => {
          //获取图片失败
          reject(0);
        });
      }
      if (type == 1) {
        //图库
        options.sourceType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
        this.camera.getPicture(options).then((imageData) => {
          // let image = imageData.split(".jpg", 1) + ".jpg";
          resolve(imageData);
        }, (err) => {
          reject(0);
        });
      }
    })
  }
  /* 
  上传图片
  */
  uploadImage(file,typeUri) {
    return new Promise((resolve, reject) => {
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options = {
        fileKey: 'file',
        fileName: file.substr(file.lastIndexOf('/') + 1),
        header: { 'Content-Type': 'multipart/form-data' },
        chunkedMode: false,
        mimeType: "image/jpeg",
      }
      let url = AppConfig.Url + typeUri;
      let uri = encodeURI(url);
      let loading = this.loadingCtrl.create({
        content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">
         正在上传...
        </div>
      </div>`,
        cssClass: 'loadingStyle',
        dismissOnPageChange: true
      });

      loading.onDidDismiss(() => {
      });

      loading.present();

      fileTransfer.upload(file, uri, options).then((result) => {
        loading.dismiss();
        let code = JSON.stringify(result);
        if (JSON.parse(code).responseCode == 200) {
          let file = JSON.parse(JSON.parse(code).response);
          resolve(file)
        } else {
          reject(0);
        }
      }, (error) => {
        loading.dismiss();
        reject(0);
      })
    })
  }
}
