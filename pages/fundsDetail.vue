<template>
  <div class="ui-page">
    <div class="ui-content ui-content-auto-scroll">
      <div class="ui-content-fix">
        <div class="t-header-container">
          <div class="t-header">
            <div>类型/时间</div>
            <div>变动金额</div>
            <div class="text-right">变动前/后金额</div>
          </div>
        </div>
      </div>

      <div class="ui-content-auto">
        <div v-if="!loading && list.length">
          <div v-for="(item, index) in list" :key="index" class="t-row">
            <div>
              <div class="text-base text-main">{{ $utils.common.getTypeName(item.type, addMoneyType) }}</div>
              <div class="text-xs text-sub">{{ item.createTime }}</div>
            </div>
            <div>
              <div class="text-sm" :class="{ 'text-win': item.addMoney > 0, 'text-lose': item.addMoney < 0 }">
                {{ item.addMoney > 0 ? '+' : '-' }}￥{{ $utils.format.toCurrency(Math.abs(item.addMoney)) }}
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs text-sub">{{ $utils.format.toCurrency(item.oldMoney) }}</div>
              <div class="text-sm text-main">{{ $utils.format.toCurrency(item.newMoney) }}</div>
            </div>
          </div>
        </div>
        <van-empty v-else description="暂无数据" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: '资金明细',
})
const list = ref<any[]>([])
const loading = ref(false)
const addMoneyType = [
  {
    label: '充值',
    value: 'add',
  },
  {
    label: '交易',
    value: 'buy',
  },
  {
    label: '提现',
    value: 'sub',
  },
  {
    label: '手动充值',
    value: 'addhand',
  },
  {
    label: '手动提现',
    value: 'subhand',
  },
  {
    label: '理财盈利',
    value: 'makemana',
  },
  {
    label: '购买理财',
    value: 'addmana',
  },
  {
    label: '赎回理财',
    value: 'backmana',
  },
]
const loadList = async () => {
  loading.value = true
  try {
    const res = await $request.get('/prod-api/home/log/list?pageNum=1&pageSize=10&isAsc=desc&orderByColumn=createTime')
    list.value = res.data
  } catch (e) {}
  loading.value = false
}
onMounted(() => {
  loadList()
})
</script>
<style lang="less" scoped>
.t-header-container {
  padding-left: 20px;
  background-color: var(--th-content-bg);
  .t-header {
    height: 60px;
    // border-bottom: 1px solid #ededed;
    display: grid;
    grid-template-columns: 50% 25% 25%;
    color: #acacac;
    // align-self: center;
    line-height: 60px;
    font-size: 22px;
    padding-right: 20px;
  }
}
.t-row {
  display: grid;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  grid-template-columns: 50% 25% 25%;
  margin-left: 20px;
  border-bottom: 1px solid #0000001f;
  align-items: center;
}
.text-win {
  color: #d71409;
}
.text-lose {
  color: #1caa3d;
}
.text-main {
  color: var(--th-text-primary-color);
}
.text-sub {
  color: #6b7280;
}
</style>
