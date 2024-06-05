<template>
  <div>
    <div v-if="!isAdding && !isEditing">
      <div class="search">
        <div class="search-input">
          <input type="text" v-model="searchQuery" placeholder="Tìm kiếm" />
        </div>
        <div class="search-button">
          <button
            type="button"
            class="btn btn-primary"
            @click="listStudent = search()"
          >
            Tìm kiếm
          </button>
        </div>
      </div>
      <div>
        <div class="addtion-student">
          <div @click="isAdding = true">Thêm học sinh</div>
        </div>
      </div>
      <div>
        <TableStudent :students="listStudent" @delete-student="deleteStudent" @edit-status-student="editStatusStudent" @edit-input-student="editInputStudent" />
      </div>
    </div>
    <AddStudent
      v-else
      @handleChangeAddingState="handleChangeAddingState"
      @add-student="addNewStudent"
      :is-adding="isAdding"
      :is-editing="isEditing"
      :student="student"
      @editStudent="editStudent"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import TableStudent from "./TableStudent.vue";
import AddStudent from "../addStudent/addStudent.vue";

export default {
  name: "HomepageVue",
  setup() {
    const isAdding = ref(false);
    const isEditing = ref(false);
    const student = ref();
    
    const defaultStudents = [
      { name: "Đỗ An", age: 13, class: "Lớp 11A", dateofbirth: "01/01/2003" },
      {
        name: "Nguyễn Ngọc",
        age: 14,
        class: "Lớp 12B",
        dateofbirth: "01/01/2003",
      },
    ];

    const loadStudents = () => {
      const students = localStorage.getItem("students");
      if (students) {
        return JSON.parse(students);
      } else {
        localStorage.setItem("students", JSON.stringify(defaultStudents));
        return defaultStudents;
      }
    };

    const handleChangeAddingState = () => {
      isAdding.value = false;
      isEditing.value = false;
      student.value = { name: '', age: '', class: '', dateofbirth: '' };
    };

    const listStudent = ref(loadStudents());
    const listStudent1 = ref([...listStudent.value]);
    const searchQuery = ref("");

    const saveStudents = () => {
      localStorage.setItem("students", JSON.stringify(listStudent.value));
    };

    const search = () => {
      console.log("check search", searchQuery.value);
      if (!searchQuery.value) {
        return listStudent1.value;
      } else {
        const searchTerm = searchQuery.value.toLowerCase();
        listStudent.value = listStudent.value.filter(
          (student) => student.name.toLowerCase() === searchTerm
        );
        return listStudent.value;
      }
    };

    const deleteStudent = (index) => {
      listStudent.value.splice(index, 1);
      listStudent1.value.splice(index, 1);
      saveStudents();
      toast("delete student successfully", { autoClose: 1000 });
    };

    const addNewStudent = (newStudent) => {
      listStudent.value = [...listStudent.value, newStudent];
      saveStudents();
      toast("add student successfully", { autoClose: 3000 });
    };

    const editStatusStudent = () => {
      isEditing.value = true;
    };

    const editInputStudent = (index) => {
      student.value = listStudent.value[index];
    };

    const editStudent = (updatedStudent) => {
      const index = listStudent.value.findIndex(
        (s) => s.name === student.value.name
      );
      if (index !== -1) {
        listStudent.value[index] = updatedStudent;
        const listStudent1Index = listStudent1.value.findIndex(
          (s) => s.name === student.value.name
        );
        if (listStudent1Index !== -1) {
          listStudent1.value[listStudent1Index] = updatedStudent;
        }
      }
      toast("update student successfully", { autoClose: 1000 });
      saveStudents();
      handleChangeAddingState();
    };

    onMounted(() => {
      listStudent.value = loadStudents();
    });

    return {
      listStudent,
      listStudent1,
      searchQuery,
      search,
      deleteStudent,
      addNewStudent,
      isAdding,
      handleChangeAddingState,
      isEditing,
      student,
      editStatusStudent,
      editInputStudent,
      editStudent,
    };
  },
  components: {
    TableStudent,
    AddStudent,
  },
};
</script>

<style scoped>
.search {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.addtion-student {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
}
</style>
