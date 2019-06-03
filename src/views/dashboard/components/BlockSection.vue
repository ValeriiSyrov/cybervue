<template>
    <el-card>
        <el-header>
            <h3 v-text="`${block.name.split('_').join(' ').toUpperCase()}`" />
        </el-header>

        <el-main>
            <div class="list-container">
                <ul>
                    <li v-for="(item, index) in block.list" :key="index">
                        <el-row>
                            <el-col :span="6">
                                <img :src="item.img" alt="">
                            </el-col>
                            <el-col :span="18">
                                <p v-text="item.name" />
                            </el-col>
                       </el-row>
                    </li>
                </ul>
            </div>
        </el-main>

        <el-footer>
            <el-pagination
                layout="prev, pager, next"
                :total="50">
            </el-pagination>
        </el-footer>
    </el-card>
</template>

<script>
export default {
    props: {
        block: Object
    }
}
</script>

<style>
.el-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px !important;
}
h3 {
    color: #e83031;
    text-align: center;
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 28px;
}
p {
    margin: 0;
    padding: 0;
}
.list-container ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
}
.list-container ul li {
    margin-bottom: 20px;
    line-height: 18px;
    max-height: 54px;
    overflow: hidden;
}
.list-container img {
    width: 50px;
    height: 50px;
    border-radius: 1000px;
}
.el-pagination {
    display: flex;
    justify-content: center;
}
</style>
