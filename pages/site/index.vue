<template>
  <div class="page-site">
    <AppSiteNav />
    <div class="index-blur-bg">
      <div class="index-blur-bg-item1"></div>
      <div class="index-blur-bg-item2"></div>
    </div>
    <div class="banner">
      <video autoplay muted loop playsinline class="banner-video">
        <source src="https://shopone123.oss-cn-hongkong.aliyuncs.com/qih/banner.mp4" type="video/mp4" />
      </video>
      <div class="banner-text-1 gradient-text">在屡获殊荣的平台上</div>
      <div class="banner-text-2">进行期货交易</div>
      <div class="banner-text-3 gradient-text">
        交易来自全球 25 个交易所的 250 多种期货，涵盖股票指数、能源、农产品和利率。
      </div>
      <SiteButton>了解更多</SiteButton>
    </div>
    <div class="sections">
      <div class="section1">
        <div class="content">
          <div class="item">
            <div class="title gradient-text">0.0 Pips</div>
            <div class="desc">低交易成本，每手交易可节省高达 10 美元</div>
          </div>
          <div class="item">
            <div class="title gradient-text">1:1 - 1:1000</div>
            <div class="desc">小额资金即可交易，灵活杠杆优势获取回报最大化</div>
          </div>
          <div class="item">
            <div class="title gradient-text">50 ms</div>
            <div class="desc">低交易成本，每手交易可节省高达 10 美元</div>
          </div>
        </div>
      </div>
      <div class="section2">
        <div class="img-wrapper"><img src="/site/img/div.png" alt="" /></div>
        <div class="content">
          <div class="title gradient-text">一键投资全球</div>
          <div class="desc gradient-text">
            仅需一个账户即可投资证券、期货、货币对、贵金属、大宗商品及股票指数，极速交易超过1万个差价合约产品,轻松穿梭6大市场，把握全球机遇。
          </div>
          <div class="items">
            <div>
              <div class="fz32 gradient-text">10,000+</div>
              <div class="fz16">环球产品</div>
            </div>
            <div>
              <div class="fz32 gradient-text">60+</div>
              <div class="fz16">热门货币对</div>
            </div>
            <div>
              <div class="fz32 gradient-text">300+</div>
              <div class="fz16">明星美港股</div>
            </div>
            <div>
              <div class="fz32 gradient-text">10+</div>
              <div class="fz16">环球股票指数</div>
            </div>
          </div>
        </div>
      </div>
      <div class="section3">
        <div class="item">
          <img src="/site/icons/index_icon_1.svg" alt="" />
          <div class="title">IBKR</div>
          <div class="desc">Nasdaq上市</div>
        </div>
        <div class="item">
          <img src="/site/icons/index_icon_2.svg" alt="" />
          <div class="title">166亿美元</div>
          <div class="desc">权益资本</div>
        </div>
        <div class="item">
          <img src="/site/icons/index_icon_3.svg" alt="" />
          <div class="title">74.2%</div>
          <div class="desc">私人持有</div>
        </div>
        <div class="item">
          <img src="/site/icons/index_icon_4.svg" alt="" />
          <div class="title">117亿美元</div>
          <div class="desc">富余监管资本</div>
        </div>
        <div class="item">
          <img src="/site/icons/index_icon_5.svg" alt="" />
          <div class="title">334万</div>
          <div class="desc">客户账户</div>
        </div>
        <div class="item">
          <img src="/site/icons/index_icon_6.svg" alt="" />
          <div class="title">312万</div>
          <div class="desc">日均收益交易(DARTS)</div>
        </div>
      </div>
      <div class="section4">
        <img class="ai-bg" src="/site/img/ai_bg.png" alt="" />
        <div class="hollow-button">Reflect AI</div>
        <div class="fz36 gradient-text">依托尖端技术，畅享高效交易体验</div>
        <div class="fz24 gradient-text">
          通过创新技术驱动，提供毫秒级交易速度与全天候稳定支持，助您轻松把握全球投资机会，实现高效交易体验
        </div>
        <div class="blur-box">
          <div class="blur-content">
            <div>
              <img src="/site/icons/ai.svg" alt="" />
              <div class="ai-text">让您的每一步投资都领先市场</div>
            </div>
            <div class="text">尖端科技与卓越服务结合，为您打造流畅、安全、智能化的交易体验</div>
          </div>
        </div>
        <div class="fz32">您准备好开始您的交易之旅了吗？</div>
      </div>
      <div class="section5">
        <div class="item">
          <img src="/site/icons/index_w_icon_1.svg" alt="" />
          <div class="fz24 gradient-text">多端支持，灵活交易</div>
          <div class="fz16">交易平台适配手机、网页和PC端以及APP，满足不同交易者需求，随时随地轻松操作。</div>
        </div>
        <div class="item">
          <img src="/site/icons/index_w_icon_2.svg" alt="" />
          <div class="fz24 gradient-text">全球资讯，捕捉机遇</div>
          <div class="fz16">接入200多家研究和新闻供应商，实时获取市场动态，发现投资良机。</div>
        </div>
        <div class="item">
          <img src="/site/icons/index_w_icon_3.svg" alt="" />
          <div class="fz24 gradient-text">免费工具，优化决策</div>
          <div class="fz16">提供市场分析工具，助您捕捉机会、优化策略、轻松管理账户。</div>
        </div>
        <div class="item">
          <img src="/site/icons/index_w_icon_4.svg" alt="" />
          <div class="fz24 gradient-text">多样订单，满足策略</div>
          <div class="fz16">超过90种订单类型，从限价单到算法交易，全面支持各种交易需求。</div>
        </div>
        <div class="item">
          <img src="/site/icons/index_w_icon_5.svg" alt="" />
          <div class="fz24 gradient-text">实时数据，交易透明</div>
          <div class="fz16">提供实时确认、保证金详情和成本评估，让交易更透明、高效。</div>
        </div>
      </div>
      <div class="section6">
        <a href="/" class="more-btn">
          查看更多
          <img src="/site/icons/arrow.svg" alt="" />
        </a>
        <div class="serces-btn">
          <img src="/site/img/pretitle.png" alt="" />
          Serces
        </div>
        <div class="fz36 gradient-text">
          提供强有力的技术保障
          <br />
          让投资更流程
        </div>
        <div class="fz24 gradient-text">自主技术赋能，让交易更加高效稳定，助您轻松掌握全球市场</div>
        <div class="cards">
          <div class="item">
            <img class="item-bg" src="/site/img/carousel_card.png" alt="" />
            <div class="card-icon"><img src="/site/icons/index_p_icon_1.svg" alt="" /></div>
            <div class="title gradient-text">自研柜台系统保驾护航</div>
            <div class="desc">依托自主研发的核心交易系统，确保高效、安全的交易环境，为您的投资之旅提供稳定支撑。</div>
            <a class="card-btn" href="">
              查看更多
              <img src="/site/icons/arrow-right-01.svg" />
            </a>
          </div>
          <div class="item">
            <img class="item-bg" src="/site/img/carousel_card.png" alt="" />
            <div class="card-icon"><img src="/site/icons/index_p_icon_2.svg" alt="" /></div>
            <div class="title gradient-text">毫秒级交易响应</div>
            <div class="desc">实现毫秒级交易执行，7×24小时不间断支持，助您抓住每一个全球市场的投资机会。</div>
            <a class="card-btn" href="">
              查看更多
              <img src="/site/icons/arrow-right-01.svg" />
            </a>
          </div>
          <div class="item">
            <img class="item-bg" src="/site/img/carousel_card.png" alt="" />
            <div class="card-icon"><img src="/site/icons/index_p_icon_3.svg" alt="" /></div>
            <div class="title gradient-text">随时随地开启全球投资</div>
            <div class="desc">无论何时何地，通过多终端无缝接入，轻松参与全球金融市场，畅享流畅交易体验。</div>
            <a class="card-btn" href="">
              查看更多
              <img src="/site/icons/arrow-right-01.svg" />
            </a>
          </div>
        </div>
      </div>
      <div class="section7">
        <img src="/site/img/index_bg_2.png" alt="" />
        <div class="hollow-button">您准备好您的交易旅程了吗？</div>
        <div class="fz36 gradient-text">资产信息多重保障，投资更放心</div>
        <div class="fz24 gradient-text">多层次安全防护体系，全面保护您的资产与信息，保障每一笔交易的安心与放心</div>
        <div class="content">
          <img class="bg" src="/site/img/index_bg_3.png" alt="" />
          <div class="item">
            <img class="item-icon" src="/site/img/index_z_icon_1.png" alt="" />
            <div class="title">顶级加密技术</div>
            <div class="desc">采用国际标准的SSL加密协议和多重身份验证，确保用户账户和交易数据的安全。独立资金托管</div>
          </div>
          <div class="item">
            <img class="item-icon" src="/site/img/index_z_icon_2.png" alt="" />
            <div class="title">独立资金托管</div>
            <div class="desc">客户资金独立存放于顶级银行账户，严格遵守监管要求，保证资金透明与安全。</div>
          </div>
          <div class="item">
            <img class="item-icon" src="/site/img/index_z_icon_3.png" alt="" />
            <div class="title">全天候风险监控</div>
            <div class="desc">实时监控交易环境，快速识别和应对潜在风险，为您的资产保驾护航。</div>
          </div>
          <div class="item">
            <img class="item-icon" src="/site/img/index_z_icon_4.png" alt="" />
            <div class="title">隐私保护机制</div>
            <div class="desc">严格遵守国际数据隐私法规，多层次隐私防护，确保用户信息不被泄露。</div>
          </div>
        </div>
      </div>
      <div class="section8">
        <div class="fz36 gradient-text">权威资质与卓越荣誉的双重认可</div>
        <div class="fz24 gradient-text">追求卓越 - 倾力打造最佳交易商品牌</div>
        <div class="content">
          <div v-for="index in 9" :key="index" class="item">
            <div class="imgWrapper"></div>
            <div class="fz24 gradient-text">最佳交易奖</div>
            <div>2025 - 01 - 22</div>
          </div>
        </div>
      </div>
      <div class="section9">
        <div class="fz36 gradient-text">您专属的私人交易经纪专家</div>
        <div class="fz24 gradient-text">(量身定制的专业服务，专属经纪人为您提供全方位的交易支持与指导)</div>
        <div class="grid-container">
          <div class="item item1">
            <div class="title gradient-text">个性化交易服务</div>
            <div class="desc">专属经纪人了解您的投资目标和偏好，量身打造交易策略，助您高效实现财务目标。</div>
            <img src="/site/img/index_gridbg1.png" alt="" />
          </div>
          <div class="item item2">
            <div class="title gradient-text">实时市场洞察</div>
            <div class="desc">提供最新的市场动态分析与投资建议，帮助您把握每一个关键交易机会。</div>
            <img src="/site/img/index_gridbg2.png" alt="" />
          </div>
          <div class="item item3">
            <div class="icon-wrapper"><img src="/site/icons/index_grid_icon1.svg" alt="" /></div>
            <div class="title gradient-text">全天候支持</div>
            <div class="desc">7×24小时私人客户经理在线服务，快速响应您的交易需求和问题咨询。</div>
          </div>
          <div class="item item4">
            <div class="icon-wrapper"><img src="/site/icons/index_grid_icon2.svg" alt="" /></div>
            <div class="title gradient-text">专业知识培训</div>
            <div class="desc">提供多样化的培训课程和一对一指导，帮助您提升交易技能，优化投资决策。</div>
          </div>
        </div>
        <div class="grid-footer">
          <img class="bg1" src="/site/img/index_gridbg3.png" alt="" />
          <img class="icon" src="/site/img/calendar.png" alt="" />
          <div class="title gradient-text">贴心投资助手</div>
          <div class="desc">从开户到日常交易管理，全流程陪伴式服务，让您专注于投资本身。</div>
        </div>
      </div>
      <div class="section10">
        <img class="bg1" src="/site/img/index_bg_4.png" alt="" />
        <div class="hollow-button">Encryption</div>
        <div class="text1">多重安全保障，护航每笔交易</div>
        <div class="text2">
          构建全方位安全防护体系，采用顶级加密技术和严格风控措施，全面保护您的资金与交易数据安全，让您放心专注于全球投资
        </div>
        <img class="bg2" src="/site/img/index_bg_5.png" alt="" />
        <div class="hollow-button">Meetings</div>
        <div class="text3 gradient-text">简单四步 轻松开户</div>
        <div class="text4">
          仅需简单四步，即可完成开户流程，快速加入能敬资本，开启全球期货交易之旅，享受安全高效的投资体验
        </div>
      </div>
      <div class="section11">
        <div class="item">
          <div class="icon-wrapper">
            <img src="/site/icons/index_circle.svg" alt="" />
            01
          </div>
          <div class="text1 gradient-text">注册</div>
          <div class="text2 gradient-text">一键点击，“立即开户”</div>
        </div>
        <div class="item">
          <div class="icon-wrapper">
            <img src="/site/icons/index_circle.svg" alt="" />
            02
          </div>
          <div class="text1 gradient-text">验证</div>
          <div class="text2 gradient-text">验证信息，激活账户</div>
        </div>
        <div class="item">
          <div class="icon-wrapper">
            <img src="/site/icons/index_circle.svg" alt="" />
            03
          </div>
          <div class="text1 gradient-text">入金</div>
          <div class="text2 gradient-text">快速入金，安全方便</div>
        </div>
        <div class="item">
          <div class="icon-wrapper">
            <img src="/site/icons/index_circle.svg" alt="" />
            04
          </div>
          <div class="text1 gradient-text">交易</div>
          <div class="text2 gradient-text">开始交易，投资全球</div>
        </div>
      </div>
      <div class="section12">
        <img class="bg" src="/site/img/index_bg_6.png" alt="" />
        <div class="text">您准备好开始您的交易之旅了吗?</div>
        <SiteButton>立即开始</SiteButton>
      </div>
    </div>
  </div>
  <AppSiteFooter />
