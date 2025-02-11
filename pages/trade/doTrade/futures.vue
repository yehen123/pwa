<template>
  <div class="ui-page">
    <div class="ui-content">
      <div class="ui-content-auto">
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
          <div class="topBar-title">交易</div>
        </div>
        <div class="trade-box">
          <div v-if="baseData" class="trade-info-box">
            <div class="trade-info-name">
              <div class="trade-name-text">{{ baseData.name }}</div>
              <div class="trade-name-code">{{ baseData.code.split('_')[0] }}</div>
            </div>
            <div class="trade-info-price" :class="baseData.changeRate >= 0 ? 'raise' : 'fall'">
              <div class="trade-info-item-text">{{ baseData.price }}</div>
              <div class="trade-info-item-value">
                <span class="trade-info-item-value-text">{{ baseData.change }}</span>
                <span class="trade-info-item-value-text ml-4">
                  {{
                    baseData.changeRate === null
                      ? ''
                      : baseData.changeRate >= 0
                        ? `+${baseData.changeRate}%`
                        : `${baseData.changeRate}%`
                  }}
                </span>
              </div>
            </div>
            <div class="trade-info-extra">
              <div class="trade-info-extra-item">
                <div class="trade-info-item-text">最高</div>
                <div class="trade-info-item-value raise">{{ baseData.high }}</div>
              </div>
              <div class="trade-info-extra-item">
                <div class="trade-info-item-text">最低</div>
                <div class="trade-info-item-value fall">{{ baseData.low }}</div>
              </div>
            </div>
          </div>
          <div class="trade-type-box">
            <van-button
              color="#F84949"
              class="trade-type-btn"
              :plain="tradeState.type === 1"
              @click="tradeState.type = 0"
            >
              买涨
            </van-button>
            <van-button
              color="#00A444"
              class="trade-type-btn"
              :plain="tradeState.type === 0"
              @click="tradeState.type = 1"
            >
              买跌
            </van-button>
          </div>
          <div class="flex justify-between">
            <div class="time-item">
              <div class="time-item-text">买入时间</div>
              <div class="time-picker-button" @click="handleStartTime">
                <div class="tpb-text">
                  <span>{{ tradeState.startTime }}</span>
                </div>
                <van-icon name="clock-o" class="tpb-icon" />
              </div>
            </div>
            <div class="time-item">
              <div class="time-item-text">卖出时间</div>
              <div class="time-picker-button" @click="handleEndTime">
                <div class="tpb-text">
                  {{ tradeState.endTime }}
                </div>
                <van-icon name="clock-o" class="tpb-icon" />
              </div>
            </div>
          </div>

          <div class="mt-7">
            <div class="mb-4">买入金额（可用余额：{{ userStore.userInfo.canMoney }} 元）</div>
            <div class="flex gap-4">
              <div class="p-block add-btn" @click="doMinus">-</div>
              <div class="p-block flex-1">
                <input-currency v-model="tradeState.value" class="op-input" @blur="checkValue" />
              </div>
              <div class="p-block minus-btn" @click="doAdd">+</div>
            </div>
            <div class="op-button-group gap-4 mt-4">
              <div class="p-block" @click="betRate(0.25)">25%</div>
              <div class="p-block" @click="betRate(0.5)">50%</div>
              <div class="p-block" @click="betRate(0.75)">75%</div>
              <div class="p-block" @click="betRate(1)">100%</div>
            </div>
          </div>
          <div v-if="tradeState.gangValue" class="mt-5">
            <div class="mb-4">杠杆选择</div>
            <div class="p-block" @click="tradeState.showGangPicker = true">
              {{ tradeState.gangValue }}倍
              <van-icon name="arrow-down" class="bet-down-icon"></van-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="ui-content-fix">
        <div class="trade-bottom">
          <div class="trade-bottom-left">
            <div class="trade-bottom-left-text">
              <div class="trade-bottom-left-text-title">试算保证金(元):</div>
              <div class="trade-bottom-left-text-value">
                {{ $utils.format.toCurrency(tradeState.value) }}
              </div>
            </div>
          </div>
          <van-button
            class="trade-submit-btn"
            color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
            block
            round
            @click="handleTradeConfirm"
          >
            确认{{ tradeState.type === 0 ? '买涨' : '买跌' }}
          </van-button>
        </div>
      </div>
      <van-popup v-model:show="tradeState.showTimePicker" round position="bottom">
        <van-picker
          title="选择时间"
          :columns="tradeState.timeColumns"
          @cancel="tradeState.showTimePicker = false"
          @confirm="handleTimeConfirm"
        />
      </van-popup>
      <van-popup v-model:show="tradeState.showGangPicker" round position="bottom">
        <van-picker
          title="选择倍数"
          :columns="tradeState.gangColumns"
          @cancel="tradeState.showGangPicker = false"
          @confirm="handleGangConfirm"
        />
      </van-popup>
      <van-popup v-model:show="tradeState.successPopVisible" round position="bottom">
        <div class="success-pop">
          <svg xmlns="http://www.w3.org/2000/svg" class="success-pop-icon" viewBox="0 0 52 52" fill="none">
            <g clip-path="url(#clip0_297_3986)">
              <path
                d="M26 0C11.642 0 0 11.642 0 26C0 40.358 11.642 52 26 52C40.358 52 52 40.358 52 26C52 11.642 40.358 0 26 0ZM37.2299 17.5094L25.0076 34.4558C24.2705 35.483 22.7442 35.483 22.0071 34.4558L14.7701 24.4272C14.5496 24.1196 14.7701 23.6902 15.1473 23.6902H17.8692C18.4612 23.6902 19.0241 23.9746 19.3723 24.4621L23.5045 30.196L32.6277 17.5442C32.9759 17.0625 33.533 16.7723 34.1308 16.7723H36.8527C37.2299 16.7723 37.4504 17.2018 37.2299 17.5094Z"
                fill="url(#paint0_linear_297_3986)"
              />
            </g>
            <defs>
              <linearGradient id="paint0_linear_297_3986" x1="26" y1="0" x2="26" y2="52" gradientUnits="userSpaceOnUse">
                <stop stop-color="#E92F08" />
                <stop offset="1" stop-color="#6124E1" />
              </linearGradient>
              <clipPath id="clip0_297_3986">
                <rect width="52" height="52" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div class="success-pop-title">您的买卖指示已收到</div>
          <div class="success-pop-code">买入时间：{{ tradeState.startTime }}</div>
          <van-button
            class="success-pop-btn"
            color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
            block
            round
            @click="handleSuccessPopConfirm"
          >
            确认
          </van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getTradeTime, trade } from '@/service/futures'
