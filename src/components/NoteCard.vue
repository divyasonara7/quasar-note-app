<template>
  <q-list bordered class="bg-white">
    <q-item class="q-my-sm" clickable v-ripple>
      <q-item-section @click="router.push(`/note/view/${note.id}`)">
        <q-item-label>{{ note.title }}</q-item-label>
        <q-item-label caption lines="1"> {{ note.description }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <div>
          <q-icon
            name="edit"
            @click="router.push(`/note/${note.id}`)"
            size="2em"
          />
          <q-icon
            class="q-ml-sm"
            name="delete"
            @click="$emit('delete', note.id)"
            size="2em"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  name: "NoteCard",
  props: {
    note: Object,
  },
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
};
</script>
