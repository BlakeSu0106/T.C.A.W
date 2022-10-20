<template>
  <div class="q-pa-md">
    <div v-if="!status" class="column items-center justify-center">
      <h4>{{ t('sign-in') }}</h4>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md column items-center justify-center"
      >
        <!-- 登入-驗證密碼 start -->
        <div>
          <p>
            <span style="color: red;" class="q-mt-none">*</span>{{ t('passward') }}
          </p>
          <q-input
            v-model="password"
            :dense="dense"
            :type="isPwd ? 'password' : 'text'"
            :rules="[
              val => !!val || t('passward-is-require'),
            ]"
            :hint="t('please-enter-passward')"
            :error="rule"
            :error-message="t('passward-error')"
            lazy-rules="ondemand"
            filled
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <!-- 登入-驗證密碼 end -->
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
import { useQuasar } from 'quasar';
import consumerService from '../service/consumer.js';

export default {
  name: 'SignIn',
  props: {
    account: String,
  },
  emits: ['updateId'],
  setup(props, { emit }) {
    const $q = useQuasar();
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const dense = ref(true);
    const password = ref('');
    const isPwd = ref(true);
    const status = ref(computed(() => store.state.consumer.status));
    const id = ref('');
    const rule = ref(false);

    function memberLogin(params) {
      return consumerService.memberLogin(params)
        .then((data) => data);
    }

    function onSubmit() {
      // 驗證密碼
      const params = {
        mobile: props.account,
        password: password.value,
      };
      memberLogin(params).then((data) => {
        id.value = data.id;
        if (data.id) {
          rule.value = false;
          emit('updateId', id.value);
        } else rule.value = true;
        if (!rule.value) {
          store.commit('consumer/setState', { id: 'status', value: 'SignIn' });
          $q.notify({
            type: 'positive',
            message: '登入成功',
          });
        }
      });
      // 最終應該要導頁到會員中心 而不是基本資料
    }

    function goHomePage() {
      store.commit('consumer/setState', { id: 'status', value: '' });
      router.push({ name: 'Home' });
    }

    return {
      dense,
      password,
      isPwd,
      status,
      id,
      rule,
      t,
      onSubmit,
      goHomePage,
    };
  },
};
</script>
