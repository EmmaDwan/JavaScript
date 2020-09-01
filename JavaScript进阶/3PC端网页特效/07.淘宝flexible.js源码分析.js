
//1.此处用立即执行函数: 就算html中引用多个js文件，变量名也不会冲突
    (function flexible(window, document) {              // 传递了window和document两个对象


       
        var docEl = document.documentElement            // 获取的html 的根元素
            
        var dpr = window.devicePixelRatio || 1          // dpr 物理像素比
                                                        // 取设备的devicePixelRatio，拿不到就认为1

//2.设置body字体大小 adjust body font size  
        function setBodyFontSize() {
            
            if (document.body) {                       // 如果页面中有body这个元素，就设置body的字体大小

                document.body.style.fontSize = (12 * dpr) + 'px'               // 比如pc端12，移动端24

            } else {                                   // 如果页面中没有body 这个元素

                document.addEventListener('DOMContentLoaded', setBodyFontSize) // 等页面主要DOM元素加载完毕
                                                                               // 再设body的字体大小
            }
        }
        setBodyFontSize();

//3.设置rem这个单位的大小 (设置html里的元素文字大小) 
        function setRemUnit() {

            var rem = docEl.clientWidth / 10    //html元素的宽/10  整个浏览器屏幕宽划为10等份，每份算一个rem
            docEl.style.fontSize = rem + 'px'   //区别pc和不同手机

        }

        setRemUnit()

//4.页面尺寸大小变化时，重新设置rem的大小 
        window.addEventListener('resize', setRemUnit)
            
        window.addEventListener('pageshow', function(e) {   // pageshow 是重新加载页面触发的事件
             
            if (e.persisted) {    // e.persisted返回true,表示这个页面是从缓存取过来的页面
                setRemUnit()      // 缓存来的也要重新计算rem大小
            }

        })


//5.检测浏览器是否支持0.5px  (有些移动端浏览器不支持0.5像素的写法)
        if (dpr >= 2) {

            var fakeBody = document.createElement('body')
            var testElement = document.createElement('div')

            testElement.style.border = '.5px solid transparent'
            fakeBody.appendChild(testElement)
            docEl.appendChild(fakeBody)

            if (testElement.offsetHeight === 1) {

                docEl.classList.add('hairlines')
            }

            docEl.removeChild(fakeBody)
        }


    }(window, document))         //传递了window和document两个对象