import moment from 'moment';

var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding (s, len) {
  len = len - (s + '').length;
  for (var i = 0; i < len; i++) {
    s = '0' + s;
  }
  return s;
}
function Filter (str) {
  var RexStr = /<|>|"|'|&/g
  str = str.replace(RexStr, function (MatchStr) {
    switch (MatchStr) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case '\'':
        return '&#39;';
      case '&':
        return '&amp;';
      default:
        break;
    }
  })
  return str;
}

export default {
  getQueryStringByName: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    var context = '';
    if (r !== null) context = r[2];
    reg = null;
    r = null;
    return context === null || context === '' || context === 'undefined' ? '' : context;
  },
  formatDate: {
    format: function (date, pattern) {
      if (typeof date === 'number' || typeof date === 'string') {
        date = new Date(date)
      }
      pattern = pattern || DEFAULT_PATTERN;
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length);
          case 'M':
            return padding(date.getMonth() + 1, $0.length);
          case 'd':
            return padding(date.getDate(), $0.length);
          case 'w':
            return date.getDay() + 1;
          case 'h':
            return padding(date.getHours(), $0.length);
          case 'm':
            return padding(date.getMinutes(), $0.length);
          case 's':
            return padding(date.getSeconds(), $0.length);
        }
      });
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP);
      var matchs2 = dateString.match(/(\d)+/g);
      if (matchs1.length === matchs2.length) {
        var _date = new Date(1970, 0, 1);
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i]);
          var sign = matchs1[i];
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int);
              break;
            case 'M':
              _date.setMonth(_int - 1);
              break;
            case 'd':
              _date.setDate(_int);
              break;
            case 'h':
              _date.setHours(_int);
              break;
            case 'm':
              _date.setMinutes(_int);
              break;
            case 's':
              _date.setSeconds(_int);
              break;
          }
        }
        return _date;
      }
      return null;
    }
  },
  // 过滤直接移除HTML标签 formData: Object
  xssRemove (formData) {
    var regEx = /<[^>]*>/g;
    for (let i in formData) {
      if (typeof formData[i] === 'string') formData[i] = formData[i].replace(regEx, '')
    }
    return formData
  },
  // 过滤替换特殊字符 formData: Object
  xssFilter (formData) {
    for (let i in formData) {
      if (formData[i] === '') { // 适应后端接口奇葩需求，删除空值对象
        delete formData[i]
        continue
      }
      if (typeof formData[i] === 'string') formData[i] = Filter(formData[i])
    }
    return formData
  },
  formatTime (time, format = 'YYYY-MM-DD') {
    if (time) {
      return moment(time).format(format);
    }
    return time;
  },
  cookie: {
    set: function (name, value, days) {
      let d = new Date();
      let hostname = window.location.hostname
      let hostArr = hostname.split('.')
      let domain = hostArr.length < 3 ? hostname : (hostArr.splice(0, 1), hostArr.join('.'))
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
      window.document.cookie = name + '=' + value + ';path=/;domain=' + domain + ';expires=' + d.toGMTString();
    },
    get: function (name) {
      let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return v ? v[2] : null;
    },
    delete: function (name) {
      this.set(name, '', -1);
    }
  }
};
