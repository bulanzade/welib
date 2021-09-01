<template>
    <el-tabs type="border-card" class="login-in-tabs">
        <el-tab-pane label="用户登录">
            <SignIn/>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import SignIn from "@/components/SignIn";

export default
{
    name: "Login",
    components: {SignIn}
}
</script>

<style scoped>
.login-in-tabs
{
    border-radius: 4px;
    border: 1px solid #E4E7ED;
    width: 500px;
    margin: 50px auto;
    background-color: #ffffff;
}
</style>