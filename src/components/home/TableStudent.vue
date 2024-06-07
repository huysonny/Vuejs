<template>
  <div class="tableStudent">
    <table class="table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên</th>
          <th>Tuổi</th>
          <th>Lớp</th>
          <th>Ngày sinh</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in paginatedStudents" :key="index">
          <td>{{ currentPage * pageSize + index + 1 }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.age }}</td>
          <td>{{ getClassName(student.class) }}</td>
          <td>{{ student.dateofbirth }}</td>
          <td class="button_table">
            <button type="button" class="btn btn-primary" @click="editStudent(index + currentPage * pageSize)">Sửa</button>
            <button type="button" class="btn btn-danger" @click="deleteStudent(index + currentPage * pageSize)">Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button :disabled="currentPage === 0" @click="prevPage">Previous</button>
      <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages - 1" @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script>
import { computed, watch ,ref} from 'vue';

export default {
  name: 'TableStudent',
  props: {
    students: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const pageSize = ref(3);

    const totalPages = computed(() => Math.ceil(props.students.length / pageSize.value));

    const paginatedStudents = computed(() => {
      const start = props.currentPage * pageSize.value;
      const end = start + pageSize.value;
      return props.students.slice(start, end);
    });

    const prevPage = () => {
      if (props.currentPage > 0) {
        emit('update:currentPage', props.currentPage - 1);
      }
    };

    const nextPage = () => {
      if (props.currentPage < totalPages.value - 1) {
        emit('update:currentPage', props.currentPage + 1);
      }
    };

    const deleteStudent = (index) => {
      emit('delete-student', index);
    };

    const editStudent = (index) => {
      emit('edit-status-student');
      emit('edit-input-student', index);
    };

    const loadClass = () => {
      const listclass = localStorage.getItem("listclass");
      return listclass ? JSON.parse(listclass) : [];
    };

    const listClass = ref(loadClass());

    const getClassName = (classId) => {
      const classObj = listClass.value.find(c => c.id === classId);
      return classObj ? classObj.classname : 'Unknown';
    };

    watch(props.students, () => {
      if (props.currentPage >= totalPages.value) {
        emit('update:currentPage', totalPages.value - 1);
      }
    });

    return {
      paginatedStudents,
      totalPages,
      pageSize,
      prevPage,
      nextPage,
      deleteStudent,
      editStudent,
      getClassName
    };
  }
}
</script>

<style scoped>
.tableStudent {
  margin-top: 20px;
}
.button_table {
  display: flex;
  gap: 20px;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}
</style>
