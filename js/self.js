// 鼠标滑动爱心特效
// (function fairyDustCursor () {

//   var possibleColors = ["#e91818", "#37f2ff", "#ba70ce"]
//   var width = window.innerWidth
//   var height = window.innerHeight
//   var cursor = { x: width / 3, y: width / 3 }
//   var particles = []

//   function init () {
//     bindEvents()
//     loop()
//   }

//   // Bind events that are needed
//   function bindEvents () {
//     document.addEventListener('mousemove', onMouseMove)
//     document.addEventListener('touchmove', onTouchMove)
//     document.addEventListener('touchstart', onTouchMove)

//     window.addEventListener('resize', onWindowResize)
//   }

//   function onWindowResize (e) {
//     width = window.innerWidth
//     height = window.innerHeight
//   }

//   function onTouchMove (e) {
//     if (e.touches.length > 0) {
//       for (var i = 0; i < e.touches.length; i++) {
//         addParticle(e.touches[i].clientX, e.touches[i].clientY, possibleColors[Math.floor(Math.random() * possibleColors.length)])
//       }
//     }
//   }

//   function onMouseMove (e) {
//     cursor.x = e.clientX
//     cursor.y = e.clientY

//     addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)])
//   }

//   function addParticle (x, y, color) {
//     var particle = new Particle()
//     particle.init(x, y, color)
//     particles.push(particle)
//   }

//   function updateParticles () {

//     for (var i = 0; i < particles.length; i++) {
//       particles[i].update()
//     }

//     for (var i = particles.length - 1; i >= 0; i--) {
//       if (particles[i].lifeSpan < 0) {
//         particles[i].die()
//         particles.splice(i, 1)
//       }
//     }

//   }

//   function loop () {
//     requestAnimationFrame(loop)
//     updateParticles()
//   }

//   function Particle () {

//     this.character = "❤"
//     this.lifeSpan = 120 //ms
//     this.initialStyles = {
//       "position": "fixed",
//       "top": "0", //必须加
//       "display": "block",
//       "color": "#ba70ce",
//       "pointerEvents": "none",
//       "z-index": "10000000",
//       "fontSize": "12px",
//       "will-change": "transform"
//     }

//     this.init = function (x, y, color) {

//       this.velocity = {
//         x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
//         y: 1
//       }

//       this.position = { x: x - 20, y: y - 30 }
//       this.initialStyles.color = color

//       this.element = document.createElement('span')
//       this.element.innerHTML = this.character
//       applyProperties(this.element, this.initialStyles)
//       this.update()

//       document.body.appendChild(this.element)
//     }

//     this.update = function () {
//       this.position.x += this.velocity.x
//       this.position.y += this.velocity.y
//       this.lifeSpan--

//       this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 120) + ")"
//     }

//     this.die = function () {
//       this.element.parentNode.removeChild(this.element)
//     }

//   }

//   function applyProperties (target, properties) {
//     for (var key in properties) {
//       target.style[key] = properties[key]
//     }
//   }

//   init()
// })()

