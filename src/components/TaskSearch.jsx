import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

export default function TaskSearch({ handleSubmit, totalTaskLength, completedCount}) {
    const handleTaskSearchSubmit = (event)=>{
        const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();
		if (form.checkValidity() === false) {
			console.log("Task Search is invalid")
			return
		}
        else{
            handleSubmit(form)
        }
    } 
	return (
		<Form onSubmit={handleTaskSearchSubmit}>
			<Row>
				<Form.Group as={Col} lg={3} sm={6}>
					<InputGroup className="mb-3">
						<InputGroup.Text>
							<i className="fa fa-list-check"></i>
						</InputGroup.Text>
						<Form.Control autoComplete="off" name="taskSearchName" type="text" placeholder="Task Name" />
					</InputGroup>
				</Form.Group>
				<Col lg={3} sm={6}>
					<Button type="submit" variant="primary">
						Search Task
					</Button>
				</Col>
				<Col lg={6}>
					{totalTaskLength? (
						<p className="mb-0 fw-bold">
							Total Task: {totalTaskLength}, Task Completed: {completedCount}, Task Uncompleted: {totalTaskLength - completedCount}
						</p>
					) : (
						""
					)}
				</Col>
			</Row>
		</Form>
	);
}
