<template>
  <div class="tableStudent">
    <table class="table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Lớp</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(classItem, index) in paginatedClasses" :key="classItem.classname">
          <td>{{ index + currentPage * pageSize+1}}</td>
          <td>{{ classItem.classname }}</td>
          <td class="button_table">
            <button type="button" class="btn btn-primary" @click="editClass(index + currentPage * pageSize)">Sửa</button>
            <button type="button" class="btn btn-danger" @click="deleteClass(index + currentPage * pageSize)">Xoá</button>
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
import { computed, ref, onMounted, watch } from 'vue';

export default {
  name: 'TableClass',
  props: {
    listClass: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const pageSize = ref(3);
    const currentPage = ref(0);

    const totalPages = computed(() => Math.ceil(props.listClass.length / pageSize.value));

    const paginatedClasses = computed(() => {
      const start = currentPage.value * pageSize.value;
      const end = start + pageSize.value;
      return props.listClass.slice(start, end);
    });

    const prevPage = () => {
      if (currentPage.value > 0) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value - 1) {
        currentPage.value++;
      }
    };

    const deleteClass = (index) => {
      emit('delete-class', index);
    };

    const editClass = (index) => {
      emit('edit-status-class');
      emit('edit-input-class', index);
    };

    onMounted(() => {
      console.log("check props >>", props.listClass);
    });

    watch(props.listClass, () => {
      if (currentPage.value >= totalPages.value) {
        currentPage.value = totalPages.value - 1;
      }
    });

    return {
      paginatedClasses,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
      pageSize,
      deleteClass,
      editClass
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
