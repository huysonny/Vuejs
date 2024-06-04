<template>
  <div class="add-student-container">
    <h2>{{ $props.isAdding ? 'Thêm mới' : 'Chỉnh sửa' }}</h2>
    <div class="form-group">
      <label for="nameInput">Tên học sinh:</label>
      <input type="text" class="form-control" id="nameInput" v-model="name">
    </div>
    <div class="form-group">
      <label for="dobSelect">Ngày tháng năm sinh:</label>
      <div class="d-flex">
        <div class="select-container me-2">
          <select class="form-control" v-model="dobDay">
            <option value="" disabled selected>Ngày</option>
            <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
          </select>
        </div>
        <div class="select-container me-2">
          <select class="form-control" v-model="dobMonth">
            <option value="" disabled selected>Tháng</option>
            <option v-for="month in 12" :key="month" :value="month">{{ month }}</option>
          </select>
        </div>
        <div class="select-container">
          <select class="form-control" v-model="dobYear">
            <option value="" disabled selected>Năm</option>
            <option v-for="year in yearsRange" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label for="classSelect">Thuộc:</label>
      <select class="form-control" id="classSelect" v-model="className">
        <option value="">Chọn lớp</option>
        <option
          v-for="classItem in listClass"
          :key="classItem.classname"
          :value="classItem.classname"
        >
          {{ classItem.classname }}
        </option>
      </select>
    </div>
    <button v-if="isAdding" type="button" class="btn btn-primary" @click="addNewStudent">Thêm</button>
    <button v-else type="button" class="btn btn-primary" @click="saveStudent">Lưu</button>
    <div class="btn btn-secondary" @click="$emit('handleChangeAddingState')">Quay lại</div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'AddStudent', 
  props:{  
    isAdding: {
      require: true,
      type: Boolean,
    },
    isEditing: {
      require: true,
      type: Boolean,
    },
    student: {
      return: true,
      type: Object
    }
  },
  setup(props, { emit }) {
    const name = ref('');
    const dobDay = ref('');
    const dobMonth = ref('');
    const dobYear = ref('');
    const className = ref('');
    
    const saveStudent = () => {
      const dob = `${dobDay.value}/${dobMonth.value}/${dobYear.value}`;
      const age = calculateAge(dob);
      
      const newStudent = {
        name: name.value,
        age: age,
        class: className.value,
        dateofbirth: dob
      };
      emit('editStudent', newStudent);
    };
    
    const loadClass = () => {
      const listclass = localStorage.getItem("listclass");
      return listclass ? JSON.parse(listclass) : [];
    };

    const listClass = ref(loadClass());
    
    const addNewStudent = () => {
      const dob = `${dobDay.value}/${dobMonth.value}/${dobYear.value}`;
      const age = calculateAge(dob);
      
      const newStudent = {
        name: name.value,
        age: age,
        class: className.value,
        dateofbirth: dob
      };
      emit('add-student', newStudent);
      emit('handleChangeAddingState');
    };
    
    const calculateAge = (dob) => {
      const [day, month, year] = dob.split('/');
      const today = new Date();
      const birthDate = new Date(year, month - 1, day);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    const yearsRange = ref([...Array(new Date().getFullYear() - 1900 + 1).keys()].map(i => i + 1900).reverse());

    onMounted(() => {
      if (!props.student) return;
      const [day, month, year] = props.student.dateofbirth.split('/');
      name.value = props.student.name;
      dobDay.value = day;
      dobMonth.value = month;
      dobYear.value = year;
      className.value = props.student.class;
    });

    return {
      name,
      dobDay,
      dobMonth,
      dobYear,
      className,
      addNewStudent,
      saveStudent,
      listClass,
      yearsRange
    };
  }
}
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
</style>
