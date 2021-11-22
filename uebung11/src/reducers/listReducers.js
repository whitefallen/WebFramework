const initialState = {
  tasks: [
    {
      id: 1,
      task:'Mach das jetzt noch nicht',
    },
    {
      id: 2,
      task:'Mach das jetzt'
    },
    {
      id: 3,
      task:'Mach das später'
    }
  ]
}

const listReducer = (state = initialState, action) => {
  let tasks = state.tasks;
  let index = null;
  switch(action.type) {
    case "DELETE_TASK":
      index = tasks.findIndex(x => x.id === action.payload.id);
      if(index>=0) {
        tasks.splice(index,1);
        state = {
          ...state,
          tasks: tasks
        }
      }
      break;
    case "SAVE_TASK":
      state.tasks.sort((a,b) => a.id - b.id);
      let lastId = state.tasks[state.tasks.length-1].id +1;
      let newEntry = {task: action.payload, id: lastId }
      let newTaskList = [...state.tasks, newEntry];
      state = {
        ...state,
        tasks: newTaskList
      }
      break;
    case "MODIFY_TASK":
      index = tasks.findIndex(x => x.id === action.payload.id);
      if(index>=0) {
        tasks[index]=action.payload;
        state = {
          ...state,
          tasks: tasks
        }
      }
      break;
    default:

  }
  return state;
}
export default listReducer;
