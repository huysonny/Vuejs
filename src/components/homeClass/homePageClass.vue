<template>
  <div>
    <div v-if="!isAdding && !isEditing">
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
import { ref, onMounted } from "vue";
import TableClass from "./TableClass.vue";
import addClass from "../addClass/addClass.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "HomePageClass",

  setup() {
    const isAdding = ref(false);
    const isEditing = ref(false);
    const class1 = ref();
    const listClass = ref([]);

    const defaultClasses = [
      { classname: "11", group: null,id:1},
      { classname: "Lớp 11A", group: 1,id:3},
      { classname: "Lớp 11B", group: 1 ,id:4},
      { classname: "12", group: null,id:2 },
      { classname: "Lớp 12A", group: 2 ,id:5},
      { classname: "Lớp 12B", group: 2 ,id:6},
    ];

    const loadClass = () => {
      const storedClasses = localStorage.getItem("listclass");
      if (storedClasses) {
        return JSON.parse(storedClasses);
      }
      return defaultClasses;
    };

    const handleChangeAddingState = () => {
      isAdding.value = false;
      isEditing.value = false;
      class1.value = { classname: "", group: "" };
    };

    const saveClass = () => {
      localStorage.setItem("listclass", JSON.stringify(listClass.value));
    };

    const addNewClass = (newClass) => {
      listClass.value = [...listClass.value, newClass];
      saveClass();
      toast("add class successfully", { autoClose: 1000 });
    };

    const deleteClass = (index) => {
      listClass.value.splice(index, 1);
      saveClass();
      toast("delete class successfully", { autoClose: 1000 });
    };

    const editStatusClass = () => {
      isEditing.value = true;
    };

    const editInputClass = (index) => {
      class1.value = listClass.value[index];
    };

    const editClass = (updatedStudent) => {
      const index = listClass.value.findIndex(
        (s) => s.classname === class1.value.classname
      );
      if (index !== -1) {
        listClass.value[index] = updatedStudent;
      }
      toast("update class successfully", { autoClose: 1000 });
      saveClass();
      handleChangeAddingState();
    };

    onMounted(() => {
      if (!localStorage.getItem("listclass")) {
        localStorage.setItem("listclass", JSON.stringify(defaultClasses));
      }
      listClass.value = loadClass();
    });

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
      editClass,
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
