
var app = new Vue({
    el: '#cartapp',
    data: {
      requests: []
    },
    methods:{
        incrementItem(id){
            const increment = firebase.functions().httpsCallable('increment');
            increment({id})
            .catch(err => {
                console.log(err.message);
            });
        },
        decrementItem(id){
            const decrement = firebase.functions().httpsCallable('decrement');
            decrement({id})
            .catch(err => {
                console.log(err.message);
            });
        }
    },
    mounted() {
        const ref = firebase.firestore().collection("products");
        ref.onSnapshot(snapshot => {
            let requests = [];
            snapshot.forEach(doc => {
                requests.push({...doc.data(),id: doc.id});
            });
            this.requests = requests;
        });
    } 
}); 
     