<template>
  <q-layout view="lHh Lpr lFf">
    <q-header >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

      </q-toolbar>
      <div class="q-px-lg q-pt-lg q-mb-md">
        <div class="text-h3">
          Todo
        </div>
        <div class="text-subtitle1">{{ todaysDate }}</div>
      </div>
      <q-img src="../assets/clouds.jpg" class="header-image absolute-top" />
    </q-header>

       <q-drawer
          v-model="leftDrawerOpen"
          show-if-above
          :width="250"
          :breakpoint="600"
        >
          <q-scroll-area style="height: calc(100% - 167.98px); margin-top: 167.98px; border-right: 1px solid #ddd">
            <q-list padding>
              <q-item to="/" clickable v-ripple exact>
                <q-item-section avatar>
                  <q-icon name="list"></q-icon>
                </q-item-section>

                <q-item-section>
                  Todo
                </q-item-section>
              </q-item>

                <q-item clickable v-ripple to="/help" exact>
                  <q-item-section avatar>
                    <q-icon name="help"></q-icon>
                  </q-item-section>

                  <q-item-section>
                    Help
                  </q-item-section>
                </q-item>
            </q-list>
          </q-scroll-area>

          <q-img class="absolute-top" src="../assets/clouds.jpg" style="height: 167.98px">
            <div class="absolute-bottom bg-transparent">
              <q-avatar size="56px" class="q-mb-sm">
                <img src="../assets/avatar.svg">
              </q-avatar>
              <div class="text-weight-bold">Divya Sonara</div>
              <div>@divyasonara</div>
            </div>
          </q-img>
        </q-drawer>

    <q-page-container>
      <keep-alive>
      <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { date } from 'quasar'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)

    const todaysDate = computed(()=> date.formatDate(Date.now(),'dddd D MMMM')) 

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      todaysDate
    }
  }
})
</script>
<style lang="scss">
.header-image{
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}

</style>