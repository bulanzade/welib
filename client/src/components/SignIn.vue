<template>
    <el-form :model="signInForm" status-icon :rules="rules" ref="signInForm" class="sign-in-form">
        <el-form-item prop="id">
            <el-input placeholder="请输入账号" type="text" v-model.number="signInForm.account"/>
        </el-form-item>
        <el-form-item prop="password">
            <el-input placeholder="请输入密码" type="password" v-model="signInForm.password"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('signInForm')">登录</el-button>
            <el-button type="danger" @click="resetForm('signInForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {Message} from 'element-ui'
import {_axios} from "../utils/api";
import router from "@/router";


export default
{
    name: "SignIn", data()
    {
        let checkID = (rule, value, callback) =>
        {
            if (!value)
            {
                return callback(new Error("账号不能为空"))
            }
            setTimeout(() =>
            {
                if (!Number.isInteger(value))
                {
                    callback(new Error("账号必须为数字"))
                }
                else
                {
                    callback()
                }
            }, 100)
        }

        let chekPass = (rule, value, callback) =>
        {
            if (value === '')
            {
                callback(new Error("密码不能为空"))
            }
            else if (value.length < 6 || value.length > 15)
            {
                callback(new Error("密码长度为 6-15"))
            }
            else
            {
                callback()
            }
        }

        return {
            signInForm:
            {
                account: '',
                password: ''
            },
            rules:
            {
                account: [{validator: checkID, trigger: 'blur'}],
                password: [{validator: chekPass, trigger: 'blur'}]
            }
        }
    },
    methods:
    {
        submitForm(formName)
        {
            this.$refs[formName].validate((vaild) =>
            {
                if (vaild)
                {
                    _axios.post('/login', {
                            account: this.signInForm.account,
                            password: this.signInForm.password
                    }).then(data =>
                    {
                        if (data.data.state === 'SUCCESS')
                        {
                            localStorage.setItem("USERID", data.data.user._id)
                            localStorage.setItem("USERNAME", data.data.user.name)
                            localStorage.setItem("USERACCOUNT", data.data.user.account)
                            Message({
                                message: "登陆成功",
                                type: 'success'
                            })
                            router.push('/')
                        }
                        else
                        {
                            Message({
                                message: data.data.msg,
                                type: 'error'
                            })
                        }
                    })
                }
            })
        },
        resetForm(formName)
        {
            this.$refs[formName].resetFields()
        }
    }
}
</script>

<style scoped>

</style>