import NP from 'number-precision'
useHead({
  title: '交易',
})
const userStore = useUserStore()
const tradeState = reactive({
  type: 0, // 0 买多 // 1 卖空
  value: 0,
  startTime: '',
  endTime: '',
  currentTimePicker: '',
  showTimePicker: false,
  timeColumns: [],
  gangColumns: [],
  showGangPicker: false,
  gangValue: '',
  successPopVisible: false,
})
const route = useRoute()
const router = useRouter()
const query = route.query as { id: string }
const { baseData, updateBaseData } = useFutures(query.id)

const loadTradeTime = async () => {
  const time = await getTradeTime(query.id)
  tradeState.timeColumns = time.map((v) => {
    return {
      text: v,
      value: v,
    }
  })
  tradeState.startTime = time[0]
  tradeState.endTime = time[1]
}
const initBetColumns = () => {
  const typeGang: any = baseData.value?.typeGang?.split(',') || []
  tradeState.gangColumns = typeGang.map((v) => {
    return {
      value: v,
      text: `${v}倍`,
    }
  })
  tradeState.gangValue = typeGang[0]
  tradeState.value = NP.times(Math.floor(NP.divide(userStore.userInfo.canMoney, 100)), 100)
}
const handleGangConfirm = ({ selectedValues }) => {
  tradeState.gangValue = selectedValues[0]
  tradeState.showGangPicker = false
}

const handleStartTime = () => {
  tradeState.currentTimePicker = 'startTime'
  tradeState.showTimePicker = true
}
const handleEndTime = () => {
  tradeState.currentTimePicker = 'endTime'
  tradeState.showTimePicker = true
}
const handleTimeConfirm = ({ selectedValues }) => {
  tradeState[tradeState.currentTimePicker] = selectedValues[0]
  tradeState.showTimePicker = false
}

