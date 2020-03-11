import apis from '../apis';

/**
 *
 * @returns {boolean}
 */
export const success = () => {
  const nums = parseInt(Math.random() * 100);
  return nums % 10 !== 0;
};
/**
 *
 * @param data
 * @returns {boolean}
 */
export const isExist = (data) => {
  return (
    (
      (!data) ||
      (data instanceof Array && !data.length) ||
      (JSON.stringify(data) === '{}')
    )
  );
};
/**
 *
 * @param params
 * @returns {*}
 */
export const stringify = (params) => {
  for (let key in params) {
    if (params[key] instanceof Array) {
      params[key] = JSON.stringify(params[key]);
    }
  }
  return params;
};
/**
 *
 * @param data
 * @returns {*}
 */
export const dataFilter = (data) => {
  data.map((item) => {
    let {browsing_time, pic_url, tags} = item;
    let defaultImage = apis.baseUrl + 'house/v1/file/static/userfile/202003/11/1237660841611137024.jpg';
    browsing_time = dateFormat(browsing_time, 'yyyy/mm/dd');
    pic_url = pic_url.length ? pic_url : [defaultImage];
    tags = tags.split(' ');

    item.browsing_time = browsing_time;
    item.pic_url = pic_url;
    item.tags = tags;
  });
  return data;
};
/**
 *
 * @param oldData
 * @param newData
 * @param attr
 * @returns {*}
 */
export const historyFilter = (data, attr) => {
  let obj = {};
  let result = [];

  data.forEach(item => {
    obj[item[attr]] || (obj[item[attr]] = []);
    obj[item[attr]] && obj[item[attr]].push(item);
  });

  for (let key in obj) {
    result.push({
      date: key,
      items: obj[key]
    });
  }
  return result;
};
/**
 *
 * @param date
 * @param format
 * @returns {string}
 */
export const dateFormat = (date, format) => {
  let dateStr = '';
  if (date) {
    let newDate = new Date(date.replace(/-/g, '/'));
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    let hour = newDate.getHours();
    let minute = newDate.getMinutes();
    let second = newDate.getSeconds();
    const monthStr = month > 9 ? '' + month : '0' + month;
    const dayStr = day > 9 ? '' + day : '0' + day;
    const hourStr = hour > 9 ? '' + hour : '0' + hour;
    const minuteStr = minute > 9 ? '' + minute : '0' + minute;
    const secondStr = second > 9 ? '' + second : '0' + second;
    switch (format) {
      case 'yyyy/mm/dd':
        dateStr = year + '/' + monthStr + '/' + dayStr;
        break;
      case 'yyyy/mm/dd hh':
        dateStr = year + '/' + monthStr + '/' + dayStr + ' ' + hourStr;
        break;
      case 'yyyy/mm/dd hh:mm':
        dateStr = year + '/' + monthStr + '/' + dayStr + ' ' + hourStr + ':' + minuteStr;
        break;
      case 'yyyy/mm/dd hh:mm:ss':
        dateStr = year + '/' + monthStr + '/' + dayStr + ' ' + hourStr + ':' + minuteStr + ':' + secondStr;
        break;
      case 'yyyy-mm-dd':
        dateStr = year + '-' + monthStr + '-' + dayStr;
        break;
    }
    newDate = null;
  }
  return dateStr;
};
/**
 *
 */
export const handleSaveImage = () => {
  wx.getSetting({
    success(res) {
      const {authSetting} = res || {};
      if (authSetting['scope.writePhotosAlbum'] === false) {
        wx.openSetting({
          success(res) {
            console.log(res);
          }
        });
      } else {
        saveImage();
      }
    }
  });
};
/**
 *
 */
export const saveImage = () => {
  setTimeout(() => {
    const imgUrl = 'http://sersms.com:7000/house/v1/file/static/userfile/202002/09/1226431602998263808.png';
    wx.downloadFile({
      url: imgUrl,
      success(res) {
        const {tempFilePath} = res || {};
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success() {
            wx.showToast({
              title: '图片已保存，快去分享给好友吧。',
              icon: 'none'
            });
          },
          fail(err) {
            console.log(err);
          }
        });
      },
      fail(err) {
        console.log(err);
      }
    });
  }, 300);
};

export const chooseImage = (that) => {
  wx.chooseImage({
    count: 1,
    sizeType: ['original'],
    success: (res) => {
      const src = res.tempFilePaths[0];
      that.$children[1].pushOrigin(src);
      console.log(res);
    },
    fail: (err) => {
      console.log(err);
    }
  });
};

export const getCropperImage = (that) => {
  that.$children[1].getCropperImage()
    .then((src) => {
      if (src) {
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [src] // 需要预览的图片http链接列表
        });
      } else {
        console.log('获取图片地址失败，请重试');
      }
    });
};
