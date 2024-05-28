<template>
  <div class="tableStudent">
    <table class="table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên</th>
          <th>Tuổi</th>
          <th>Lớp</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students" :key="student.name">
          <td>{{ index + 1 }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.age }}</td>
          <td>{{ student.class }}</td>
          <td class="button_table">
            <button type="button" class="btn btn-primary" @click="editStudent(index)">Sửa</button>
            <button type="button" class="btn btn-danger" @click="deleteStudent(index)">Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  name: 'TableStudent',
  props:{
    students:{
        type:Array,
        required:true
    }
  },
  setup(props,{emit}){
  
    onMounted(()=>{
        console.log("check props >>",props.students)
       
    })
    const deleteStudent = (index) => {    
        emit('delete-student', index);
    };
  
    const editStudent = (index) => {
      emit('edit-status-student')
      emit(`edit-input-student`,index)
    }

    return{
        deleteStudent,
        editStudent
    }
  }

}
</script>

<style scoped>
.tableStudent {
  margin-top: 20px; 
}
.button_table{
    display: flex;
    gap: 20px;
}
</style>
