<template>
    <div>
        <div class="good"></div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "gg",
    data() {
        return {};
    },
    methods: {
        checkAccess() {
            // axios.get("/users/", {
            //         params: pa
            //     })
            //     .then(result => {
            //         this.loading = false;

            //         var res = result.data;
            //         console.log(res);
            //         if (res.status == "0") {
            //             if (flag) {
            //                 this.goodsList = this.goodsList.concat(
            //                     res.result.list
            //                 );
            //                 if (res.result.count == 0) {
            //                     this.busy = true;
            //                 } else {
            //                     this.busy = false;
            //                 }
            //             } else {
            //                 this.goodsList = res.result.list;
            //                 this.busy = false;
            //             }
            //         } else {
            //             this.goodsList = [];
            //         }
            //     });
        }
    },
    created() {
        this.checkAccess();
    }
};
</script>

<style scoped>
.good{
    width:400px;
    height:500px;
    background:pink;
}
</style>
