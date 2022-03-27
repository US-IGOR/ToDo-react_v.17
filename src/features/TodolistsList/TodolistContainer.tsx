import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import React, {useCallback, useEffect} from "react";
import {addTasksTC, changeTitleTaskAC, removeTasksTC, TaskStatuses, updTaskStatusTC} from "./tasks-reducer";
import {
    addTodosTC,
    ChangeTodolistFilterAC,
    changeTodoTitleTC,
    filterValueType, getTodosTC,
    RemoveTodosTC
} from "./todolists-reducer";
import {TasksStateType, todolistsType} from "../../app/App";
import {Grid, Paper} from "@material-ui/core";
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";


export const TodolistContainer: React.FC = () => {

    useEffect(() => {
        dispatch(getTodosTC())
    }, [])


    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<todolistsType>>(state => state.todoLists)
    const taskObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)

//tasks_func's
    const remove = useCallback((taskID: string, todoID: string) => {
        debugger
        dispatch(removeTasksTC(taskID, todoID))
    }, [])
    const addNewTask = useCallback((title: string, todoID: string) => {
        debugger
        dispatch(addTasksTC(todoID, title))
    }, [])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todoID: string) => {
        dispatch(updTaskStatusTC(id, status, todoID))
    }, [])
    const changeTitleTask = useCallback((id: string, newTitle: string, todoID: string) => {
        dispatch(changeTitleTaskAC(id, newTitle, todoID))
    }, [])


//toDOLists_func's
    const changeFilter = useCallback((filter: filterValueType, todolistId: string) => {
        debugger
        dispatch(ChangeTodolistFilterAC(filter, todolistId))
    }, [])
    const deleteTodolist = useCallback((todoID: string) => {
        dispatch(RemoveTodosTC(todoID))
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodosTC(title))
    }, [])
    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodoTitleTC(id, newTitle))
    }, [])


    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addNewItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>

            {
                todolists.map((m) => {

                    let filteredTodolist = taskObj[m.id];


                    return <Grid item>
                        <Paper elevation={10} style={{padding: "10px"}}>
                            <Todolist title={m.title}
                                      key={m.id}
                                      data={filteredTodolist}
                                      remove={remove}
                                      changeFilter={changeFilter}
                                      addNewTask={addNewTask}
                                      changeStatus={changeStatus}
                                      filter={m.filter}
                                      id={m.id}
                                      deleteTodolist={deleteTodolist}
                                      changeTodolistTitle={changeTodolistTitle}
                                      changeTitleTask={changeTitleTask}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
