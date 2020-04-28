<template>
    <div id="app">
        <header id="header">
            <b-container>
                <b-navbar type="dark" variant="info">
                    <b-navbar-brand to="/"><small>Coupon Helper</small></b-navbar-brand>
                    <b-navbar-nav>
                        <b-nav-item to="usage_guide">상세문구</b-nav-item>
                        <b-nav-item to="thumbnail">썸네일 리사이징</b-nav-item>
                        <!-- <b-nav-item to="search">썸네일 검색</b-nav-item> -->
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
                        <!-- <b-nav-item-dropdown text="Lang" right v-if="isLoggedIn">
                            <b-dropdown-item href="#">EN</b-dropdown-item>
                            <b-dropdown-item href="#">ES</b-dropdown-item>
                            <b-dropdown-item href="#">RU</b-dropdown-item>
                            <b-dropdown-item href="#">FA</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-btn size="sm" v-else>로그인</b-btn> -->
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
</style>