<template>
  <div>
    <section class="todoapp">
      <header class="header">
        <h1>Todos</h1>
        <!-- 输入备忘，使用 v-model 绑定 newTodo -->
        <!-- 监听 keyup 事件，同时使用修饰器 .enter，按 Enter 键时事件才触发 -->
        <input class="new-todo" placeholder="你接下来要做什么?" v-model="newTodo" @keyup.enter="addTodo">
      </header>
      <section class="main" v-show="todos.length">
        <!-- <input class="toggle-all" type="checkbox" v-model="allDone"> -->
        <ul class="todo-list">
          <!-- 查看所有备忘 -->
          <!-- v-for 遍历所有备忘，key 绑定备忘 id，class 绑定样式 -->
          <li v-for="todo in todos" class="todo" :key="todo.id"
              :class="{ completed: todo.completed, editing: todo.id == editedTodo.id }">
            <div class="view">
              <!-- 选择某条备忘 -->
              <!-- v-model 绑定是否选中 -->
              <input class="toggle" type="checkbox" v-model="todo.completed">
              <!-- 双击可操作备忘 -->
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <!-- 删除某条备忘 -->
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <!-- 修改备忘的数据，失焦或 Enter 键可更新数据，Esc键取消更新 -->
            <input class="edit" type="text" v-model="editedTodo.title"
                   @blur="doneEdit(editedTodo)"
                   @keyup.enter="doneEdit(editedTodo)"
                   @keyup.esc="cancelEdit()">
          </li>
        </ul>
        <footer class="footer" v-show="todos.length">
          <span class="todo-count">
            <!-- remaining 计算剩余的未完成的数量，pluralize 用来过滤单位是否要负数 -->
            <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
          </span>
          <!-- 当有已完成的备忘时，一键移除已完成按钮出现 -->
          <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
            Clear completed
          </button>
        </footer>
      </section>
    </section>
  </div>
</template>

<script>
let id = 1;
export default ({
  data() {
    return {
      todos: [], // 所有的备忘
      newTodo: "", // 新增的备忘
      editedTodo: {}, // 修改中的备忘
    }
  },
  // 其他选项省略
  computed: {
    // 计算剩余未完成的备忘
    remaining() {
      // 过滤掉已完成的，获取数量
      return this.todos.filter(x => !x.completed).length
    }
  },
  filters: {
    // 计算单位
    pluralize(num) {
      // 如果是多个，则加复数
      return num > 1 ? 'items' : 'item'
    }
  },
  methods: {
    // 新增备忘
    addTodo() {
      // 内容为空则不处理
      if (!this.newTodo) {
        return
      }
      // 往备忘列表中新增一条
      // 最后新增的备忘插在最前面，所以使用 unshift 而不是 push
      this.todos.unshift({
        id: id++, // id 自增
        title: this.newTodo,
        completed: false
      })
      // 添加成功后，清空输入框，方便重新输入
      this.newTodo = ""
    },
    // 编辑备忘
    editTodo(todo) {
      // 将待编辑的内容填充到修改的内容中
      // 使用 ... 解构，相当于使用 Object.assign，属于浅拷贝
      // 此处对象只有一层，浅拷贝足矣
      this.editedTodo = {...todo}
    },
    // 确认修改备忘
    doneEdit(todo) {
      // 将编辑中内容更新到列表中
      this.todos = this.todos.map(x => {
        return todo.id == x.id ? {...todo} : {...x}
      })
      // 清空编辑对象
      this.editedTodo = {}
    },
    // 取消修改备忘
    cancelEdit() {
      this.editedTodo = {}
    },
    // 删除备忘
    removeTodo(todo) {
      // 匹配 id 找出该备忘，然后移除
      const index = this.todos.findIndex(x => x.id === todo.id)
      this.todos.splice(index, 1)
    },
    // 删除已完成的备忘
    removeCompleted() {
      this.todos = this.todos.filter(x => !x.completed)
    }
  }
})
</script>

<style>
.todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
  0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}


.todoapp h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}

.new-todo,
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.main {
  padding-top: 50px;
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

.toggle-all {
  text-align: center;
  border: none; /* Mobile Safari */
  opacity: 0;
  position: absolute;
}

.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.toggle-all + label:before {
  content: '❯';
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
  color: #737373;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li.editing {
  border-bottom: none;
  padding: 0;
}

.todo-list li.editing .edit {
  display: block;
  width: 506px;
  padding: 12px 16px;
  margin: 0 0 0 43px;
}

.todo-list li.editing .view {
  display: none;
}

.todo-list li .toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}

.todo-list li .toggle {
  opacity: 0;
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.todo-list li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}

.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
  color: #af5b5e;
}

.todo-list li .destroy:after {
  content: '×';
}

.todo-list li:hover .destroy {
  display: block;
}

.todo-list li .edit {
  display: none;
}

.todo-list li.editing:last-child {
  margin-bottom: -1px;
}

.footer {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
}

.footer:before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
  0 8px 0 -3px #f6f6f6,
  0 9px 1px -3px rgba(0, 0, 0, 0.2),
  0 16px 0 -6px #f6f6f6,
  0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
  float: left;
  text-align: left;
}

.todo-count strong {
  font-weight: 300;
}

.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
}

.filters li {
  display: inline;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
}

.clear-completed:hover {
  text-decoration: underline;
}

.info {
  margin: 65px auto 0;
  color: #bfbfbf;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;
}

.info p {
  line-height: 1;
}

.info a {
  color: inherit;
  text-decoration: none;
  font-weight: 400;
}

.info a:hover {
  text-decoration: underline;
}

/*
	Hack to remove background from Mobile Safari.
	Can't use it globally since it destroys checkboxes in Firefox
*/
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .toggle-all,
  .todo-list li .toggle {
    background: none;
  }

  .todo-list li .toggle {
    height: 40px;
  }
}

@media (max-width: 430px) {
  .footer {
    height: 50px;
  }

  .filters {
    bottom: 10px;
  }
}
</style>
