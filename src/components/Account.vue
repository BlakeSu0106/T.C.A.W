<template>
  <div class="q-pa-md">
    <div
      v-if="!status"
      class="column items-center justify-center"
    >
      <h4>{{ t('sign-in-and-sign-up') }}</h4>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md column items-center justify-center"
      >
        <!-- 帳號驗證 start -->
        <div>
          <p>
            <span style="color: red;" class="q-mt-none">*</span>{{ t('account') }}
          </p>
          <q-input
            v-model="account"
            :dense="dense"
            :rules="[
              val => !!val || t('account-is-require'),
              val => validateAccountId(val) || t('account-font-error')
            ]"
            :hint="t('please-enter-account')"
            lazy-rules="ondemand"
            filled
          >
            <template v-slot:append>
              <q-icon
                name="account_circle"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </div>
        <!-- 帳號驗證 end -->
        <!-- 置底按紐 start -->
        <div>
          <q-btn outline color="black" :label="t('next')" type="submit" class="q-mr-sm" />
          <q-btn outline color="black" :label="t('back-to-index')" @click="goHomePage" />
        </div>
        <!-- 置底按紐 end -->
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
// import consumerService from '../service/consumer.js';

export default {
  name: 'AccountPage',
  emits: ['updateStep', 'updateAccount'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const account = ref('');
    const dense = ref(true);
    const status = ref(computed(() => store.state.consumer.status));
    const id = ref('');

    function validateAccountId(val) {
      const MobileReg = /^(09)[0-9]{8}$/;
      const result = val.match(MobileReg);
      return result;
    }

    function onSubmit() {
      // TODO 實作簡訊認證
      // step.value = 'VerifyCode';
      emit('updateAccount', account.value);
      emit('updateStep', 'VerifyCode');
    }

    function goHomePage() {
      store.commit('consumer/setState', { id: 'status', value: '' });
      router.push({ name: 'Home' });
    }

    return {
      account,
      dense,
      status,
      id,
      t,
      validateAccountId,
      onSubmit,
      goHomePage,
    };
  },
};
</script>
