<template>
    <el-card v-loading="loading">
        <el-header>
            <h3 v-text="`${block.name.split('_').join(' ').toUpperCase()}`" />
        </el-header>

        <el-main>
            <div v-if="block.list.docs.length" class="list-container">
                <ul>
                    <li v-for="(item, index) in block.list.docs" :key="index" @click="toItemClick(item)">
                        <el-row>
                            <el-col :span="4">
                                <div class="img-container">
                                    <img :src="`https://cybersp.herokuapp.com/${item.img}`" alt="">
                                </div>
                            </el-col>
                            <el-col :span="20">
                                <p v-text="item.title" />
                            </el-col>
                       </el-row>
                    </li>
                </ul>
            </div>
            <div v-else class="no-data-container">
                <span>No data</span>
            </div>
        </el-main>

        <el-footer v-if="block.name !== 'categories' && block.list.docs.length">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="pagination_page"
                layout="prev, pager, next"
                :total="block.list.totalDocs">
                <!-- :total="20"> -->
            </el-pagination>
        </el-footer>
    </el-card>
</template>

<script>
export default {
    props: {
        block: Object
    },
    computed: {
        dataType() {
            let type
            switch (this.block.name) {
                case 'recent_publishing': type = 'getArticle'; break;
                case 'pending_articles': type = 'getArticle'; break;
                case 'categories': type = 'getCategory'; break;
            }

            return type
        }
    },
    data() {
        return {
            pagination_page: 0,
            loading: false
        }
    },
    methods: {
        handleCurrentChange(val) {
            let categories = {page: val, limit: 10}
            let articles = [
                {type: (this.block.name == 'pending_articles') ? 'SET_PENDING_ARTICLES' : 'SET_RECENT_PUBLISHING'},
                {
                    'status': (this.block.name == 'pending_articles') ? 'waiting' : 'approved',
                    'pagination': {
                        'limit': 10,
                        'page': val
                    }
                }
            ]

            let data = (this.block.name == 'categories') ? categories : articles

            this.loading = true
            this.$store.dispatch(`home/${this.dataType}`, data).then(() => {
                this.loading = false
            })
        },
        toItemClick(item) {
            console.log(item)
            if (this.block.name == 'categories') {
                let data = {
                    limit: 10,
                    page: 1,
                    categoryId: item._id
                }


                this.$store.dispatch('home/getHomeInfo', data).then(() => {

                })
            } else {
                // this.$store.commit('SET_EDITABLE_ARTICLE', item)
                this.$router.push(`/edit/edit/${item._id}`)
            }
        }
    }
}
</script>

<style>
.no-data-container {
    text-align: center;
    font-size: 16px;
    color: #000;
}
.dashboard-container .el-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px !important;
}
.dashboard-container .main .el-card__body {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.dashboard-container  h3 {
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
.list-container .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
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