const doAdd = () => {
  tradeState.value += 100
  checkValue()
}
const doMinus = () => {
  tradeState.value -= 100
  checkValue()
}
const betRate = (v) => {
  tradeState.value = NP.times(Math.floor(NP.divide(NP.times(userStore.userInfo.canMoney, v), 100)), 100)
  checkValue()
}
const checkValue = async () => {
  await nextTick()
  if (tradeState.value <= 0) {
    tradeState.value = 0
    $message.error('买入金额需大于0')
    throw new Error('E_VALID_FAIL')
  }
  if (tradeState.value > userStore.userInfo.canMoney) {
    tradeState.value = 0
    $message.error('可用余额不足')
    throw new Error('E_VALID_FAIL')
  }
}
const showSuccessPop = () => {
  tradeState.successPopVisible = true
}
const handleSuccessPopConfirm = () => {
  tradeState.successPopVisible = false
  router.push('/trade')
}
const handleTradeConfirm = async () => {
  if (!tradeState.startTime) {
    return $message.error('请选择开始时间')
  }
  if (!tradeState.endTime) {
    return $message.error('请选择结束时间')
  }
  if ($utils.format.toNumber(tradeState.endTime) <= $utils.format.toNumber(tradeState.startTime)) {
    return $message.error('结束时间应晚于开始时间')
  }
  await checkValue()
  await trade({
    id: query.id,
    startTime: tradeState.startTime,
    endTime: tradeState.endTime,
    gangValue: tradeState.gangValue,
    type: tradeState.type,
    value: tradeState.value,
  })
  userStore.updateUserInfo()
  showSuccessPop()
}
onMounted(async () => {
  await updateBaseData()
  await userStore.updateUserInfo()
  await loadTradeTime()
  initBetColumns()
})
</script>
<style lang="less" scoped>
.trade-box {
  padding: 20px 32px 40px;
  font-size: 28px;
  color: #333;
  .trade-info-box {
    padding: 20px 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    .trade-info-name {
      .trade-name-text {
        font-size: 36px;
        font-weight: 600;
      }
      .trade-name-code {
        font-size: 24px;
        padding-top: 4px;
      }
    }
    .trade-info-price {
      padding-left: 60px;
      .trade-info-item-text {
        padding-top: 8px;
        font-size: 32px;
      }
      .trade-info-item-value {
        padding-top: 4px;
        font-size: 20px;
      }
    }
    .trade-info-extra {
      .trade-info-extra-item {
        &:first-child {
          padding-top: 16px;
        }
        width: 100%;
        display: flex;
        align-items: flex-end;
        gap: 24px;
        .trade-info-item-text {
          text-align: right;
          flex: 1;
          font-size: 26px;
        }
        .trade-info-item-value {
          font-size: 26px;
        }
      }
    }
  }
  .trade-name {
  }
  .trade-type-box {
    display: flex;
    gap: 24px;
    .trade-type-btn {
      flex: 1 1 0;
    }
    padding: 0 54px;
  }
  .time-item {
    margin-top: 28px;
    .time-picker-button {
      border-radius: 10px;
      background: #f7f5f4;

      height: 76px;
      display: flex;
      align-items: center;
      margin-top: 8px;
      width: 340px;
      padding: 0 20px;
      justify-content: space-between;
      .tpb-text {
        color: var(--th-text-primary-color);
      }
      .tpb-icon {
        font-size: 34px;
        color: var(--th-text-primary-color);
      }
    }
  }

  .p-block {
    border-radius: 10px;
    background: #f7f5f4;
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }
  .bet-down-icon {
    position: absolute;
    right: 24px;
    font-size: 32px;
  }
  .op-input {
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: #f7f5f4;
  }
  .op-button-group {
    display: flex;
    .p-block {
      flex: 1 1 0;
    }
  }
  .add-btn,
  .minus-btn {
    width: 76px;
    font-size: 40px;
  }
}
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
.trade-bottom {
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .trade-bottom-left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;

    .trade-bottom-left-text-title {
      font-size: 24px;
      color: #666;
    }
    .trade-bottom-left-text-value {
      font-size: 32px;
      color: var(--primary-color);
    }
  }
  .trade-submit-btn {
    width: 400px;
    height: 92px;
  }
}
.success-pop {
  padding: 96px 32px 32px;
  text-align: center;
  .success-pop-icon {
    width: 120px;
    height: 120px;
    margin: 0 auto 20px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .success-pop-title {
    font-size: 32px;
    color: #333;
    margin-bottom: 12px;
  }
  .success-pop-code {
    font-size: 28px;
    color: #666;
    margin-bottom: 40px;
  }
  .success-pop-btn {
    height: 88px;
    font-size: 32px;
  }
}
</style>
