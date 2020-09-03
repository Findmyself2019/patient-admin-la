import store from '@/store'
//只有当前机构的管理员可以修改自己机构的信息
export default{
  inserted(el, binding){
    const {value} = binding
    const organizationId = store.state.user.organizationId
    if (value[0] !== organizationId) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