// 欢迎卡片
//根据经纬度计算两点距离(点1经度,点1纬度,点2经度,点2纬度)
function getDistance (lat1, lon1, lat2, lon2) {
  const R = 6371 // 地球平均半径，单位：千米
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // 单位：千米
  return Math.round(distance)
}
function showWelcome (data) {

  let dist = getDistance(120.13026, 30.25961, data.result.location.lng, data.result.location.lat)
  console.log(dist)

  let pos = data.result.ad_info.nation
  let posdesc
  switch (data.result.ad_info.nation) {
    case "日本":
      posdesc = "よろしく，一起去看樱花吗"
      break
    case "美国":
      posdesc = "Make America Great Again!"
      break
    case "英国":
      posdesc = "想同你一起夜乘伦敦眼"
      break
    case "俄罗斯":
      posdesc = "干了这瓶伏特加！"
      break
    case "法国":
      posdesc = "C'est La Vie"
      break
    case "德国":
      posdesc = "Die Zeit verging im Fluge."
      break
    case "澳大利亚":
      posdesc = "一起去大堡礁吧！"
      break
    case "加拿大":
      posdesc = "拾起一片枫叶赠予你"
      break
    case "中国":
      pos = data.result.ad_info.province + " " + data.result.ad_info.city
      switch (data.result.ad_info.province) {
        case "北京市":
          posdesc = "北——京——欢迎你~~~"
          break
        case "天津市":
          posdesc = "讲段相声吧。"
          break
        case "重庆市":
          posdesc = "老乡！！！"
          break
        case "河北省":
          posdesc = "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。"
          break
        case "山西省":
          posdesc = "展开坐具长三尺，已占山河五百余。"
          break
        case "内蒙古自治区":
          posdesc = "天苍苍，野茫茫，风吹草低见牛羊。"
          break
        case "辽宁省":
          posdesc = "我想吃烤鸡架！"
          break
        case "吉林省":
          posdesc = "状元阁就是东北烧烤之王。"
          break
        case "黑龙江省":
          posdesc = "很喜欢哈尔滨大剧院。"
          break
        case "上海市":
          posdesc = "众所周知，中国只有两个城市。"
          break
        case "江苏省":
          switch (data.result.ad_info.city) {
            case "南京市":
              posdesc = "欢迎来自安徽省南京市的小伙伴。"
              break
            case "苏州市":
              posdesc = "上有天堂，下有苏杭。"
              break
            default:
              posdesc = "散装是必须要散装的。"
              break
          }
          break
        case "浙江省":
          posdesc = "身在江南痴西湖，一湖烟雨入诗墨。"
          break
        case "安徽省":
          posdesc = "蚌埠住了，芜湖起飞。"
          break
        case "福建省":
          posdesc = "井邑白云间，岩城远带山。"
          break
        case "江西省":
          posdesc = "落霞与孤鹜齐飞，秋水共长天一色。"
          break
        case "山东省":
          posdesc = "遥望齐州九点烟，一泓海水杯中泻。"
          break
        case "湖北省":
          posdesc = "来碗热干面！"
          break
        case "湖南省":
          posdesc = "74751，长沙斯塔克。"
          break
        case "广东省":
          posdesc = "老板来两斤福建人。"
          break
        case "广西壮族自治区":
          posdesc = "桂林山水甲天下。"
          break
        case "海南省":
          posdesc = "朝观日出逐白浪，夕看云起收霞光。"
          break
        case "四川省":
          posdesc = "康康川妹子。"
          break
        case "贵州省":
          posdesc = "茅台，学生，再塞200。"
          break
        case "云南省":
          posdesc = "玉龙飞舞云缠绕，万仞冰川直耸天。"
          break
        case "西藏自治区":
          posdesc = "躺在茫茫草原上，仰望蓝天。"
          break
        case "陕西省":
          posdesc = "来份臊子面加馍。"
          break
        case "甘肃省":
          posdesc = "羌笛何须怨杨柳，春风不度玉门关。"
          break
        case "青海省":
          posdesc = "牛肉干和老酸奶都好好吃。"
          break
        case "宁夏回族自治区":
          posdesc = "大漠孤烟直，长河落日圆。"
          break
        case "新疆维吾尔自治区":
          posdesc = "驼铃古道丝绸路，胡马犹闻唐汉风。"
          break
        case "台湾省":
          posdesc = "我在这头，大陆在那头。"
          break
        case "香港特别行政区":
          posdesc = "永定贼有残留地鬼嚎，迎击光非岁玉。"
          break
        case "澳门特别行政区":
          posdesc = "性感荷官，在线发牌。"
          break
        default:
          posdesc = "愿世界和平，再无泪水！"
          break
      }
      break
    default:
      posdesc = "带我去你的国家逛逛吧。"
      break
  }

  //判断时间
  let timeChange
  let date = new Date()
  if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<img class='icon' src='../icon/taiyang.png' /><span>上午好</span>，一日之计在于晨"
  else if (date.getHours() >= 1 && date.getHours() < 13) timeChange = "<img class='icon' src='../icon/yu.png' /><span>中午好</span>，该摸鱼吃午饭了"
  else if (date.getHours() >= 13 && date.getHours() < 15) timeChange = "<img class='icon' src='../icon/shuijue.png' /><span>下午好</span>，懒懒地睡个午觉吧！"
  else if (date.getHours() >= 15 && date.getHours() < 16) timeChange = "<img class='icon' src='../icon/naicha.png' /><span>三点几啦</span>，饮茶先啦！"
  else if (date.getHours() >= 16 && date.getHours() < 19) timeChange = "<img class='icon' src='../icon/xiyang.png' /><span>夕阳无限好！</span>"
  else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<img class='icon' src='../icon/yemaozi.png' /><span>晚上好</span>，夜生活嗨起来！"
  else timeChange = "<img class='icon' src='../icon/xiuxi.png' />夜深了，早点休息，少熬夜"
  document.getElementsByClassName("item-headline")[0].innerHTML = `欢迎小伙伴!`
  document.getElementsByClassName("announcement_content")[0].innerHTML =
    `<div class='item'>
    ${timeChange}!
    </div>
    <span style="color:#00FFFF">Nanako</span>距离你约有<span style="color:#00FFFF">${dist}</span>公里!<br/>
    ${posdesc}
  `
}
//get请求
$.ajax({
  type: 'get',
  url: 'https://apis.map.qq.com/ws/location/v1/ip',
  data: {
    key: '你获取的key',
    output: 'jsonp',
  },
  dataType: 'jsonp',
  success: function (res) {
    ipLoacation = res
    showWelcome(ipLoacation)
  }
})

