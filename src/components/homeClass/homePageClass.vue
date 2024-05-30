<template>
  <div>
    <div div v-if="!isAdding && !isEditing">
      <div class="addtion-student">
        <div @click="isAdding = true">Thêm Lớp</div>
      </div>
      <div>
        <TableClass
          :listClass="listClass"
          @delete-class="deleteClass"
          @edit-status-class="editStatusClass"
          @edit-input-class="editInputClass"
        />
      </div>
    </div>
    <addClass
      v-else
      @handleChangeAddingState="handleChangeAddingState"
      @add-class="addNewClass"
      :is-adding="isAdding"
      :is-editing="isEditing"
      :class1="class1"
      @edit-class="editClass"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import TableClass from "./TableClass.vue";
import addClass from "../addClass/addClass.vue";
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  name: "HomePageClass",

  setup() {
    const isAdding = ref(false);
    const isEditing = ref(false);
    const class1 = ref();
    const loadClass = () => {
      const listclass = localStorage.getItem("listclass");
      if (listclass) {
        return JSON.parse(listclass);
      }
      return [
        { classname: "11", level: 11 },
        { classname: "Lớp 11A", level: 11 },
        { classname: "Lớp 11B", level: 11 },
        { classname: "12", level: 12 },
        { classname: "Lớp 12A", level: 12 },
        { classname: "Lớp 12B", level: 12 },
      ];
    };
    const handleChangeAddingState = () => {
      isAdding.value = false;
      isEditing.value = false;
      class1.value = { classname: "", level: "" };
    };

    const saveClass = () => {
      localStorage.setItem("listclass", JSON.stringify(listClass.value));
    };

    const addNewClass = (newClass) => {
      listClass.value = [...listClass.value, newClass];
      saveClass();
      toast('add class sucessfully ',{autoClose:1000})
    };

    const listClass = ref(loadClass());
    const deleteClass = (index) => {
      listClass.value.splice(index, 1);
      saveClass();
      toast('delete class sucessfully ',{autoClose:1000})
    };

    const editStatusClass = () => {
      isEditing.value = true;
    };
    const editInputClass = (index) => {
      class1.value = listClass.value[index];
      
    };
    const editClass = (updatedStudent) => {
      const index = listClass.value.findIndex((s) => s.classname === class1.value.classname);
      if (index !== -1) {
       listClass.value[index] = updatedStudent;
       
      }
      toast('update class sucessfully ',{autoClose:1000})
      saveClass();
      handleChangeAddingState();
    };


    return {
      isAdding,
      listClass,
      isEditing,
      deleteClass,
      class1,
      handleChangeAddingState,
      addNewClass,
      editStatusClass,
      editInputClass,
      editClass
    };
  },
  components: {
    TableClass,
    addClass,
  },
};
</script>

<style scoped>
.addtion-student {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
}
</style>
