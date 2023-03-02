import React from "react";
import axios from "../api/axios";
import SERVER_URL from "../api/urls";


export default function Task({ TaskData, srKey, handleClickedUpdate, updateTaskList}) {
    const handleDelete = ()=>{
        axios.delete(SERVER_URL.task + TaskData._id).then(res=>{
            if(!res || res.status !== 200){
                console.log(res, "Req Failed")
            }
            else{
                // setPersonInfoArray(res.data)
                console.log("Req Recieved", res)
                updateTaskList()
            }
        }).catch(e=>{
            console.log(e, "Req Error")
        })
    }

    const handleComplete = ()=>{
        axios.patch(SERVER_URL.task + TaskData._id).then(res=>{
            if(!res || res.status !== 200){
                console.log(res, "Req Failed")
            }
            else{
                // setPersonInfoArray(res.data)
                console.log("Req Recieved", res)
                updateTaskList()
            }
        }).catch(e=>{
            console.log(e, "Req Error")
        })
        console.log({...TaskData, taskStatus: "Compeleted"}, "Clicked")
    }

    const handleUpdate = ()=>{
        handleClickedUpdate(TaskData)
    }
	return (
		<tr className={TaskData.taskStatus == "Due" ? "bg-secondary" : ""}>
			<td className="text-center">{srKey}</td>
			<td>{TaskData.taskName}</td>
			<td>{TaskData.taskDate}</td>
			<td>{TaskData.taskStatus}</td>
			<td>
                <span onClick={handleUpdate} className="mx-2 cursor-pointer" title="Update Task">
                    <i className="fa fa-edit"></i>
				</span>
                {
                    TaskData.taskStatus!="Completed"
                        ?<span onClick={handleComplete} className="mx-2 cursor-pointer" title="Mark Complete">
                            <i className="fa fa-check"></i>
                        </span>
                        :<span className="mx-2 cursor-pointer" title="Completed">
                            <i className="fa fa-circle-check"></i>
                        </span>
                }
				<span onClick={handleDelete} className="mx-2 cursor-pointer" title="Delete Task">
					<i className="fa fa-trash"></i>
				</span>
			</td>
		</tr>
	);
}
