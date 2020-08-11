// import { Menu } from 'ant-design-vue'
// import 'ant-design-vue/dist/antd'

Vue.component('todo-item', {
    // todo-item 컴포넌트는 'prop' 라고 하는
    // 사용자 정의 속성 같은 것을 입력받을 수 있다.
    // 이 prop는 todo 라는 이름으로 정의했다.
    // props: ['todo'],
    props: {
        todo: String
    },
    template: '<li>{{todo}}</li>'
    //template: '<h2>Todo List</h2>'
})

var app = new Vue({
    created: function () {   // 인스턴스가 생성되었을 때, 그 안의 코드가 생성돼
        this.fetchItems();
    },
    el: '#app',
    data: {
        inputText: '',   // 초기화 값
        todoItems: [],
        message: '짜잔 마우스를 올리면 내가 나와 !!',
        fullList: []
    },
    methods: {
        addItem: function (event) { // 사용자가 친 것을 localStorage에 저장(추가)
            //if (event.keyCode === 13) { // 엔터를 눌렀을 때, Add 버튼과 같은 기능을 함
            console.log(event)
            var value = this.inputText

            if (value) {
                localStorage.setItem(value, value) // setItem 은 key, value 형식
                this.inputText = ''; // add 누른 후에 빈칸으로 만들기
                this.todoItems.push(value)
            } else {
                alert('입력 된 게 없습니다.')
            }
            //}
        },
        fetchItems: function () {    // localStorage에 저장된 걸 조회
            // axios.get('/todos')
            this.fullList.splice(0);    // fullList 비우기
            for (var i = 0; i < localStorage.length; i++) {
                var value = localStorage.key(i)
                console.log(value);
                this.fullList.push(value);
            }
        },
        removeItem: function (item, index) {   // 특정 아이템 선택했을 때 지우기
            // axios.delete('todos/' + index)
            console.log(item, index);
            this.todoItems.splice(index, 1)     // 배열에 있는 index 값 1개 지우기 (slice, splice 차이점 알아!!)
            localStorage.removeItem(item)       // localStorage에 있는 것 지우기

            this.fetchItems();                  // remove 했을 때 local storage 도 실시간으로 변화주기
        }
    },
})