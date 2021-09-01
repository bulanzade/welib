<template>
    <div>
        <div class="search-bar">
            <el-input v-model="input" prefix-icon="el-icon-search" placeholder="输入书名搜索"/>
            <el-button @click="search"  type="primary">搜索</el-button>
        </div>
        <div class="book-list">
            <BookCard v-for="book in books" :key="book._id" :_id="book._id"
                      :name="book.name" :author="book.author" :img="book.img" :desc="book.desc.substring(0,100) + '……'"/>
        </div>
    </div>
</template>

<script>
import BookCard from "@/components/BookCard";
import {_axios} from "../utils/api";
import {Message} from "element-ui";
export default
{
    name: "Home", components: {BookCard}, data()
    {
        return {
            input: '',
            books: []
        }
    },
    methods:
    {
        search()
        {
            if (this.input === '')
            {
                return
            }
            _axios.get("/book/" + this.input).
                  then( (data) =>
                  {
                      if (data.data.length === 0)
                      {
                          Message.warning("未找到相关书籍")
                      }
                      this.books = data.data
                  })
        }
    }
}
</script>

<style scoped>
.search-bar
{
    margin: 50px auto;
    display: flex;
    width: 800px;
}
.book-list
{

    margin: 50px auto;
}
</style>