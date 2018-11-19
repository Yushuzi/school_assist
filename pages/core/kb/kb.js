//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    colorArrays: ["#FFCB63", "#7ACFA6", "#73B4EF", "#E78AB0", "#9F8BEA", "#61BC69", "#FFCB63", "#7ACFA6", "#73B4EF", "#E78AB0", "#9F8BEA", "#61BC69"],
    skjcs: {
      "8:30": 1,
      "10:25": 3,
      "13:30": 5,
      "15:25": 7,
      "17:05": 9
    },
    wlist: []
  },
  onLoad: function () {
    console.log('onLoad')
    var week = 12
    var _this = this;
    wx.request({
      url: "http://127.0.0.1:8080/getScheduleOrderByWeek",
      data: {
        account: '1712213023',
        passwd: '19960119swj'
      },
      success: function (res) {
        console.log("1111111")
        if (res.data) {
          console.log(JSON.stringify(res.data[week]))
          let schedules = res.data[week]
          for (var index in schedules) {
            console.log(_this.data.skjcs[schedules[index].time.split(" ~ ")[0]]);
            var item = {}
            item.xqj = schedules[index].weeks_text
            item.skjc = _this.data.skjcs[schedules[index].time.split(" ~ ")[0]]
            item.skcd = schedules[index].section
            item.kcmc = schedules[index].name
            item.place = schedules[index].place
            if (schedules[index].section == 3) {
              item.skcd = 5
            }
            _this.data.wlist.push(item)
          }

          console.log(JSON.stringify(_this.data.wlist))
          _this.setData({
            wlist: _this.data.wlist
          });


        } else {

        }
      },
      fail: function (res) {
        console.log("2222222222")
      }
    });
  }
})