document.addEventListener('pjax:complete', todis)
document.addEventListener('DOMContentLoaded', todis)
function todis () {
  $.ajax({
    type: 'get',
    url: 'https://apis.map.qq.com/ws/location/v1/ip',
    data: {
      key: 'QZUBZ-GW4CQ-DQC56-2X342-E6FCE-4JBJZ',
      output: 'jsonp',
    },
    dataType: 'jsonp',
    success: function (res) {
      console.log(res)
      ipLoacation = res
      function getDistance (lat1, lon1, lat2, lon2) {
        const R = 6371 // 地球平均半径，单位：千米
        const dLat = (lat2 - lat1) * Math.PI / 180
        const dLon = (lon2 - lon1) * Math.PI / 180
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c // 单位：千米
        return Math.round(distance)
      }
      showWelcome(ipLoacation)
    }
  })
  function switchPostChart () {
    let color = document.documentElement.getAttribute('data-theme') === 'light' ? '#4C4948' : 'rgba(255,255,255,0.7)'
    if (document.getElementById('posts-chart') && postsOption) {
      try {
        let postsOptionNew = postsOption
        postsOptionNew.title.textStyle.color = color
        postsOptionNew.xAxis.nameTextStyle.color = color
        postsOptionNew.yAxis.nameTextStyle.color = color
        postsOptionNew.xAxis.axisLabel.color = color
        postsOptionNew.yAxis.axisLabel.color = color
        postsOptionNew.xAxis.axisLine.lineStyle.color = color
        postsOptionNew.yAxis.axisLine.lineStyle.color = color
        postsOptionNew.series[0].markLine.data[0].label.color = color
        postsChart.setOption(postsOptionNew)
      } catch (error) {
        console.log(error)
      }
    }
    if (document.getElementById('tags-chart') && tagsOption) {
      try {
        let tagsOptionNew = tagsOption
        tagsOptionNew.title.textStyle.color = color
        tagsOptionNew.xAxis.nameTextStyle.color = color
        tagsOptionNew.yAxis.nameTextStyle.color = color
        tagsOptionNew.xAxis.axisLabel.color = color
        tagsOptionNew.yAxis.axisLabel.color = color
        tagsOptionNew.xAxis.axisLine.lineStyle.color = color
        tagsOptionNew.yAxis.axisLine.lineStyle.color = color
        tagsOptionNew.series[0].markLine.data[0].label.color = color
        tagsChart.setOption(tagsOptionNew)
      } catch (error) {
        console.log(error)
      }
    }
    if (document.getElementById('categories-chart') && categoriesOption) {
      try {
        let categoriesOptionNew = categoriesOption
        categoriesOptionNew.title.textStyle.color = color
        categoriesOptionNew.legend.textStyle.color = color
        if (!categoryParentFlag) { categoriesOptionNew.series[0].label.color = color }
        categoriesChart.setOption(categoriesOptionNew)
      } catch (error) {
        console.log(error)
      }
    }
  }
  document.querySelector(".rightMenu-item:has(.fa-moon)").addEventListener("click", function () { setTimeout(switchPostChart, 100) })
  document.getElementById("con-mode").addEventListener("click", function () { setTimeout(switchPostChart, 100) })
}

