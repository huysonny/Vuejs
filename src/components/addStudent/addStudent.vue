<template>
  <div class="add-student-container">
    <h2>{{ $props.isAdding ? 'Thêm mới' : 'Chỉnh sua' }}</h2>
    <div class="form-group">
      <label for="nameInput">Tên học sinh:</label>
      <input type="text" class="form-control" id="nameInput" v-model="name">
    </div>
    <div class="form-group">
      <label for="dobInput">Ngày tháng năm sinh:</label>
      <input type="text" class="form-control" id="dobInput" v-model="dob" pattern="\d{2}/\d{2}/\d{4}" placeholder="dd/mm/yyyy">
    </div>
    <div class="form-group">
      <label for="classInput">Lớp:</label>
      <input type="text" class="form-control" id="classInput" v-model="className">
    </div>
   <button v-if="isAdding" type="button" class="btn btn-primary" @click="addNewStudent">Thêm</button>
    <button v-else type="button" class="btn btn-primary" @click="saveStudent">Lưu</button>
     <div class="btn btn-secondary" @click="$emit('handleChangeAddingState')">Quay lại</div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import router from '../router';

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
      return:true,
      type:Object
    }
  },
  setup(props,{emit}) {
    const name = ref('');
    const dob = ref('');
    const className = ref('');
    console.log(router.currentRoute.value)
    
    const saveStudent=()=>{
      const age = calculateAge(dob.value);
      console.log('Tuổi:', age);
      
      const newStudent = {
        name: name.value,
        age: age,
        class: className.value,
        dateofbirth: dob.value
      };
      emit('editStudent',newStudent);
    
    }
    const addNewStudent = () => {
      console.log('Tên:', name.value);
      console.log('Ngày tháng năm sinh:', dob.value);
      console.log('Lớp:', className.value);
      
      const age = calculateAge(dob.value);
      console.log('Tuổi:', age);
      
      const newStudent = {
        name: name.value,
        age: age,
        class: className.value,
        dateofbirth: dob.value
      };
      console.log(newStudent, props);
      emit('add-student', newStudent)
      emit('handleChangeAddingState')
      // props.addStudent(newStudent)
      // props.handleChangeAddingState()
      
    };
    const calculateAge = (birthday) => {
      const yearString =birthday.split("/")[2];
      const year=parseInt(yearString);
      const today = new Date();
      const currentYear = today.getFullYear();
      let age=currentYear-year;
      return age;
    };

    onMounted(() => {
      
      if(!props.student) return;
      name.value =  props.student?.name
      dob.value =  props.student?.dateofbirth
      className.value=props.student?.class
      
    })

    return {
      name,
      dob,
      className,
      addNewStudent,
      saveStudent
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
</style>
