<template>
  <div class="ui-page">
    <div class="ui-content ui-content-auto-scroll">
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
          <div class="topBar-title">我的团队</div>
        </div>
        <div class="top-info">
          <div class="top-user-info">
            <van-image class="top-user-avatar" :showLoading="false" src="/img/default-avatar.png" round />
            <div class="uinfo-right">
              <div class="top-user-info-name" @click="navigateTo('/mine/setting')">
                {{ userStore.userInfo.nickName }}
              </div>

              <div class="top-user-info-id">
                {{ userStore.userInfo.userCode }}
              </div>
            </div>
          </div>
          <div class="top-money">收益：{{ userStore.userInfo.moneyMake }}</div>
          <div class="top-uper-info">
            <div class="flex items-center">
              <div class="v-icon"></div>
              <div class="ml-2 pt-2">上级：{{ pName }}</div>
            </div>
          </div>
          <!-- <div class="progress-bar">
            <div class="progress-bar-main">
              <div class="progress-bar-current" :style="{ width: '50%' }"></div>
            </div>
            <div class="progress-bar-text">
              <div class="progress-bar-text-left">青铜</div>
              <div class="progress-bar-text-center">当前经验：--/5000</div>
              <div class="progress-bar-text-right">王者</div>
            </div>
          </div> -->
        </div>
      </div>
      <div class="ui-content-auto">
        <div class="list-title">收益统计</div>

        <ClientOnly>
          <div class="team-list">
            <div class="t-header">
              <div>用户名</div>
              <div class="text-center">充值</div>
              <div class="text-center">提现</div>
              <div class="text-right">收益</div>
            </div>
            <div class="t-body">
              <van-list
                v-if="list.length"
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <div v-for="(item, index) in list" :key="index" class="t-row">
                  <div>{{ item.nickName }}</div>
                  <div class="text-center">{{ item.todep }}</div>
                  <div class="text-center">{{ item.towith }}</div>
                  <div class="text-right">{{ item.toearn }}</div>
                </div>
              </van-list>
              <van-empty v-else-if="!loading" description="暂无数据" />
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: '我的团队',
})
const router = useRouter()
const userStore = useUserStore()
const list = ref<any[]>([])
const loading = ref(false)
const finished = ref(false)
let pageNum = 1
const pageSize = 10
const pName = ref('')
const onLoad = async () => {
  loading.value = true
  try {
    const res = (await $request.get(
      `/prod-api/home/user/listNew?pageNum=${pageNum}&orderByColumn=toearn&isAsc=desc&pageSize=${pageSize}`
    )) as any
    pName.value = res.pName
    list.value = list.value.concat(res.rows)
    pageNum++
    if (list.value.length >= res.total) {
      finished.value = true
    }
  } catch (e) {}
  loading.value = false
}
onMounted(() => {
  onLoad()
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
.top-info {
  background: url('/img/home-top-bg.jpg') no-repeat center center;
  height: 280px;
  background-size: cover;
  position: relative;
  margin: 32px;
  border-radius: 20px;
  .top-user-avatar {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .top-user-info {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 36px 32px;
    .top-user-info-name {
      font-size: 30px;
      font-weight: 600;
      color: #fff;
    }
    .top-user-info-id {
      font-size: 24px;
      color: #fff;
    }
  }
  .top-money {
    position: absolute;
    right: 32px;
    top: 52px;
    color: #fff;
    font-size: 28px;
  }
  .top-uper-info {
    padding: 32px 32px 0;
    color: #fff;
    font-size: 28px;
    display: flex;
    justify-content: center;

    .v-icon {
      background: url('/img/icon-v.png') no-repeat center center;
      background-size: cover;
      width: 36px;
      height: 36px;
    }
    .uper-name {
      font-size: 24px;
      font-weight: 600;
    }
  }
  .progress-bar {
    margin: 32px 32px 0;
    .progress-bar-main {
      border-radius: 21px;
      background: #f7f7f7;
      height: 20px;
      .progress-bar-current {
        background: #ff9900;
        height: 100%;
        border-radius: 21px;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: -4px;
          width: 28px;
          height: 28px;
          background: #ff9900;
          border-radius: 50%;
          border: 2px solid #fff;
        }
      }
    }
    .progress-bar-text {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      font-size: 24px;
      color: #fff;
    }
  }
}
.list-title {
  color: #000;

  font-size: 32px;
  font-weight: 600;
  margin: 0 32px;
}
.team-list {
  margin: 16px 32px 0;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  height: calc(100% - 100px);
}
.t-header {
  height: 60px;
  border-bottom: 1px solid #ededed;
  display: grid;
  grid-template-columns: 31% 23% 23% 23%;
  color: #333;
  // align-self: center;
  line-height: 60px;
  margin-left: 20px;
  font-size: 28px;
  padding-left: 40px;
  padding-right: 60px;
}
.t-body {
  overflow-y: overlay;
  height: calc(100% - 60px);
}
.t-row {
  display: grid;
  grid-template-columns: 31% 23% 23% 23%;
  height: 110px;
  line-height: 110px;
  background: #f7f7f7;
  border-radius: 20px;
  margin: 20px 32px;
  padding: 0 20px;
  align-items: center;
  color: #000;
}
</style>
