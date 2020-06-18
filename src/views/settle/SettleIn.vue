<template>
  <van-form @submit="onSubmit">
    <van-cell-group title="请输入老人姓名">
      <van-uploader v-model="fileList" capture="camera" :max-count="1" />
      <van-field v-model="name" placeholder="请输入老人姓名" :rules="[{ required: true, message: '请输入老人姓名' }]" />
    </van-cell-group>
    <van-cell-group title="请选择老人出生日期">
      <van-cell is-link @click="showBirthday = true">{{ birthdayText }}</van-cell>
      <van-popup v-model="showBirthday" round position="bottom">
        <van-datetime-picker v-model="birthday" type="date" title="选择日期" @confirm="confirm" @cancel="cancel"
                             :max-date="maxDate" :min-date="minDate" :rules="[{ required: true, message: '请选择老人出生日期' }]"
        />
      </van-popup>
    </van-cell-group>
    <van-cell-group title="请输入家属姓名">
      <van-field v-model="relation" placeholder="请输入家属姓名" :rules="[{ required: true, message: '请输入家属姓名' }]" />
    </van-cell-group>
    <van-cell-group title="请输入联系电话">
      <van-field v-model="tel" type="tel" placeholder="请输入联系电话" :rules="[{ required: true, message: '请输入联系电话' }]" />
    </van-cell-group>
    <van-button round block type="info" native-type="submit">提交</van-button>
  </van-form>
</template>

<script>
import Moment from 'moment'
export default {
  data () {
    return {
      fileList: [],
      name: '',
      showBirthday: false,
      birthdayText: '选择老人生日',
      birthday: new Date(),
      minDate: new Date('1909/01/01'),
      maxDate: new Date('2019/12/31'),
      tel: '',
      relation: ''
    }
  },
  methods: {
    confirm (value) {
      let brithday = Moment(value).format("YYYY-MM-DD");
      this.birthdayText = brithday
      this.showBirthday = false
    },
    cancel () {
      this.showBirthday = false
    },
    onSubmit (values) {
      console.log('submit', values);
    }
  },
}
</script>

<style lang="less" scoped>

</style>
