<template>
  <div class="q-pa-md">
    <div
      v-if="!status"
      class="column items-center justify-center"
    >
      <h4>{{ t('verifyCode') }}</h4>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md column items-center justify-center"
      >
        <!-- 簡訊認證 start -->
        <div>
          <p>
            <span style="color: red;" class="q-mt-none">*</span>{{ t('verifyCode') }}
          </p>
          <q-input
            v-model="verifyCode"
            :dense="dense"
            :rules="[
              val => !!val || t('verifyCode-is-require'),
              val => validateVerifyCode(val) || t('verifyCode-error')
            ]"
            :hint="t('please-enter-verifyCode')"
            lazy-rules="ondemand"
            filled
          >
            <template v-slot:append>
              <q-icon
                name="email"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </div>
        <!-- 簡訊認證 end -->
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
import consumerService from '../service/consumer.js';

export default {
  name: 'VerifyCode',
  props: {
    account: String,
  },
  emits: ['updateStep'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const dense = ref(true);
    const verifyCode = ref('');
    const status = ref(computed(() => store.state.consumer.status));
    const id = ref('');

    function validateVerifyCode() {
      // TODO 實作簡訊驗證
      return true;
    }

    function onSubmit() {
      const params = {
        mobile: props.account,
        companyId: '1131906d-03df-4faa-a6c4-dc9e3a1f12a4',
      };
      // 帳號驗證
      consumerService.validateMember(params)
        .then((result) => {
          if (result) emit('updateStep', 'SignIn');
          else emit('updateStep', 'SignUp');
        });
    }

    function goHomePage() {
      store.commit('consumer/setState', { id: 'status', value: '' });
      router.push({ name: 'Home' });
    }

    return {
      dense,
      verifyCode,
      status,
      id,
      t,
      validateVerifyCode,
      onSubmit,
      goHomePage,
    };
  },
};
</script>
