import React from 'react'
import { IColumn, ITask } from '../InitialData'
import { Task } from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'

// interface InnerTaskProps {
//   tasks: any;
// }
// class InnerTask extends React.Component<InnerTaskProps, {}> {

//   shouldComponentUpdate(nextProps: any) {
//     if (nextProps.tasks === this.props.tasks) {
//       console.log('same task');
//       return false;
//     }
//     console.log('different task');
//     return true;
//   }

//   render() {
//     console.log(`InnerTask`);
//     return (
//       this.props.tasks.map((task: any, index: number) =>
//         <Task
//           key={task.id}
//           task={task}
//           index={index}
//         />
//       )
//     );
//   }
// }

export const Column = (props: {
  key: string;
  column: IColumn;
  tasks: ITask[];
  index: number;
}) => {
  return (
    <Draggable
      draggableId={props.column.id}
      index={props.index}
    >
      {(provided) => {
        const allowedProps = { ref: provided.innerRef }
        return (
          <div
            className="ma2 ba b--black-40 br2 w-third flex flex-column bg-white"
            {...provided.draggableProps}
            {...allowedProps}
          >
            <h3
              className="pa2 ma0"
              {...provided.dragHandleProps}
            >
              {props.column.title}
            </h3>
            <Droppable
              droppableId={props.column.id}
              type="task"
            >
              {(provided, snapshot) => {
                const allowedProps = { ref: provided.innerRef }
                return (
                  <div
                    className={`pa2 flex-grow-1 ${snapshot.isDraggingOver ? 'bg-lightest-blue' : 'bg-white'}`}
                    style={{ transition: 'background-color 0.2s ease', minHeight: '100px' }}
                    {...provided.droppableProps}
                    {...allowedProps}
                  >
                    {props.tasks.map((task, index) =>
                      <Task
                        key={task.id}
                        task={task}
                        index={index}
                      />
                    )}
                    {/* <InnerTask tasks={props.tasks} /> */}
                    {provided.placeholder}
                  </div>
                )
              }}
            </Droppable>
          </div>
        )
      }}
    </Draggable>
  )
}
