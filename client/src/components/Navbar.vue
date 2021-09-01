<template>
    <el-menu v-if="$route.path === '/' || $route.path === '/myborrowing' || $route.path === '/user'" mode="horizontal"
             :default-active="$route.path" active-text-color="#409EFF" router>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/myborrowing">我的借阅</el-menu-item>
        <el-menu-item index="/user">我</el-menu-item>
    </el-menu>
</template>

<script>
export default
{
    name: "Navbar"
}
</script>

<style scoped>

</style>