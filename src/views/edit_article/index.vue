<template>
    <div class="dashboard-container">
        <el-header>
            <h2>Edit Article</h2>
        </el-header>

        <el-main>
            <el-card>
                 <el-form ref="registrationForm"
                            :model="registrationForm"
                            :rules="registrationRules"
                            class="login-form"
                            auto-complete="on"
                            label-position="left">
                        <h3 class="title">Registration</h3>

                        <el-form-item prop="username">
                            <span class="svg-container">
                                <svg-icon icon-class="user" />
                            </span>
                            <el-input v-model="registrationForm.username"
                                    name="User name"
                                    type="text"
                                    auto-complete="on"
                                    placeholder="User name" />
                        </el-form-item>

                        <el-form-item prop="fullName">
                            <span class="svg-container">
                                <svg-icon icon-class="user" />
                            </span>
                            <el-input v-model="registrationForm.fullName"
                                    name="fullName"
                                    type="text"
                                    auto-complete="on"
                                    placeholder="Full name" />
                        </el-form-item>

                        <el-form-item prop="password">
                            <span class="svg-container">
                                <svg-icon icon-class="password" />
                            </span>

                            <!-- @keyup.enter.native="handleLogin"  -->
                            <el-input
                                :type="pwdType"
                                v-model="registrationForm.password"
                                name="password"
                                auto-complete="on"
                                placeholder="Password"
                            />

                            <span class="show-pwd" @click="showPwd">
                                <svg-icon icon-class="eye" />
                            </span>
                        </el-form-item>

                        <el-form-item prop="phone">
                            <span class="svg-container">
                                <font-awesome-icon icon="phone" />
                            </span>
                            <el-input v-model="registrationForm.phone"
                                    name="phone"
                                    type="text"
                                    auto-complete="on"
                                    placeholder="Phone" />
                        </el-form-item>

                        <el-form-item prop="email">
                            <span class="svg-container">
                                <font-awesome-icon icon="envelope" />
                            </span>
                            <el-input v-model="registrationForm.email"
                                    name="email"
                                    type="text"
                                    auto-complete="on"
                                    placeholder="Email" />
                        </el-form-item>

                        <el-form-item prop="birthday">
                            <span class="svg-container">
                                <font-awesome-icon icon="calendar-alt" />
                            </span>
                            <el-date-picker
                                prefix-icon="none"
                                v-model="registrationForm.birthday"
                                type="date"
                                placeholder="Birthday"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>

                        <div class="gender-container">
                            <el-radio-group v-model="registrationForm.gender">
                                <el-radio border label="MALE">
                                    <font-awesome-icon icon="mars" />
                                    Male
                                </el-radio>
                                <el-radio border label="FEMALE">
                                    <font-awesome-icon icon="venus" />
                                    Female
                                </el-radio>
                            </el-radio-group>
                        </div>

                        <el-form-item>
                            <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRegistration">
                                Sign in
                            </el-button>
                        </el-form-item>

                        <div class="to-link">
                            <router-link to="/login">Login</router-link>
                        </div>
                    </el-form>
            </el-card>
        </el-main>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.el-header {
    display: flex;
    align-items: center;
}
</style>
