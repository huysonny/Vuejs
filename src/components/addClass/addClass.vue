<template>
  <div class="add-student-container">
    <h2>{{ $props.isAdding ? "Thêm mới" : "Chỉnh sua" }}</h2>
    <div class="form-group">
      <label for="nameInput">Tên Lớp</label>
      <input
        type="text"
        class="form-control"
        id="nameInput"
        v-model="className"
      />
    </div>
    <div class="form-group">
      <label for="classInput">Thuộc:</label>
      <input type="text" class="form-control" id="classInput" v-model="level" />
    </div>
    <button
      v-if="isAdding"
      type="button"
      class="btn btn-primary"
      @click="addNewClass"
    >
      Thêm
    </button>
    <button v-else type="button" class="btn btn-primary" @click="saveClass">
      Lưu
    </button>
    <div class="btn btn-secondary" @click="$emit('handleChangeAddingState')">
      Quay lại
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "AddClass",
  props: {
    isAdding: {
      require: true,
      type: Boolean,
    },
    isEditing: {
      require: true,
      type: Boolean,
    },
    class1: {
      return: true,
      type: Object,
    },
  },
  setup(props, { emit }) {
    const level = ref("");
    const className = ref("");

    const saveClass = () => {
      const newClass = {
        classname: className.value,
        level: level.value,
      };
      emit("edit-class", newClass);
    };
    const addNewClass = () => {
      const newClass = {
        classname: className.value,
        level: level.value,
      };
      emit("add-class", newClass);
      emit("handleChangeAddingState");
    };

    onMounted(() => {
      console.log("?", props.class1);
      if (!props.class1) return;
      className.value = props.class1?.classname;
      level.value = props.class1?.level;
    });

    return {
      className,
      level,
      addNewClass,
      saveClass,
    };
  },
};
</script>

<style scoped>
.add-student-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.btn-secondary {
  margin-left: 10px;
}
</style>
