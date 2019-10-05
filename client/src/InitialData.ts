export interface ITask {
  id: string;
  content: string
}

export interface IColumn {
  id: string;
  title: string;
  taskIds: string[]
}

export const InitialData = {
  tasks: {
    '1': { id: '1', content: 'Take out the garbage'},
    '2': { id: '2', content: 'Watch my favorite show'},
    '3': { id: '3', content: 'Change my phone'},
    '4': { id: '4', content: 'Cook dinner'}
  },
  columns: {
    'col1': {
      id: 'col1',
      title: 'To-do',
      taskIds: ['1', '2', '3', '4']
    },
    'col2': {
      id: 'col2',
      title: 'In progress',
      taskIds: []
    },
    'col3': {
      id: 'col3',
      title: 'Done',
      taskIds: []
    }
  },
  columnOrder: ['col1', 'col2', 'col3']
}