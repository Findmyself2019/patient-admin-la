import store from '@/store/modules/user'
export default{
  inserted(el, binding){
    const {value} = binding
    if (store.state.cityCode === value) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
