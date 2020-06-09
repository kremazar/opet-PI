<template>
    <div class="user">
        <div class="container">
            <h1>{{blog.FullName}}</h1>
            <div class="card mt-3" style="width:100%;">
                <div class="card-body">
                    <h5 class="card-title">UserName: </h5>
                    <p class="card-text"> {{blog.UserName}}</p>
                </div>
            </div>
            <div class="card mt-3" style="width:100%;">
                <div class="card-body">
                    <h5 class="card-title">email: </h5>
                    <p class="card-text"> {{blog.email}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id:this.$route.params.id,
            blog:{}
        }
    },
    created(){
        this.$http.get('https://pi-projekt-f1460.firebaseio.com/user/' + this.id + '.json').then(function(data){
            return data.data
        }).then (data=>{
            this.blog=data
        })
      }
}
</script>