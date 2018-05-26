let app = new Vue({
  el: '#app',
  data: {
    search: '',
    loading: true,
    dramaSerial: [],
    dramaSerialIndex: 0,
    searchResult: []
  },
  methods: {
    handleSelect(index) {
      this.dramaSerialIndex = index
      $('.dramaSerialList dl').addClass('hide')
      $('.dramaSerialList dl').eq(index).removeClass('hide')
    },
    handleSearch() {
      this.searchResult = []
      if (this.search.trim() === '') {
        return
      }
      let dds = $('.dramaSerialList dd')
      let dts = $('.dramaSerialList dt')
      let ids = []
      let resList = []
      let valueArr = this.search.split("")
      let searchResult = []
      valueArr.forEach((value) => {
        dds.each((index, dd) => {
          let content = $(dd).text()
          if (content.indexOf(value) >= 0) {
            let i = content.indexOf(value);
            content = content.replace(eval('/' + value + '/g'), "<span class=\"result\">" + value + "</span>")
            let title = dts.eq(index).text()
            if (ids.indexOf(index) < 0) {
              ids.push(index)
              let result = {
                count: 0,
                res: content,
                title: title,
                id: index
              }
              resList.push(result)
            } else {
              let result = resList[ids.indexOf(index)]
              result.count++
              let res = result.res
              result.res = res.replace(eval('/' + value + '/g'), "<span class=\"result\">" + value + "</span>")
            }
          }
        })
      })
      resList.sort((res1, res2) => {
        return (res2.count - res1.count) || (res1.id - res2.id);
      })
      console.log(searchResult)
      resList.forEach(result => {
        if (valueArr.length <= 2 || result.count >= (valueArr.length / 2)) {
          searchResult.push(result)
        }
      })
      this.searchResult = searchResult
    }
  },
  mounted() {
    $.get('/load', data => {
      let length = data.match(/<dd>/g).length
      let dramaSerial = []
      for (let i = 1; i <= length; i += 5) {
        dramaSerial.push(`${i}-${(i+4) > length ? length : (i+4)}`)
      }
      this.dramaSerial = dramaSerial
      let Jdata = $(data)
      Jdata.find('dl').addClass('hide')
      Jdata.find('dl:first').removeClass('hide')
      Jdata.find('dt').each(function (i) {
        this.id = `til${i}`
      })
      $('#juqing').append(Jdata)
      this.loading = false
    })
  }
})

document.addEventListener('touchmove', function (event) {
  if (event.cancelable) {
    // 判断默认行为是否已经被禁用
    if (!event.defaultPrevented) {
      event.preventDefault();
    }
  }
})