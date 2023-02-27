<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
           <q-input filled v-model="newTask" placeholder="Add task" dense bg-color="white" class="col" @keyup.enter="addNewTask(newTask)">

          <template v-slot:append>
            <q-btn round dense flat icon="add" @click="addNewTask(newTask)"/>
          </template>
        </q-input>
    </div>
      <q-list class="bg-white" separator bordered>
        <q-item  v-for="task,index in tasks" :key="index"  clickable v-ripple @click="task.done = !task.done" :class="{'done bg-blue-1' : task.done}">
          <q-item-section avatar >
            <q-checkbox v-model="task.done" color="primary" class="no-pointer-events"></q-checkbox>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ task.title }}</q-item-label>
          </q-item-section>
            <q-item-section v-if="task.done" side>
             <q-btn @click.stop="deleteTask(index)" round color="primary" flat icon="delete" dense />
            </q-item-section>
        </q-item>
      </q-list>

      <div class="no-tasks absolute-center" v-if="!tasks.length">
        <q-icon name="check" size="100px" color="primary"/>  
        <div class="text-h5 text-primary text-center">
          No Tasks
        </div>
      </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import {ref} from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({

  setup(){
    const $q = useQuasar()
    const newTask = ref('');
    const tasks =ref([
      {
        title: "learn iconic",
        done: false,
      },
      {
        title: "learn quasar",
        done: false,
      },
      {
        title: "learn capacitor",
        done: false,
      }
    ])

    const deleteTask = (index)=>{
        $q.dialog({
        title: 'Alert',
        message: 'Are you sure want to delete task?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        tasks.value.splice(index,1);
        $q.notify('task deleted successfully.')
      })
    
    }
      const addNewTask = (task) => {
      tasks.value.push({
        title: task,
        done: false
      })
      newTask.value = '';
    }
     return{
     tasks,
     deleteTask,
     addNewTask,
     newTask
     }
  }
})
</script>
<style lang="scss">
.done{
  .q-item__label{
    text-decoration: line-through;
    color: #bbb;
  }
}

.no-tasks{
  opacity: 0.5;
}

</style>>
