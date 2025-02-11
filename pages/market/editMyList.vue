<template>
  <div class="ui-page">
    <div class="ui-content">
      <div class="ui-content-fix">
        <div class="topBar">
          <svg
            class="back-btn"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="router.back()"
          >
            <path
              d="M7.37853 0.280152C7.73549 -0.0793356 8.31439 -0.0948204 8.69031 0.245059C9.06621 0.584932 9.10512 1.159 8.77847 1.54588L8.72354 1.6061L2.28644 8.05187L8.71786 14.3908C9.06662 14.7346 9.09295 15.2863 8.77847 15.6613L8.72354 15.722C8.37741 16.0683 7.82216 16.0943 7.44483 15.7817L7.38375 15.7271L0.279833 8.72567C-0.0687862 8.38178 -0.0949172 7.83014 0.21969 7.45525L0.274622 7.39455L7.37853 0.280152Z"
              fill="black"
            />
            <rect x="2" y="7" width="18" height="2" rx="1" fill="black" />
          </svg>
          <div class="topBar-title">编辑自选</div>
        </div>
      </div>
      <div class="ui-content-auto">
        <div class="t-list">
          <div class="t-header">
            <div class="t-header-item">名称</div>
            <div class="t-header-item">操作</div>
          </div>

          <div class="t-body">
            <div v-for="(item, index) in myList" :key="item.id" class="t-row">
              <div class="t-row-item">{{ item.name }}</div>
              <div class="t-row-item t-row-opt-list">
                <div class="t-row-opt" @click="handleUp(index)">
                  <van-icon name="back-top" class="t-row-opt-icon" />
                  <span>上移</span>
                </div>
                <div class="t-row-opt" @click="handleDown(index)">
                  <van-icon name="back-top" class="t-row-opt-icon opt-down" />
                  <span>下移</span>
                </div>
                <div class="t-row-opt" @click="handleDelete(index)">
                  <van-icon name="delete-o" class="t-row-opt-icon" />
                  <span>删除</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui-content-fix">
        <van-button
          class="submit-btn"
          color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
          round
          block
          @click="handleSubmit"
        >
          确认编辑
        </van-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getMyList } from '@/service/futures'
const router = useRouter()
const myList = ref<Futures.FuturesData[]>([])
const userStore = useUserStore()
const loadMyList = async () => {
  const res = await getMyList()
  myList.value = res
}
const handleUp = (index: number) => {
  myList.value.splice(index - 1, 0, myList.value.splice(index, 1)[0])
}
const handleDown = (index: number) => {
  myList.value.splice(index + 1, 0, myList.value.splice(index, 1)[0])
}
const handleDelete = (index: number) => {
  myList.value.splice(index, 1)
}
const handleSubmit = async () => {
  const list = myList.value.map((item) => item.id)
  await $request.post('/prod-api/home/user/upOpt', { opt: list.join() })
  await userStore.updateUserInfo()
  $message.success('操作成功')
  router.back()
}
onMounted(() => {
  loadMyList()
})
</script>
<style lang="less" scoped>
.topBar {
  position: relative;

  gap: 12px;
  padding-top: 32px;
  .back-btn {
    position: absolute;
    left: 32px;
    top: 32px;
    bottom: 0;
    margin: auto;
    width: 40px;
    height: 32px;
  }
  .topBar-title {
    font-size: 36px;
    color: #000000cc;
    width: 100%;
    text-align: center;
    font-weight: 600;
  }
}
.submit-btn {
  font-size: 30px;
  height: 88px;
  width: 686px;
  margin: 0px 32px 40px;
}
.t-header {
  height: 60px;
  border-bottom: 1px solid #ededed;
  display: grid;
  grid-template-columns: 45% 55%;
  color: #333;
  // align-self: center;
  line-height: 60px;
  margin-left: 20px;
  font-size: 28px;
}
.t-body {
  overflow-y: overlay;
  height: calc(100% - 60px);
}
.t-row {
  display: grid;
  grid-template-columns: 45% 55%;
  height: 110px;
  align-items: center;
  margin-left: 20px;
  .t-row-opt-list {
    display: flex;
    gap: 50px;
    color: #666;
    .t-row-opt-icon {
      font-size: 32px;
    }
    .opt-down {
      transform: rotate(180deg);
    }
  }
}
</style>
