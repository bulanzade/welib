<template>
    <div class="book-card">
        <img :src="img" class="book-card-image"/>
        <div class="book-card-text-container">
            <div class="book-card-title-container">
                <a :href="link" class="book-card-title"> {{name}} </a>
            </div>
            <div>
                <a>{{author}}</a>
            </div>
            <div class="book-card-desc-container">
                <p class="book-card-desc"> &emsp;&emsp;{{desc}} </p>
            </div>
            <el-button @click="borrowBook" type="primary">借阅</el-button>
        </div>
    </div>
</template>

<script>
import {_axios} from "@/utils/api";
import {Message} from "element-ui";

export default
{
    name: "BookCard",
    props:
    {
        _id: String,
        name: String,
        author: String,
        img: String,
        desc: String,
        link: String
    },
    methods:
    {
        borrowBook()
        {
            _axios.post('/borrow',
            {
                'book':
                {
                    '_id':this._id,
                    'name':this.name
                },
                'user':
                {
                    '_id':localStorage.getItem('USERID'),
                    'name':localStorage.getItem('USERNAME')
                }
            })
            .then(data =>
            {
                if (!data.data.msg)
                {
                    Message.success("借阅成功 ")
                }
                return data
            })
        }
    }
}
</script>

<style scoped>
.book-card
{
    border: #EEEBF5 solid 1px;
    border-radius: 10px;
    width: 800px;
    height: 220px;
    display: flex;
    margin: 5px auto;
}
.book-card-image
{
    width: 200px;
    display: block;
    margin: 10px;
}
.book-card-text-container
{
    width: 100%;
}
.book-card-title-container
{
    width: 100%;
    text-align: center;
    padding: 10px 0;
    font-size: 20px;
    margin: 0;
}
.book-card-title
{
    text-decoration: none;
    color: black;
}
.book-card-title:hover
{
    color: #409EFF;
}
.book-card-desc-container
{
    text-align: left;
    padding: 5px;
    height: 100px;
}
.book-card-desc
{

}
</style>