<template>
  <div class="q-pa-md">
    <!-- 帳號驗證 start -->
    <Account
      v-if="step === 'AccountId'"
      @updateAccount="updateAccount"
      @updateStep="updateStep"
    />
    <!-- 帳號驗證 end -->
    <!-- 簡訊驗證 start -->
    <VerifyCode
      v-else-if="step === 'VerifyCode'"
      :account="account"
      @updateStep="updateStep"
    />
    <!-- 簡訊驗證 end -->
    <!-- 註冊頁 start -->
    <SignUp
      v-else-if="step === 'SignUp'"
      :account="account"
      @updateId="updateId"
    />
    <!-- 註冊頁 end -->
    <!-- 登入頁 start -->
    <SignIn
      v-else-if="step === 'SignIn'"
      :account="account"
      @updateId="updateId"
    />
    <!-- 登入頁 end -->
    <!-- 基本資料頁 start -->
    <BasicInformation
      v-if="status"
      :account="account"
      :id="id"
    />
    <!-- 基本資料頁 end -->
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import BasicInformation from './BasicInformation.vue';
import SignUp from './SignUp.vue';
import SignIn from './SignIn.vue';
import Account from './Account.vue';
import VerifyCode from './VerifyCode.vue';

export default {
  components: {
    BasicInformation, SignUp, SignIn, Account, VerifyCode,
  },
  name: 'SignPage',
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const account = ref('');
    const dense = ref(true);
    const step = ref('AccountId'); // AccountId, VerifyCode, SignUp/SignIn
    const status = ref(computed(() => store.state.consumer.status));
    const id = ref('');

    function updateAccount(val) {
      account.value = val;
    }

    function updateId(val) {
      id.value = val;
    }

    function updateStep(val) {
      step.value = val;
    }

    return {
      account,
      dense,
      step,
      status,
      id,
      t,
      updateAccount,
      updateId,
      updateStep,
    };
  },
};
</script>