</template>
<script setup lang="ts">
import SiteButton from '@/components/scopes/SiteButton.vue'
</script>
<style scoped lang="less">
.fz16 {
  font-size: 16px;
}
.fz24 {
  font-size: 24px;
}
.fz32 {
  font-size: 32px;
}
.fz36 {
  font-size: 36px;
}
.page-site {
  background: #05010d;
  color: #fff;
}
.hollow-button {
  display: inline-block;
  padding: 5px 15px;
  font-size: 14px;
  border-radius: 32px;
  border: 1px solid #4d2f8c;
  background: linear-gradient(90deg, #e59cff 0.01%, #ba9cff 50.01%, #9cb2ff 100%);
  box-shadow: 0px -7px 11px 0px rgba(164, 143, 255, 0.12) inset;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.index-blur-bg {
  position: absolute;
  top: 5500px;
  left: -209px;
  z-index: 0;
  .index-blur-bg-item1 {
    width: 558px;
    height: 465px;
    border-radius: 558px;
    background: rgba(248, 58, 58, 0.3);
    filter: blur(133px);
  }
  .index-blur-bg-item2 {
    position: relative;
    left: 548px;
    top: -302px;
    width: 544px;
    height: 462px;
    border-radius: 544px;
    background: rgba(112, 0, 255, 0.3);
    filter: blur(133px);
  }
}
.banner {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-top: 286px;
  padding-bottom: 331px;
  z-index: 1;
  .banner-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .site-button {
    width: 166px;
    height: 54px;
  }
  .banner-text-1,
  .banner-text-2 {
    font-size: 64px;
    line-height: 72px;
    font-weight: bold;
  }
  .banner-text-2 {
    color: #fff;
  }
  .banner-text-3 {
    font-size: 28px;
    margin-top: 38px;
    margin-bottom: 120px;
  }
}
.sections {
  .section1 {
    padding: 41px 0 134px;
    .content {
      display: flex;
      justify-content: center;
      gap: 75px;
      text-align: center;
      .title {
        font-size: 50px;
      }
      .desc {
        font-size: 16px;
      }
    }
  }
  .section2 {
    display: flex;
    justify-content: center;
    .img-wrapper {
      position: relative;
      width: 514px;
      height: 522px;
      img {
        display: block;
        position: absolute;
        top: -160px;
        left: -110px;
        width: 772px;
        height: auto;
        max-width: none;
      }
    }
    .content {
      width: 524px;
      margin-left: 120px;
      .title {
        display: block;
        font-size: 36px;
        margin-bottom: 24px;
        margin-top: 73px;
      }
      .desc {
        display: block;
        font-size: 18px;
        margin-bottom: 34px;
      }
      .items {
        display: grid;
        grid-template-columns: 182px 1fr;
        gap: 30px;
        .fz32 {
          margin-bottom: 10px;
        }
      }
    }
  }
  .section3 {
    position: relative;
    width: 1200px;
    display: flex;
    flex-wrap: wrap;
    margin: 133px auto 43px;
    text-align: center;
    &::before {
      content: '';
      position: absolute;
      display: block;
      left: 400px;
      width: 1px;
      height: 436px;
      background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.12) 50%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    &::after {
      content: '';
      position: absolute;
      display: block;
      right: 400px;
      width: 1px;
      height: 436px;
      background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.12) 50%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    img {
      display: inline-block;
      width: 40px;
      height: 40px;
      margin-bottom: 20px;
    }
    .item {
      width: 400px;
      height: 218px;
      font-size: 22px;
      padding-top: 46px;
      .title {
        margin-bottom: 4px;
      }
      .desc {
        color: rgba(239, 237, 253, 0.6);
      }
    }
  }
  .section4 {
    position: relative;
    text-align: center;
    padding-top: 54px;
    z-index: 1;
    .ai-bg {
      display: block;
      width: 1200px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: -1;
    }
    .fz36 {
      display: block;
      width: 581px;
      margin: 26px auto 38px;
    }
    .fz24 {
      display: block;
      width: 840px;
      margin: 0 auto 125px;
    }
    .blur-box {
      width: 578px;
      margin: 0 auto;
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.01);
      box-shadow: 0px 0px 0px 9px rgba(255, 255, 255, 0.03) inset;
    }
    .blur-content {
      width: 560px;
      margin: 9px auto;
      padding: 24px 33px;
      border-radius: 16px;
      font-size: 13px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: radial-gradient(70.71% 70.71% at 50% 50%, rgba(168, 127, 255, 0.04) 0%, rgba(168, 127, 255, 0) 100%),
        rgba(4, 1, 21, 0.1);
      backdrop-filter: blur(17px);
      text-align: left;
      img {
        display: inline-block;
      }
      .ai-text {
        display: inline-block;
        background: linear-gradient(90deg, #fc72ff 0%, #8f68ff 25%, #487bff 50%, #2cd9ff 75%, #2cffcc 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .text {
        position: relative;
        margin-top: 23px;
        padding-left: 20px;
        &::before {
          content: '';
          position: absolute;
          display: block;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          height: 24px;
          margin: auto;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.24);
        }
      }
    }
    .fz32 {
      margin-top: 35px;
    }
  }
  .section5 {
    position: relative;
    width: 1200px;
    margin: 9px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    z-index: 2;
    text-align: center;
    .item {
      width: 400px;
      padding-top: 18px;
      position: relative;
      img {
        display: inline-block;
        width: 40px;
        height: 40px;
      }
      .fz24 {
        display: block;
        width: 240px;
        margin: 19px auto 13px;
      }
      .fz16 {
        display: inline-block;
        width: 222px;
        margin-bottom: 35px;
        letter-spacing: 2px;
      }
      &:nth-child(2)::before,
      &:nth-child(5)::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 192px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%);
      }
      &:nth-child(3)::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 192px;
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%);
      }
      &:nth-child(4)::before {
        content: '';
        position: absolute;
        top: 0;
        left: -200px;
        width: 1224px;
        height: 2px;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.08) 24.33%,
          rgba(255, 255, 255, 0.08) 49.55%,
          rgba(255, 255, 255, 0.08) 74.78%,
          rgba(255, 255, 255, 0) 100%
        );
      }
    }
  }
  .section6 {
    text-align: center;
    .more-btn {
      display: inline-flex;
      align-items: center;
      position: relative;
      font-size: 18px;
      line-height: 30px;
      margin-top: 91px;
      img {
        width: 20px;
        height: 20px;
        margin-left: 5px;
      }
      &::after {
        position: absolute;
        left: 0;
        bottom: 0;
        content: '';
        display: block;
        width: 67px;
        height: 2px;
        background: linear-gradient(80deg, #f83a3a 10%, #f13dd4 50%, #7000ff 90%),
          linear-gradient(135deg, #665dcd 0%, #5fa4e6 44.76%, #d2ab67 100%);
      }
    }
    .serces-btn {
      display: block;
      position: relative;
      width: 120px;
      height: 36px;
      margin: 134px auto 0;
      line-height: 36px;
      border-radius: 34px;
      font-size: 13px;
      z-index: 1;
      overflow: visible;
      img {
        position: absolute;
        width: 200px;
        top: -40px;
        left: -40px;
        z-index: -1;
        max-width: none;
      }
    }
    .fz36 {
      display: inline-block;
      width: 386px;
      line-height: 36px;
      padding: 25px 0;
      font-weight: bold;
    }
    .fz24 {
      display: block;
      width: 648px;
      margin: 0 auto 36px;
    }
    .cards {
      display: flex;
      justify-content: center;
      gap: 22px;
      .item {
        position: relative;
        width: 386px;
        height: 336px;
        padding: 29px;
        z-index: 1;
        overflow: hidden;
        text-align-last: left;
        .item-bg {
          display: block;
          position: absolute;
          top: -55px;
          left: 0;
          width: 498px;
          z-index: -1;
          max-width: none;
        }
        .card-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 47px;
          height: 47px;
          border-radius: 11.821px;
          background: var(--Linear-2, linear-gradient(143deg, #0a0fdb -10.56%, #8d00a6 111.87%));
          img {
            width: 29px;
            height: 29px;
          }
        }
        .title {
          display: block;
          width: 278px;
          margin-top: 25px;
          margin-bottom: 9px;
          font-size: 22px;
          font-weight: bold;
        }
        .desc {
          font-size: 14px;
          margin-bottom: 31px;
        }
        .card-btn {
          display: flex;
          align-items: center;
          font-size: 18px;
          img {
            width: 25px;
            height: 25px;
          }
        }
      }
    }
  }
  .section7 {
    position: relative;
    text-align: center;
    margin-top: 87px;
    padding-top: 471px;
    z-index: 1;
    & > img {
      width: 604px;
      height: 636px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      margin: auto;
      z-index: -1;
    }
    .fz36 {
      display: block;
      width: 542px;
      margin: 26px auto 0;
    }
    .fz24 {
      display: block;
      width: 840px;
      margin: 26px auto 39px;
    }
    .content {
      position: relative;
      width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      text-align: center;
      font-size: 20px;
      z-index: 1;
      .bg {
        position: absolute;
        left: 0;
        top: -55px;
        width: 100%;
        z-index: -1;
      }
      .item {
        padding: 0 45px;
        .item-icon {
          display: inline-block;
          width: 80px;
          height: 80px;
          margin-top: 10px;
        }
        .title {
          margin-bottom: 9px;
          font-weight: bold;
        }
        .desc {
          margin-bottom: 53px;
          color: rgba(239, 237, 253, 0.7);
        }
      }
    }
  }
  .section8 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .fz36 {
      margin: 90px 0 32px;
    }
    .fz24 {
      margin-bottom: 62px;
    }
    .content {
      display: flex;
      width: 100%;
      justify-content: center;
      gap: 50px;
      text-align: center;
      overflow: hidden;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        .gradient-text {
          margin: 32px 0 10px;
        }
      }
      .imgWrapper {
        width: 198px;
        height: 230px;
        border-radius: 12px;
        border: solid 1px #980848;
        box-shadow: 0px 0px 27px 0px rgba(173, 40, 40, 0.48);
      }
    }
  }
  .section9 {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 244px;
    .fz36 {
      margin-bottom: 65px;
    }
    .fz24 {
      margin-bottom: 67px;
    }
    .grid-container {
      width: 1200px;
      height: 730px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 20px;
      .item {
        padding: 58px;
        border-radius: 14px;
        background-color: #170e1f;
        text-align: left;
        overflow: hidden;
        .title {
          font-size: 29px;
        }
        .desc {
          font-size: 22px;
          margin-top: 11px;
        }
        .icon-wrapper {
          width: 38px;
          height: 38px;
          border-radius: 9.6px;
          background: linear-gradient(135deg, #ff6363 0%, #d72a2a 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 29px;
          & > img {
            width: 26px;
            height: 26px;
          }
        }
      }
      .item1 {
        position: relative;
        padding: 85px 58px;
        grid-column: 1 / 3;
        grid-row: 1 / 2;
        z-index: 1;
        .desc {
          width: 273px;
        }
        & > img {
          width: 380px;
          position: absolute;
          top: 0;
          right: 58px;
          z-index: -1;
        }
      }
      .item2 {
        position: relative;
        grid-column: 3 / 4;
        grid-row: 1 / 3;
        z-index: 1;
        & > img {
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: -1;
        }
      }
      .item3 {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
        .desc {
          margin-top: 48px;
        }
      }
      .item4 {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        .desc {
          margin-top: 48px;
        }
      }
    }
    .grid-footer {
      position: relative;
      width: 1200px;
      height: 567px;
      padding-left: 847px;
      padding-top: 84px;
      background-color: #1d101a;
      border-radius: 14px;
      margin-top: 20px;
      z-index: 1;
      overflow: hidden;
      .bg1 {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        z-index: -2;
      }
      .icon {
        width: 38px;
        height: 38px;
        margin-bottom: 29px;
      }
      .title {
        font-size: 29px;
      }
      .desc {
        width: 295px;
        font-size: 22px;
        margin-top: 75px;
      }
    }
  }
  .section10 {
    display: flex;
    flex-direction: column;
    align-items: center;
    .bg1 {
      width: 1280px;
      margin-top: 52px;
      margin-bottom: -330px;
    }
    .text1 {
      font-size: 36px;
      margin-top: 10px;
      margin-bottom: 24px;
      opacity: 0.5;
    }
    .text2 {
      width: 458px;
      font-size: 16px;
      color: rgba(239, 237, 253, 0.7);
      opacity: 0.5;
    }
    .bg2 {
      width: 812px;
      margin-top: 93px;
      margin-bottom: -150px;
    }
    .text3 {
      font-size: 36px;
      margin-top: 12px;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .text4 {
      opacity: 0.6;
    }
  }
  .section11 {
    margin-top: 131px;
    display: flex;
    justify-content: center;
    gap: 179px;
    text-align: center;
    margin-bottom: 154px;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 1;
      .icon-wrapper {
        width: 58px;
        height: 58px;
        line-height: 58px;
        margin-bottom: 22px;
        position: relative;
        font-size: 26px;
        & > img {
          width: 94px;
          position: absolute;
          left: -18px;
          top: -18px;
          z-index: -1;
          max-width: none;
        }
      }
      .text1 {
        font-size: 24px;
        margin-bottom: 6px;
      }
      .text2 {
        font-size: 18px;
      }
    }
  }
  .section12 {
    position: relative;
    width: 100%;
    height: 421px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bg {
      position: absolute;
      width: 100%;
      height: 421px;
      left: 0;
      top: 0;
    }
    .text {
      margin-top: 140px;
      margin-bottom: 60px;
      font-size: 50px;
      font-weight: bold;
    }
    .site-button {
      width: fit-content;
      height: auto;
      padding: 8px 35px;
      font-size: 22px;
    }
  }
}
</style>
