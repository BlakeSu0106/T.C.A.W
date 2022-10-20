<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <!-- <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar> -->
    </q-header>
    <q-page-container>
      <!-- <router-view /> -->
      <div class="row items-center justify-center" style="height: 100vh;">
        <q-btn outline color="black" :label="t('sign-in-and-sign-up')" @click="goToSignPage" />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const leftDrawerOpen = ref(false);

    function goToSignPage() {
      router.push({ name: 'SignPage' });
    }

    return {
      leftDrawerOpen,
      t,
      goToSignPage,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
