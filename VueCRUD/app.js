var app = new Vue({

    el: '#myapp',
    data: {
        showingAddModal: false,
        showingEditModal: false,
        showingDeleteModal: false,
        errorMessage: "",
        successMessage: "",
        users: [],
        newUser: {
            username: "",
            email: "",
            phone: ""
        },
        clickedUser: {}

    },
//At starting of the page load all users will be shown--------------------------
    mounted: function () {
        console.log("mounted");
        this.getAllUsers();
    },

    

    methods: {
        
//reading all data from data base and ----------------------------------------        
        getAllUsers: function () {
            axios.get("http://localhost/VueCRUD/api.php?action=read").then(function (response) {

                if (response.data.error) {
                    app.errorMessage = response.data.message;
                } else {
                    app.users = response.data.users;
                }
            });
        },

        
//        Add new user to the data base ---------------------------------
        saveUser: function () {
            var formData = app.toFormData(app.newUser);

            axios.post("http://localhost/VueCRUD/api.php?action=create", formData).then(function (response) {
                app.newUser = {
                    username: "",
                    email: "",
                    phone: ""
                };
                if (response.data.error) {
                    app.errorMessage = response.data.message;
                } 
                else {
                    app.successMessage = response.data.message;
                    app.getAllUsers();
                }
            });

        },
        
        
//        Update user to the data base ---------------------------------
        updateUser: function () {
            var formData = app.toFormData(app.clickedUser);

            axios.post("http://localhost/VueCRUD/api.php?action=update", formData).then(function (response) {
                app.clickedUser = {};
                if (response.data.error) {
                    app.errorMessage = response.data.message;
                } else {
                    app.successMessage = response.data.message;
                    console.log(app.successMessage);
                    app.getAllUsers();
                }
            });

        },  
        
        
        
//        Delete user to the data base ---------------------------------
        deleteUser: function () {
            var formData = app.toFormData(app.clickedUser);

            axios.post("http://localhost/VueCRUD/api.php?action=delete", formData).then(function (response) {
                app.clickedUser = {};
                if (response.data.error) {
                    app.errorMessage = response.data.message;
                } else {
                    app.successMessage = response.data.message;
                    app.getAllUsers();
                }
            });

        },
        
        
//grabbing the user info with id from html for  updating and deleting data --------------------         
        selectUser(user){
          app.clickedUser = user;  
        },
        

//data serializaion-------------------------------------------------        
        toFormData: function (obj) {
            var form_data = new FormData();
            for (var key in obj) {
                form_data.append(key, obj[key]);
            }
            return form_data;
        },

//clearing all messages -------------------------------------------------        
        clearMessage: function () {
            app.errorMessage = "";
            app.successMessage = "";
        }

    }
});