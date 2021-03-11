<!--
 * @FileDescription:邀请好友加入群组
 * @Author: hbh
 * @Date: 2021-02-21
 -->
<template>
  <el-dialog
    :close-on-click-modal="false"
    class="group-join"
    title="邀请好友加入群组"
    :visible.sync="toggle"
  >
    <el-form :inline="true">
      <el-form-item class="group-join-input">
        <el-input
          id="copyInput"
          v-model="inviteCode"
          autocomplete="off"
        ></el-input>
        <p>将邀请码复制给小伙伴就可以啦！有效期为7天哦～</p>
      </el-form-item>
      <el-form-item class="group-join-btn">
        <el-button
          id="copyBtn"
          data-clipboard-action="copy"
          data-clipboard-target="#copyInput"
          type="primary"
          >复制链接</el-button
        >
        <p v-show="isCopy" class="copy-msg">复制成功！</p>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import api from "../../api";
import { encryptDecrypt } from "@/common/util";
import { mapState } from "vuex";
// 现代化的拷贝文字 http://www.clipboardjs.cn/
import ClipboardJS from "clipboard";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    groupDetail: Object
  },
  data() {
    return {
      inviteCode: "", // 邀请
      isCopy: false
    };
  },
  computed: {
    ...mapState({
      user: state => {
        return state.user.userDatail;
      }
    }),
    toggle: {
      get() {
        return this.isShow;
      },
      set(val) {
        this.$emit("update:isShow", val);
      }
    }
  },
  methods: {
    // 复制
    clipboard() {
      this.$nextTick(() => {
        let copyBtn = new ClipboardJS("#copyBtn");
        copyBtn.on("success", () => {
          this.isCopy = true;
        });

        copyBtn.on("error", () => {
          this.isCopy = false;
        });
      });
    },
    // 获取群组邀请地址
    async getGroupInvite() {
      let groupId = this.$route.query.id;
      let res = await api.getGroupInvite(groupId);
      if (res) {
        let { groupName, groupId } = this.groupDetail;
        const aesCode = encryptDecrypt.aes.encrypt({
          code: res,
          inviterId: this.user.userId,
          inviterName: this.user.username,
          targetGroupId: groupId,
          targetGroupName: groupName
        });
        this.inviteCode = `${window.location.origin}/#/?code=${aesCode}`;
      }
    }
  },
  watch: {
    isShow: function(val) {
      if (val) {
        this.clipboard();
        this.getGroupInvite();
      }
    }
  }
};
</script>
<style lang="less">
@import "./style.less";
</style>
