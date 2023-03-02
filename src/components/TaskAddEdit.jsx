import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import axios from '../api/axios';
import SERVER_URL from '../api/urls';
import moment from "moment"
import Container from "react-bootstrap/esm/Container";


export default function TaskAddEdit({TaskData, updateTaskList, removeTaskList}) {
    const [taskInput, setTaskInput] = useState({
        taskName: '',
        isNameValid: false ,
        taskDate: '',
        isDateValid: false ,
        taskStatus: '',
        isStatusValid: false
    })
    useEffect(() => {
        let ignore = false;
        if(TaskData && !ignore){
            setTaskInput({
                taskName: TaskData.taskName ,
                isNameValid: true ,
                taskDate: moment(TaskData.taskDate).format("YYYY-MM-DD") ,
                isDateValid: true ,
                taskStatus: TaskData.taskStatus,
                isStatusValid: true
            })
        }
        return () => {ignore = true}
    }, [TaskData])
    

    const [validationMessages, setValidationMessages] = useState({
        TaskNameValMessage: "Please enter Task Name",
        TaskDateValMessage: "Please enter a valid Due Date",
        TaskStatusValMessage: "Please mark Task Status",
    })
    const [submitClicked, setSubmitClicked] = useState(false);

    const updateInputValue = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        switch (name) {
            case "taskName":
                if(value){
                    setValidationMessages(prevState =>{
                        return {...prevState, ...{ TaskNameValMessage: ""} }
                    })
                    setTaskInput(prevState =>{
                        return {...prevState, ...{ isNameValid: true, taskName: value } }
                    })
                }
                else{
                    setValidationMessages(prevState =>{
                        return {...prevState, ...{ PersonNameValMessage: "Please enter Task Name"} }
                    })
                    setTaskInput(prevState =>{
                        return {...prevState, ...{ isNameValid: false, taskName: value } }
                    })
                }
                break;
            case "taskDate":
                if(value && moment(value).isValid() && moment(value).isAfter(moment().subtract(1, 'days'))) {
                    setValidationMessages(prevState =>{
                        return {...prevState, ...{ TaskDateValMessage: ""} }
                    })
                    setTaskInput(prevState =>{
                        return {...prevState, ...{ isDateValid: true, taskDate: value } }
                    })
                }
                else{
                    setValidationMessages(prevState =>{
                        return {...prevState, ...{ TaskDateValMessage: "Please enter a valid Due Date"} }
                    })
                    setTaskInput(prevState =>{
                        return {...prevState, ...{ isDateValid: false, taskDate: value } }
                    })
                }
                break;
            case "taskStatus":
                if(value) {
                    setValidationMessages(prevState =>{
                        return {...prevState, ...{ TaskStatusValMessage: ""} }
                    })
                    setTaskInput(prevState =>{
                        return {...prevState, ...{ isStatusValid: true, taskStatus: value } }
                    })
                }
                else{
                    setValidationMessages(prevState =>{
                        return {...prevState, ...{ TaskStatusValMessage: "Please enter a valid Due Date"} }
                    })
                    setTaskInput(prevState =>{
                        return {...prevState, ...{ isStatusValid: false, taskStatus: value } }
                    })
                }
                break;
            default:
                break;
        }
    }
    const handleTaskSubmit = async (event)=>{
        const form = event.currentTarget;
        setSubmitClicked(true)
		event.preventDefault();
		event.stopPropagation();
		if (form.checkValidity() === false) {
			console.log("Task Form is Invalid")
			return
		}
        else if(!(taskInput.isNameValid && taskInput.isDateValid)){
			console.log("Something went wrong")
			return
		}
        else{
			if(TaskData && TaskData._id){
                // Call to Edit PersonAPI
                await axios.put(SERVER_URL.task + TaskData._id, {...taskInput, id: TaskData._id}).then(res=>{
                    if(!res || res.status !== 200){
                        console.log(res, "Req Failed")
                    }
                    else{
                        handleCancel()
                        console.log("Req Recieved", res)
                    }
                }).catch(e=>{
                    console.log(e, "Req Error")
                })
            }
            else{
                //Call to Add PersonAPI
                await axios.post(SERVER_URL.task, taskInput).then(res=>{
                    if(!res || res.status !== 201){
                        console.log(res, "Req Failed")
                    }
                    else{
                        console.log("Req Recieved", res)
                    }
                }).catch(e=>{
                    console.log(e, "Req Error")
                })
            }
            updateTaskList()
        }
    }
    const handleCancel = ()=>{
        removeTaskList();
        setSubmitClicked(false)
        setTaskInput({
            taskName: '',
            isNameValid: false ,
            taskDate: '',
            isDateValid: false ,
            taskStatus: '',
            isStatusValid: false
        })
    }
	return (
        <Container className="pt-5 pb-3">
            <Form noValidate onSubmit={handleTaskSubmit}>
                <Row className="justify-content-center">
                    <Form.Group as={Col} lg={3} sm={6}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                <i className="fa fa-list-check"></i>
                            </InputGroup.Text>
                            <Form.Control
                                autoComplete="off"
                                required
                                onChange={(event) => {
                                    updateInputValue(event);
                                }}
                                isInvalid={submitClicked ? (taskInput.isNameValid ? false : true) : false}
                                value={taskInput.taskName}
                                name="taskName"
                                type="text"
                                placeholder="Name"
                            />
                            {submitClicked && validationMessages.TaskNameValMessage ? (
                                <Form.Control.Feedback type={taskInput.isNameValid ? "valid" : "invalid"} className="text-start">
                                    {validationMessages.TaskNameValMessage}
                                </Form.Control.Feedback>
                            ) : (
                                ""
                            )}
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} lg={3} sm={6}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                <i className="fa fa-calendar"></i>
                            </InputGroup.Text>
                            <Form.Control
                                autoComplete="off"
                                required
                                onChange={(event) => {
                                    updateInputValue(event);
                                }}
                                isInvalid={submitClicked ? (taskInput.isDateValid ? false : true) : false}
                                value={taskInput.taskDate}
                                name="taskDate"
                                type="date"
                                placeholder="Task Date"
                            />
                            {submitClicked && validationMessages.TaskDateValMessage ? (
                                <Form.Control.Feedback type={taskInput.isDateValid ? "valid" : "invalid"} className="text-start">
                                    {validationMessages.TaskDateValMessage}
                                </Form.Control.Feedback>
                            ) : (
                                ""
                            )}
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} lg={3} sm={6}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>
                                <i className="fa fa-calendar"></i>
                            </InputGroup.Text>
                            <Form.Select aria-label="Uncomplete"
                                autoComplete="off"
                                required
                                onChange={(event) => {
                                    updateInputValue(event);
                                }}
                                isInvalid={submitClicked ? (taskInput.isStatusValid ? false : true) : false}
                                value={taskInput.taskStatus}
                                name="taskStatus"
                                >
                                <option>Mark Task as</option>
                                <option value="Uncompleted">Uncomplete</option>
                                <option value="Completed">Complete</option>
                            </Form.Select>
                            {submitClicked && validationMessages.TaskStatusValMessage ? (
                                <Form.Control.Feedback type={taskInput.isDateValid ? "valid" : "invalid"} className="text-start">
                                    {validationMessages.TaskStatusValMessage}
                                </Form.Control.Feedback>
                            ) : (
                                ""
                            )}
                        </InputGroup>
                    </Form.Group>
                    <Col lg={3} sm={6}>
                        <Button type="submit" variant="primary">{!TaskData?"Add Task": "Update Task"}</Button>
                        {TaskData?<Button variant="secondary" onClick={handleCancel} className="ms-2">Cancel Update</Button>:''}
                    </Col>
                </Row>
            </Form>
        </Container>
	);
}
