<template>
  <q-page class="bg-grey-3 column">
    <div class="note-list-container">
      <div class="q-pa-md note-list">
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>My Notes</q-toolbar-title>
          <q-btn round color="positive" icon="add" to="/note"></q-btn>
        </q-toolbar>
        <NoteCard
          :note="note"
          v-for="(note, index) in notes"
          :key="index"
          @delete="deleteNote($event)"
        />
        <q-list bordered class="bg-white no-notes" v-if="!notes.length">
          <q-item>
            <div class="no-tasks absolute-center">
              <q-icon name="check" size="100px" color="primary" />
              <div class="text-h5 text-primary text-center">No Tasks</div>
            </div>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, computed } from "vue";
import { ref } from "vue";
import { useQuasar } from "quasar";
import * as api from "../api/notes.js";
import NoteCard from "src/components/NoteCard.vue";
export default defineComponent({
  components: { NoteCard },
  setup() {
    const $q = useQuasar();
    const newTask = ref("");
    const notes = ref([]);

    onMounted(() => {
      api.getNotes().then((list) => {
        notes.value = list;
      });
    });

    const deleteNote = (id) => {
      $q.dialog({
        title: "Alert",
        message: "Are you sure want to delete task?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        api.deleteNote(id).then(() => {
          notes.value = notes.value.filter((note) => note.id !== id);
        });
        $q.notify("task deleted successfully.");
      });
    };

    return {
      notes,
      deleteNote,
      newTask,
    };
  },
});
</script>
<style lang="scss">
.no-notes {
  opacity: 0.5;
}

.note-list-container {
  display: flex;
  justify-content: center;
}

.note-list {
  width: 80%;
}

.q-list.no-notes .q-item {
  min-height: 386px !important;
  padding: 8px 16px;
  color: inherit;
  transition: color 0.3s, background-color 0.3s;
}
</style>
