<template>
    <div id="notifications">
        <div v-for="notification in notifications" :key="notification.id" :class="getNotificationClass(notification)">
            {{ notification.message }}
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        },

        methods: {
            getNotificationClass: function(notification)
            {
                return 'alert alert-' + notification.type;
            }
        },

        props: ['apples']
    }
</script>
