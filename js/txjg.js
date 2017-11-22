let search = document.getElementById('search');
let del = document.getElementById('del');
let searchList = document.getElementById('searchList');
let dls = document.querySelectorAll('dl');
let dts = document.querySelectorAll('dt');
let dds = document.querySelectorAll('dd');
let dramaSerialSelector = document.getElementById('dramaSerialSelector');
let dramaSerialSelectors = document.querySelectorAll('#dramaSerialSelector > li');
dts.forEach((dt, i) => {
  dt.id = `til${i}`;
})
search.onkeyup = function (event) {
  if (event.keyCode === 13) {
    searchList.innerHTML = "";
    let ids = [];
    let resList = [];
    let valueArr = search.value.split("");
    valueArr.forEach((value) => {
      dds.forEach((dd, index) => {
        let content = dd.textContent;
        if (content.indexOf(value) >= 0) {
          let i = content.indexOf(value);
          /* let startC = content.substring(0, i);
          let start = (startC.lastIndexOf("？") > startC.lastIndexOf('。') ? startC.lastIndexOf("？") : startC.lastIndexOf("。")) + 1;
          let end = (content.indexOf("？", i) > content.indexOf('。', i) ? content.indexOf("？", i) : content.indexOf("。", i)) + 1;
          let res = content.substring(start, end); */
          content = content.replace(eval('/' + value + '/g'), "<span class=\"result\">" + value + "</span>");
          let title = dts[index].textContent;
          if (ids.indexOf(index) < 0) {
            ids.push(index);
            let result = {
              count: 0,
              res: content,
              title: title,
              id: index
            };
            resList.push(result);
          } else {
            let result = resList[ids.indexOf(index)];
            result.count++;
            let res = result.res;
            result.res = res.replace(eval('/' + value + '/g'), "<span class=\"result\">" + value + "</span>");
          }
        }
      });
    });
    resList.sort((res1, res2) => {
      return (res2.count - res1.count) || (res1.id - res2.id);
    })
    resList.forEach(result => {
      if (valueArr.length <= 2 || result.count >= (valueArr.length / 2)) {
        let li = document.createElement('li');
        li.innerHTML = `<span><a href="#til${result.id}">${result.title}</a></span><span>:</span><span>${result.res}</span>`;
        searchList.appendChild(li);
      }
    });
  }
}

del.onclick = function () {
  search.value = "";
}

dramaSerialSelectors.forEach((selector, index) => {
  selector.onclick = function (event) {
    dls.forEach(dl => {
      dl.className = 'hide'
    });
    dls[index].className = 'show';
    dramaSerialSelectors.forEach(s => {
      s.className = ''
    });
    selector.className = 'active';
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

$('#dramaSerialSelector').on('swipeLeft', function (event) {
  let wrapW = $('#dramaSerialSelectorWrap').width();
  let selectorW = $('#dramaSerialSelector').width();
  if (wrapW < selectorW) {
    console.log(event);
  }
})

$("#dramaSerialSelector").on('swipeRight', function (event) {
  let wrapW = $('#dramaSerialSelectorWrap').width();
  let selectorW = $('#dramaSerialSelector').width();
  if (wrapW < selectorW) {
    
  }
})