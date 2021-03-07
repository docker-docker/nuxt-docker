import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

export default () => {
  Vue.use(ElementUI, { locale, size: 'medium', zIndex: 3000 })
}
