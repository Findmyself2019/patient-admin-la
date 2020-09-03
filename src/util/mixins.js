import Bus from '@/util/eventbus'
import api from '@/api/index'
export default{
  data(){
    return{
      loadingPage:null,
      showSreenFull:false
    }
  },
  methods:{
    addLoading(){
      this.loadingPage = this.$loading({
        target:this.$refs.container,
        background:'rgba(0, 0, 0, 0.7)',
        text:'拼命加载中...',
      })
    },//点击跳转到相应的详情页
    async organizationCode(id,title,name){
      this.addLoading()
      let inspectCode = ''
      switch(title){
      case '人员详情':
        var {code,data} = await api.person.getDetail(id)
        code === 200?this.$store.dispatch('setPersonDetail',data):''
        inspectCode = code
        break
      case '证照详情':
        var licData = await api.certificate.loocer(id)
        if(licData.code === 200){
          this.$store.dispatch('getLicDetail',licData.cerInfo)
          !licData.cerStr ?licData.cerStr = null:''
          this.$store.dispatch('setpath',`data:image/jepg;base64,${licData.cerStr}`)
          this.$store.dispatch('getLicDetail',licData.cerInfo)
        }
        inspectCode = licData.code
        break
      }
      if(inspectCode === 200){
        this.loadingPage.close()
        Bus.$emit('changeCom',name)
        const headerDom = document.getElementsByClassName('header')[0]
        headerDom.querySelectorAll('li.el-menu-item').forEach(item => item.classList.add('off-active'))
        headerDom.querySelectorAll('li.el-menu-item').forEach(item1 => item1.classList.remove('active'))
        this.$store.dispatch('showSideActive',title)
        Bus.$emit('changeActiveTab',name)
        Bus.$emit('pushToTab',name,title)
        Bus.$emit('showSideBar',title)
      }else{
        this.loadingPage.close()
        this.$message({
          showClose: true,
          message: '获取信息失败',
          type: 'error'
        })
      }
    },
    //点击图片放大方法
    expandImage(type){
      if(type === 'cerinfo'){
        const arr = this.cerInfoStr.split(',')
        arr[1]==='null'?this.showSreenFull = false:this.showSreenFull = true
      }else if(type === 'lic'){
        const arr = this.path.split(',')
        arr[1]==='null'?this.showSreenFull = false:this.showSreenFull = true
      }else{
        const arr = this.registerInfoStr.split(',')
        arr[1]==='null'?this.showSreenFull = false:this.showSreenFull = true
      }
      if(this.showSreenFull){
        this.$nextTick(()=>{
          type === 'cerinfo'?document.getElementById('dialog_large_image').getElementsByTagName('img')[0].src = this.cerInfoStr:
            type==='lic'? document.getElementById('dialog_large_image').getElementsByTagName('img')[0].src = this.path:
              document.getElementById('dialog_large_image').getElementsByTagName('img')[0].src = this.registerInfoStr

        })
      }
    },
    //机构详情,人员详情查看证照详情
    async findLicDetail(id){
      const {code,cerStr,cerInfo} = await api.certificate.getByHolderCode(id)
      if(code === 200){
        Bus.$emit('changeCom','licdetail')
        this.$store.dispatch('setIsOrganization',true)
        let imgPath = cerStr
        !cerStr ?imgPath = null:''
        this.$store.dispatch('setpath',`data:image/jepg;base64,${imgPath}`)
        this.$store.dispatch('getLicDetail',cerInfo)
        const headerDom = document.getElementsByClassName('header')[0]
        headerDom.querySelectorAll('li.el-menu-item').forEach(item => item.classList.add('off-active'))
        headerDom.querySelectorAll('li.el-menu-item').forEach(item1 => item1.classList.remove('active'))
        Bus.$emit('changeActiveTab','licdetail')
        Bus.$emit('pushToTab','licdetail','证照详情')
        Bus.$emit('showSideBar','证照详情')
      }
    },
  }
}
