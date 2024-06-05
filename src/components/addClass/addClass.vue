<template>
  <div class="add-student-container">
    <h2>{{ isAdding ? "Thêm mới" : "Chỉnh sửa" }}</h2>
    <div class="form-group">
      <label for="nameInput">Tên Lớp</label>
      <input
        type="text"
        class="form-control"
        id="nameInput"
        v-model="className"
        :class="{ 'is-invalid': nameError }"
      />
      <div v-if="nameError" class="invalid-feedback">{{ nameError }}</div>
    </div>
    <div class="form-group">
      <label for="classSelect">Thuộc:</label>
      <select class="form-control" id="classSelect" v-model="group">
        <option value="">Chọn nhóm</option>
        <option v-for="classItem in listClass" :key="classItem.classname" :value="classItem.id">
          {{ classItem.classname }}
        </option>
      </select>
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "AddClass",
  props: {
    isAdding: {
      required: true,
      type: Boolean,
    },
    isEditing: {
      required: true,
      type: Boolean,
    },
    class1: {
      required: true,
      type: Object,
    },
  },
  setup(props, { emit }) {
    const group = ref("");
    const className = ref("");
    const nameError = ref("");

    const validateForm = () => {
      let isValid = true;

      if (className.value.length < 4 || className.value.length > 100) {
        nameError.value = "Tên lớp phải có độ dài từ 4 đến 100 ký tự.";
        toast.error(nameError.value);
        isValid = false;
      } else {
        nameError.value = "";
      }

      return isValid;
    };

    const saveClass = () => {
      if (!validateForm()) return;

      const newClass = {
        classname: className.value,
        group: group.value,
        id: props.class1.id,
      };
      emit("edit-class", newClass);
      
    };

    const loadClass = () => {
      const listclass = localStorage.getItem("listclass");
      return listclass ? JSON.parse(listclass) : [];
    };

    const listClass = ref(loadClass());

    const addNewClass = () => {
      if (!validateForm()) return;

      let id = Math.max(...listClass.value.map((item) => item.id));
      const newClass = {
        classname: className.value,
        group: group.value,
        id: id + 1,
      };
      emit("add-class", newClass);
      emit("handleChangeAddingState");
    
    };

    onMounted(() => {
      if (props.class1) {
        className.value = props.class1.classname;
        group.value = props.class1.group;
      }
    });

    return {
      className,
      group,
      addNewClass,
      saveClass,
      listClass,
      nameError,
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

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  display: block;
  margin-top: 0.25rem;
}
</style>
