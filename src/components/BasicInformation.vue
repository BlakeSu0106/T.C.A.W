<template>
  <div class="q-pa-md">
    <div class="column items-center justify-center">
      <h4>{{ t('basic-information') }}</h4>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md column items-center justify-center"
        style="width: 100%"
      >
        <div>
          <p>
            <span style="color: red;" class="q-mt-none">*</span>{{ t('name') }}
          </p>
          <q-input
            v-model="user.name"
            :dense="dense"
            :rules="[
              val => !!val || t('name-is-required'),
            ]"
            :hint="t('please-enter-name')"
            lazy-rules="ondemand"
            filled
          />
        </div>
        <div>
          <p>
            <span style="color: red;" class="q-mt-none">*</span>{{ t('mobile') }}
          </p>
          <q-input
            v-model="user.mobile"
            :dense="dense"
            :rules="[
              val => !!val || t('mobile-is-required'),
              val => validateMobile(user.mobile) || t('mobile-font-error')
            ]"
            :hint="t('please-enter-mobile')"
            lazy-rules="ondemand"
            filled
          />
        </div>
        <div>
          <p>
            <span style="color: red;" class="q-mt-none">*</span>{{ t('email') }}
          </p>
          <q-input
            v-model="user.email"
            :dense="dense"
            :rules="[
              val => !!val || t('email-is-required'),
              val => validateMail(user.email) || t('email-font-error')
            ]"
            :hint="t('please-enter-email')"
            lazy-rules="ondemand"
            filled
          />
        </div>
        <div>
          <q-btn
            outline color="black"
            :label="status === 'SignIn' ? t('save') : t('add')"
            type="submit"
            class="q-mr-sm"
          />
          <q-btn outline color="black" :label="t('back-to-index')" @click="goHomePage" />
        </div>

      </q-form>
    </div>
  </div>
</template>

<script>
import {
  ref, computed, reactive,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import consumerService from '../service/consumer.js';

export default {
  name: 'BasicInformation',
  props: {
    account: String,
    id: String,
  },
  setup(props) {
    const $q = useQuasar();
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const user = reactive({
      name: '',
      mobile: props.account,
      email: '',
    });
    const dense = ref(true);
    const status = ref(computed(() => store.state.consumer.status));

    function validateMobile(val) {
      const MobileReg = /^(09)[0-9]{8}$/;
      const result = val.match(MobileReg);
      return result;
    }

    function validateMail(val) {
      const EmailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const result = val.match(EmailReg);
      return result;
    }

    function onSubmit() {
      // 更新基本資料
      const params = {
        id: props.id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
      };
      consumerService.putMember(params)
        .then((result) => {
          if (result) {
            $q.notify({
              type: 'positive',
              message: '儲存成功',
            });
          }
          return result;
        });
    }

    function goHomePage() {
      store.commit('consumer/setState', { id: 'status', value: '' });
      router.push({ name: 'Home' });
    }

    console.log(store.state.consumer.status);

    if (status.value === 'SignIn') {
      // 取得基本資料
      const params = { id: props.id };
      consumerService.getMember(params)
        .then((result) => {
          console.log(result);
          user.name = result.name;
          user.mobile = result.mobile;
          user.email = result.email;
        });
    }

    return {
      dense,
      user,
      status,
      t,
      validateMobile,
      validateMail,
      onSubmit,
      goHomePage,
    };
  },
};
</script>
