<script>
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Container from "src/components/Container.vue";
import * as api from "../api/notes.js";

export default {
  components: { Container },
  setup() {
    const note = ref({});
    const route = useRoute();
    const router = useRouter();
    const noteId = computed(() => parseInt(route.params.id));
    onMounted(() => {
      noteId.value ? getNote(noteId.value) : false;
    });
    const getNote = (id) => {
      api.getNoteByID(id).then((response) => {
        note.value = response;
      });
    };
    return { note, router };
  },
};
</script>

<template>
  <q-page padding>
    <Container>
      <div class="row items-center justify-between">
        <h3 class="q-mb-md q-mt-md">{{ note.title }}</h3>
        <div>
          <q-btn
            round
            color="secondary"
            icon="edit"
            @click="router.push(`/note/${note.id}`)"
          />
        </div>
      </div>
      <div>{{ note.description }}</div>
      <div class="q-mt-md" v-html="note.content" />
    </Container>
  </q-page>
</template>
