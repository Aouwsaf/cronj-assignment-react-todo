import { useState, useEffect } from "react";
import TaskAddEdit from "../components/TaskAddEdit";
import axios from '../api/axios';
import SERVER_URL from '../api/urls';
import Task from "../components/Task";
import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import TaskSearch from "../components/TaskSearch";



export default function Tasks() {
    const [tasksArray, setTasksArray] = useState([]);
    const [showEdit, setShowEdit] = useState(false)
    const [completedCount, setCompletedCount] = useState(0)
    const GetTaskData = async ()=>{
        await axios.get(SERVER_URL.task).then(res=>{
            if(!res || res.status !== 200){
                console.log(res, "Req Failed")
            }
            else{
                setTasksArray(res.data.result)
                setCompletedCount(res.data.completed)
                console.log(tasksArray, "Req Recieved", res)
            }
        }).catch(e=>{
            console.log(e, "Req Error")
        })
    }
    const [taskToUpdate, setTaskToUpdate] = useState({})
    const InitControlForUpdate = (elm) =>{
        setTaskToUpdate(elm)
        setShowEdit(true)
    }
    useEffect(() => {
        let ignore = false;
        if(!tasksArray.length && !ignore){
            GetTaskData()
        }
        return () => {ignore=true}
    }, [])
    const resetControls = ()=>{
        setShowEdit(false)
        setTaskToUpdate({})
    }
    const handleTaskSearchSubmit = async (form)=>{
        // Call to Edit PersonAPI
        await axios.get(SERVER_URL.task + "?taskSearch=" + form.taskSearchName.value).then(res=>{
            if(!res || res.status !== 200){
                console.log(res, "Req Failed")
            }
            else{
                setTasksArray(res.data.result)
                setCompletedCount(res.data.completed)
                console.log(tasksArray, "Req Recieved", res)
            }
        }).catch(e=>{
            console.log(e, "Req Error")
        })
    }
    
	return (
		<section>
            {
                showEdit?
                    <TaskAddEdit updateTaskList={GetTaskData} TaskData={taskToUpdate} removeTaskList={resetControls}/>
                :   <TaskAddEdit updateTaskList={GetTaskData}/>
            }
            <Container>
                <TaskSearch handleSubmit={handleTaskSearchSubmit} totalTaskLength={tasksArray.length} completedCount={completedCount}/>
                {
                    tasksArray && tasksArray.length?
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Task Name</th>
                                <th>Due Date</th>
                                <th>Task Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasksArray.map((elm, index)=>{
                                    return <Task key={index} TaskData={elm} srKey={index + 1} handleClickedUpdate={InitControlForUpdate} updateTaskList={GetTaskData} />
                                })
                            }
                        </tbody>
                    </Table>
                    :<h4 className="text-center">No Task is Added</h4>
                }
            </Container>
		</section>
	);
}
