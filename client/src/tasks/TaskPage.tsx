import React, { useState } from 'react'
import { InitialData, IColumn, ITask } from '../InitialData'
import { Column } from './Column';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

// interface InnerListProps {
//   key: string,
//   column: IColumn,
//   taskMap: any,
//   index: number
// }

// class InnerList extends React.Component<InnerListProps, {}> {

//   shouldComponentUpdate(nextProps: any) {
//     if (
//       nextProps.column === this.props.column &&
//       nextProps.taskMap === this.props.taskMap &&
//       nextProps.index === this.props.index
//     ) {
//       return false;
//     }
//     return true;
//   }

//   render() {
//     const tasks: ITask[] = this.props.column.taskIds.map((taskId: string) =>
//       this.props.taskMap[taskId]);
//     return (
//       <Column
//         key={this.props.column.id}
//         column={this.props.column}
//         tasks={tasks}
//         index={this.props.index}
//       />
//     );
//   }
// }

export const TaskPage = () => {

  const [state, setState] = useState(InitialData)

  function dragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    if (result.source.droppableId === result.destination.droppableId
      && result.source.index === result.destination.index) {
      return;
    }

    if (result.type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(result.source.index, 1);
      newColumnOrder.splice(result.destination.index, 0, result.draggableId);
      setState({
        ...state,
        columnOrder: newColumnOrder
      });
      return;
    }

    const sourceColumn = (state.columns as any)[result.source.droppableId];
    const destinationColumn = (state.columns as any)[result.destination.droppableId];

    if (sourceColumn === destinationColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(result.source.index, 1);
      newTaskIds.splice(result.destination.index, 0, result.draggableId);

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds
      }
      setState({
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      });
    } else {
      const sourceColumnTaskIds = Array.from(sourceColumn.taskIds);
      sourceColumnTaskIds.splice(result.source.index, 1);
      const newSourceColumnTaskIds = {
        ...sourceColumn,
        taskIds: sourceColumnTaskIds
      }
      const destinationColumnTaskIds = Array.from(destinationColumn.taskIds);
      destinationColumnTaskIds.splice(result.destination.index, 0, result.draggableId);
      const newDestinationColumnTaskIds = {
        ...destinationColumn,
        taskIds: destinationColumnTaskIds
      }
      setState({
        ...state,
        columns: {
          ...state.columns,
          [newSourceColumnTaskIds.id]: newSourceColumnTaskIds,
          [newDestinationColumnTaskIds.id]: newDestinationColumnTaskIds
        }
      })
    }
  }

  return (
    <div className="pa2">
      <DragDropContext
        onDragEnd={(result) => dragEnd(result)}
      >
        <Droppable
          droppableId="all-columns"
          type="column"
          direction="horizontal"
        >
          {(provided) => {
            const allowedProps = { ref: provided.innerRef }
            return (
              <div
                className="flex"
                {...provided.droppableProps}
                {...allowedProps}
              >
                {state.columnOrder.map((columnId, index) => {
                  const column: IColumn = (state.columns as any)[columnId];
                  const tasks: ITask[] = column.taskIds.map((taskId: string) =>
                    (state.tasks as any)[taskId]);

                  return (
                    <Column
                      key={column.id}
                      column={column}
                      tasks={tasks}
                      index={index}
                    />
                  )
                  // return (
                  //   <InnerList
                  //     key={column.id}
                  //     column={column}
                  //     taskMap={state.tasks}
                  //     index={index}
                  //   />
                  // )
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
