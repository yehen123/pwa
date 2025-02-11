<template>
  <div class="nav">
    <div class="site-width">
      <!-- 顶部导航栏 -->
      <nav class="nav-bar">
        <!-- <div class="logo">
          <img src="/site/img/logo.png" />
        </div> -->
        <div class="nav-links">
          <a href="/site/" :class="{ active: $route.path === '/site/' }">首页</a>
          <a href="/site/about" :class="{ active: $route.path === '/site/about' }">关于我们</a>
          <a href="/site/news" :class="{ active: $route.path === '/site/news' }">新闻资讯</a>
          <a href="/site/download" :class="{ active: $route.path === '/site/download' }">下载中心</a>
          <!-- <SiteButton>登录/注册</SiteButton> -->
        </div>
      </nav>
    </div>
  </div>
</template>
<script setup lang="ts">
// import SiteButton from '@/components/scopes/SiteButton.vue'
</script>
<style scoped lang="less">
.gradient-text {
  background: linear-gradient(19deg, #f83a3a 10%, #f13dd4 50%, #7000ff 90%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.nav {
  background: linear-gradient(to right, #10182d 0%, #0f182e 50%, #080c19 100%);
  .logo img {
    height: 40px;
  }

  .nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    padding-left: 700px;
    font-size: 20px;
  }

  .nav-links {
    display: flex;
    gap: 74px;
    a {
      text-decoration: none;
      color: #fff;
      font-size: 20px;
      &.active {
        .gradient-text;
      }
    }

    a:hover {
      .gradient-text;
    }
  }
}
</style>
