<template>
  <q-page padding>
    <Container>
      <h3 v-if="!hasIdParam">New Note</h3>
      <h3 v-else>Edit Note</h3>
      <form @submit="submit">
        <q-input
          class="q-mt-sm"
          outlined
          v-model="note.title"
          label="Title"
          :rules="[(val) => !!val || 'Title is required']"
        />

        <q-input
          class="q-mt-sm"
          outlined
          v-model="note.description"
          label="Description"
          dense
          :rules="[(val) => !!val || 'Description is required']"
        />

        <q-card flat bordered class="q-mt-sm">
          <q-editor
            v-model="note.content"
            min-height="5rem"
            @update:modelValue="onContentChange"
          />
        </q-card>
        <div class="q-mt-md">
          <q-btn color="grey" to="/" type="reset">Cancel</q-btn>
          <q-btn
            class="q-ml-sm"
            color="positive"
            type="submit"
            :disable="!formIsValid"
            v-if="!hasIdParam"
          >
            Create
          </q-btn>
          <q-btn
            class="q-ml-sm"
            color="positive"
            type="submit"
            :disable="!formIsValid"
            v-else
          >
            update
          </q-btn>
        </div>
      </form>
    </Container>
  </q-page>
</template>
<script>
import Container from "src/components/Container.vue";
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import * as api from "../api/notes.js";

export default defineComponent({
  components: { Container },
  name: "PageNew",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const note = ref({});
    const submit = () => {
      if (!hasIdParam.value) {
        api.createNote(note.value).then((response) => {
          router.push("/");
          note.value = {};
        });
      } else {
        console.log("note.value", note.value);
        api.updateNote(note.value).then((response) => {
          router.push("/");
        });
      }
    };
    const formIsValid = computed(() => {
      return note.value.title && note.value.description;
    });

    const hasIdParam = computed(() => {
      return route.params.id ? true : false;
    });

    onMounted(() => {
      hasIdParam.value ? getNote(route.params.id) : false;
    });
    const getNote = (id) => {
      api.getNoteByID(id).then((response) => {
        note.value = response;
      });
    };
    const onContentChange = (newContent) => {
      note.value.content = newContent;
    };

    return {
      note,
      submit,
      formIsValid,
      hasIdParam,
      onContentChange,
    };
  },
});
</script>
