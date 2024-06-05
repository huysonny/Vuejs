<template>
  <div class="add-student-container">
    <h2>{{ isAdding ? "Thêm mới" : "Chỉnh sửa" }}</h2>
    <div class="form-group">
      <label for="nameInput">Tên học sinh:</label>
      <input
        type="text"
        class="form-control"
        id="nameInput"
        v-model="name"
        :class="{ 'is-invalid': nameError }"
      />
      <div v-if="nameError" class="invalid-feedback">{{ nameError }}</div>
    </div>
    <div class="form-group">
      <label for="dobSelect">Ngày tháng năm sinh:</label>
      <div class="d-flex">
        <div class="select-container me-2">
          <select
            class="form-control"
            v-model="dobDay"
            :class="{ 'is-invalid': dobError }"
          >
            <option value="" disabled selected>Ngày</option>
            <option v-for="day in 31" :key="day" :value="formatAsTwoDigits(day)">{{ formatAsTwoDigits(day) }}</option>
          </select>
        </div>
        <div class="select-container me-2">
          <select
            class="form-control"
            v-model="dobMonth"
            :class="{ 'is-invalid': dobError }"
          >
            <option value="" disabled selected>Tháng</option>
            <option v-for="month in 12" :key="month" :value="formatAsTwoDigits(month)">
              {{ formatAsTwoDigits(month) }}
            </option>
          </select>
        </div>
        <div class="select-container">
          <select
            class="form-control"
            v-model="dobYear"
            :class="{ 'is-invalid': dobError }"
          >
            <option value="" disabled selected>Năm</option>
            <option v-for="year in yearsRange" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
      </div>
      <div v-if="dobError" class="invalid-feedback">{{ dobError }}</div>
    </div>
    <div class="form-group">
      <label for="classSelect">Thuộc:</label>
      <select class="form-control" id="classSelect" v-model="className" :class="{ 'is-invalid': classError }">
        <option value="">Chọn lớp</option>
        <option v-for="classItem in listClass" :key="classItem.classname" :value="classItem.classname">
          {{ classItem.classname }}
        </option>
      </select>
      <div v-if="classError" class="invalid-feedback">{{ classError }}</div>
    </div>
    <button
      v-if="isAdding"
      type="button"
      class="btn btn-primary"
      @click="addNewStudent"
    >
      Thêm
    </button>
    <button v-else type="button" class="btn btn-primary" @click="saveStudent">
      Lưu
    </button>
    <div class="btn btn-secondary" @click="$emit('handleChangeAddingState')">
      Quay lại
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "AddStudent",
  props: {
    isAdding: {
      required: true,
      type: Boolean,
    },
    isEditing: {
      required: true,
      type: Boolean,
    },
    student: {
      required: true,
      type: Object,
    },
  },
  setup(props, { emit }) {
    const name = ref("");
    const dobDay = ref("");
    const dobMonth = ref("");
    const dobYear = ref("");
    const className = ref("");

    const nameError = ref("");
    const dobError = ref("");
    const classError = ref("");

    const validateForm = () => {
      let isValid = true;
      
      if (name.value.length < 4 || name.value.length > 150) {
        nameError.value = "Tên phải có độ dài từ 4 đến 150 ký tự.";
        toast.error(nameError.value);
        isValid = false;
      } else {
        nameError.value = "";
      }

      if (!dobDay.value || !dobMonth.value || !dobYear.value) {
        dobError.value = "Vui lòng chọn ngày, tháng và năm sinh.";
        toast.error(dobError.value);
        isValid = false;
      } else {
        dobError.value = "";
      }

      if (!className.value) {
        classError.value = "Vui lòng chọn lớp.";
        toast.error(classError.value);
        isValid = false;
      } else {
        classError.value = "";
      }

      return isValid;
    };

    const saveStudent = () => {
      if (!validateForm()) return;

      const dob = `${dobDay.value}/${dobMonth.value}/${dobYear.value}`;
      const age = calculateAge(dob);

      const updatedStudent = {
        name: name.value,
        age: age,
        class: className.value,
        dateofbirth: dob,
      };
      emit("editStudent", updatedStudent);
    
    };

    const loadClass = () => {
      const listclass = localStorage.getItem("listclass");
      return listclass ? JSON.parse(listclass) : [];
    };

    const listClass = ref(loadClass());

    const addNewStudent = () => {
      if (!validateForm()) return;

      const dob = `${dobDay.value}/${dobMonth.value}/${dobYear.value}`;
      const age = calculateAge(dob);

      const newStudent = {
        name: name.value,
        age: age,
        class: className.value,
        dateofbirth: dob,
      };
      emit("add-student", newStudent);
      emit("handleChangeAddingState");
     
    };

    const calculateAge = (dob) => {
      const [day, month, year] = dob.split("/");
      const today = new Date();
      const birthDate = new Date(year, month - 1, day);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    };

    const yearsRange = ref(
      [...Array(new Date().getFullYear() - 1900 + 1).keys()]
        .map((i) => i + 1900)
        .reverse()
    );

    const populateFormFields = () => {
      if (props.student && !props.isAdding) {
        const [day, month, year] = props.student.dateofbirth.split("/");
        console.log("day , month, year", day, month, year);
        console.log("props.student.class", props.student.class);
        name.value = props.student.name;
        dobDay.value = day;
        dobMonth.value = month;
        dobYear.value = year;
        className.value = props.student.class;
      } else {
        name.value = "";
        dobDay.value = "";
        dobMonth.value = "";
        dobYear.value = "";
        className.value = "";
      }
    };

    const formatAsTwoDigits = (value) => {
      return value.toString().padStart(2, "0");
    };

    watch(() => props.student, populateFormFields);
    onMounted(populateFormFields);

    return {
      name,
      dobDay,
      dobMonth,
      dobYear,
      className,
      addNewStudent,
      saveStudent,
      listClass,
      yearsRange,
      formatAsTwoDigits,
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

.d-flex {
  display: flex;
  gap: 10px;
}

.select-container {
  flex: 1;
}

.me-2 {
  margin-right: 10px;
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
