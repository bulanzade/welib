<template>
    <div class="table-container">
        <el-table :data="borrowInfo" :row-class-name="rowClassName">
            <el-table-column prop="user.name" label="借阅人" width="180"></el-table-column>
            <el-table-column prop="book.name" label="书名"></el-table-column>
            <el-table-column prop="_borrowDate" label="借阅日期" width="200" sortable></el-table-column>
            <el-table-column prop="_returnDate" label="归还日期" width="200" sortable></el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="returnBook(scope.$index, scope.row)" :disabled="scope.row.returnDate && scope.row.returnDate !== '' ">
                        还书
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {_axios} from "@/utils/api";

export default
{
    name: "MyBorrowing",
    methods:
    {
        rowClassName({row})
        {
            if (row.returnDate && row.returnDate !== '')
            {
                return 'success-row'
            }
            return 'warning-row'
        },
        returnBook(index, row)
        {
            this.borrowInfo.splice(index, 1)
            _axios.put('/borrow', row)
            .then(data =>
            {
                data.data._borrowDate = new Date(data.data.borrowDate).toLocaleString()
                data.data._returnDate = new Date(data.data.returnDate).toLocaleString()

                this.borrowInfo.push(data.data)
            })
        }
    },
    data()
    {
        _axios.get('/borrow/' + localStorage.getItem('USERID'))
        .then(data =>
        {
            data.data.forEach(element =>
            {
                element._borrowDate = new Date(element.borrowDate).toLocaleString()
                if (element.returnDate)
                {
                    element._returnDate = new Date(element.returnDate).toLocaleString()
                }
            })
            this.borrowInfo = data.data
        })


        return {
            borrowInfo: []
        }
    }
}
</script>

<style>
.table-container
{
    margin: 50px auto;
    width: 1200px;
}
.el-table .warning-row
{
    background: oldlace;
}

.el-table .success-row
{
    background: #f0f9eb;
}
</style>