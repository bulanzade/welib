<template>
    <div>
        <p>用户名：{{name}}</p>
        <p>账号：{{account}}</p>
        <el-button type="danger" @click="logout">登出</el-button>
    </div>
</template>

<script>
import {_axios} from "@/utils/api";
import {Message} from "element-ui";
import router from "@/router";

export default
{
    name: "User",
    data()
    {
        return {
            name: localStorage.getItem('USERNAME'),
            account: localStorage.getItem('USERACCOUNT')
        }
    },
    methods:
    {
        logout()
        {
            _axios.post('/logout')
            .then(date =>
            {
                if (date.status === 200)
                {
                    Message.success('登出成功')
                    localStorage.clear();
                    router.push('/login')
                }
            })
        }
    }
}
</script>

<style scoped>

</style>