export function deleteTask(task) {
    return {
      type: 'DELETE_TASK',
      payload: task
    }
}
export function saveTask(task) {
  return {
    type: 'SAVE_TASK',
    payload: task
  }
}

export function modifyTask(task) {
  return {
    type: 'MODIFY_TASK',
    payload: task
  }
}