// 鼠标指针
var CURSOR

Math.lerp = (a, b, n) => (1 - n) * a + n * b

const getStyle = (el, attr) => {
  try {
    return window.getComputedStyle
      ? window.getComputedStyle(el)[attr]
      : el.currentStyle[attr]
  } catch (e) { }
  return ""
}

class Cursor {
  constructor() {
    this.pos = { curr: null, prev: null }
    this.pt = []
    this.create()
    this.init()
    this.render()
  }

  move (left, top) {
    this.cursor.style["left"] = `${left}px`
    this.cursor.style["top"] = `${top}px`
  }

  create () {
    if (!this.cursor) {
      this.cursor = document.createElement("div")
      this.cursor.id = "cursor"
      this.cursor.classList.add("hidden")
      document.body.append(this.cursor)
    }

    var el = document.getElementsByTagName('*')
    for (let i = 0; i < el.length; i++)
      if (getStyle(el[i], "cursor") == "pointer")
        this.pt.push(el[i].outerHTML)

    document.body.appendChild((this.scr = document.createElement("style")))
    this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='.5'/></svg>") 4 4, auto}`
  }

  refresh () {
    this.scr.remove()
    this.cursor.classList.remove("hover")
    this.cursor.classList.remove("active")
    this.pos = { curr: null, prev: null }
    this.pt = []

    this.create()
    this.init()
    this.render()
  }

  init () {
    document.onmouseover = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover")
    document.onmouseout = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover")
    document.onmousemove = e => { (this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8); this.pos.curr = { x: e.clientX - 8, y: e.clientY - 8 }; this.cursor.classList.remove("hidden") }
    document.onmouseenter = e => this.cursor.classList.remove("hidden")
    document.onmouseleave = e => this.cursor.classList.add("hidden")
    document.onmousedown = e => this.cursor.classList.add("active")
    document.onmouseup = e => this.cursor.classList.remove("active")
  }

  render () {
    if (this.pos.prev) {
      this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15)
      this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15)
      this.move(this.pos.prev.x, this.pos.prev.y)
    } else {
      this.pos.prev = this.pos.curr
    }
    requestAnimationFrame(() => this.render())
  }
}

(() => {
  CURSOR = new Cursor()
  // 需要重新获取列表时，使用 CURSOR.refresh()
})()

// 博客失焦改变标题
/* 去焦点 Start*/
let urlList = []
function handleVisibilityChange() {
  if (document.visibilityState === 'hidden') {
    if (!urlList.find( (item, index) => {
      if (item.url === document.documentURI) return true
    } )) {
      urlList.push({
        url: document.documentURI,
        title: document.title
      })
      document.title = 'o_o ....'
    }
  } else {
    urlList.find( (item, index) => {
      if (item.url === document.documentURI) {
        document.title = '蛤蛤，上当了！';
        setTimeout(() => {
          document.title = item.title;
          urlList.splice(index, 1)
        }, 2000)
        return true
      }
    } )
  }
}

document.addEventListener('visibilitychange', handleVisibilityChange, false)
