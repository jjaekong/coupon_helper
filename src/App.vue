<template>
    <div id="app">
        <header id="header">
            <b-container>
                <b-navbar type="dark" variant="info">
                    <b-navbar-brand to="/">옴니텔 쿠폰업무도구</b-navbar-brand>
                    <b-navbar-nav>
                        <b-nav-item to="/guide" exact>이용안내 만들기</b-nav-item>
                        <b-nav-item to="/thumbnail" exact>썸네일 리사이징</b-nav-item>
                        <b-nav-item to="/template" exact>템플릿 만들기</b-nav-item>
                        <!-- <b-nav-item to="search">썸네일 검색</b-nav-item> -->
                    </b-navbar-nav>
                </b-navbar>
            </b-container>
        </header>
        <router-view />
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            isLoggedIn: false
        }
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700,900&subset=korean');

#app {
    // font-family: Avenir, Helvetica, Arial, sans-serif;
    font-family: 'Noto Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.router-link-active {
    color: #fff!important;
}
</style>