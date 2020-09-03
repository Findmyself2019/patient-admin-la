export default{
  inserted(el, binding){
    const {value} = binding
    if (value == '1') {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
